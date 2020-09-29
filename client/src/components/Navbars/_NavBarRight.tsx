import { NavLink, useHistory } from "react-router-dom"
import React, { useState } from "react"
import { useLogoutMutation, useMeQuery } from "../../generated/graphql"

import { Menu } from "antd"
import { SettingOutlined } from "@ant-design/icons"
import { useApolloClient } from "@apollo/client"

const { SubMenu } = Menu

interface NavBarProps {}

export const RightMenu: React.FC<NavBarProps> = (props: any) => {
  const client = useApolloClient()
  const [current, changeCurrent] = useState("mail")
  const history = useHistory()
  const { data } = useMeQuery()
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    await logout()
    await client.resetStore()
    //TODO: also destroy the subscription socket
    // see: https://github.com/apollographql/apollo-client/issues/2774
    history.push("/login")
  }

  const handleClick = (e: any) => {
    console.log("click ", e)
    changeCurrent(e.key)
  }

  if (!data?.me) {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <NavLink to="/login">Log In</NavLink>
        </Menu.Item>
        <Menu.Item key="app">
          <NavLink to="/register">Sign Up</NavLink>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Menu mode="horizontal">
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        {/* <Menu.Item key="mail" icon={<BellOutlined />}></Menu.Item> */}
        <SubMenu key="SubMenu" icon={<SettingOutlined style={{ margin: 0 }} />}>
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
          <Menu.Item key="app">
            <NavLink to="#" onClick={handleLogout}>
              Log Out
            </NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Menu>
  )
}
