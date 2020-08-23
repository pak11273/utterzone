import { Menu } from "antd"
import { NavLink } from "react-router-dom"
import React from "react"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

interface NavBarProps {}

export const LeftMenu: React.FC<NavBarProps> = () => {
  return (
    <Menu mode="horizontal">
      <SubMenu title={<NavLink to="/zones">Zones</NavLink>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  )
}
