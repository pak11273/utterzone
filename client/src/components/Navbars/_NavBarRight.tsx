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
  } else {
    return (
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <SubMenu key="SubMenu" icon={<SettingOutlined style={{ margin: 0 }} />}>
          <Menu.ItemGroup title="Settings">
            <Menu.Item key="setting:1">
              <NavLink to="/profile">Profile</NavLink>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.Item key="app">
            <NavLink to="#" onClick={handleLogout}>
              Log Out
            </NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}
