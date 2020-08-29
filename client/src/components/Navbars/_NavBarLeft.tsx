import { Link, NavLink } from "react-router-dom"

import { Menu } from "antd"
import React from "react"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

interface NavBarProps {}

export const LeftMenu: React.FC<NavBarProps> = () => {
  return (
    <Menu mode="horizontal">
      <SubMenu title={<NavLink to="/zone">Zones</NavLink>}>
        <MenuItemGroup title="Zones">
          <Menu.Item key="setting:1">
            <Link to="/zone/create">Create a Zone</Link>
          </Menu.Item>
          <Menu.Item key="setting:2">Find a Zone</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Apps">
          <Menu.Item key="setting:4">Games</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  )
}
