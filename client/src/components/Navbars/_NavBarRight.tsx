import { Link } from "react-router-dom"
import { Menu } from "antd"
import React from "react"

interface NavBarProps {}

export const RightMenu: React.FC<NavBarProps> = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="mail">
        <Link to="/login">Log In</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="/register">Sign Up</Link>
      </Menu.Item>
    </Menu>
  )
}
