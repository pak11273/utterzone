import { Menu } from "antd"
import { NavLink } from "react-router-dom"
import React from "react"

interface NavBarProps {}

export const RightMenu: React.FC<NavBarProps> = () => {
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
