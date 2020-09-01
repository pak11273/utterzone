import { Layout, Menu } from "antd"
import {
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons"

import { Gravatar } from "../Gravatar"
import React from "react"

const { Sider } = Layout

const { SubMenu } = Menu

export class MenuMain extends React.Component {
  state = {
    collapsed: false,
  }

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed })
  }

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        collapsedWidth={40}
        className="main_menu--sider"
        style={{ height: "100vh", overflow: "scroll" }}
      >
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu key="sub1" icon={<UserOutlined />} title="Contacts">
            <Menu.Item key="3">Jed</Menu.Item>
            <Menu.Item key="4">Clem</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<TeamOutlined />}
            title="Participants"
          ></SubMenu>
          {[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
          ].map(x => (
            <SubMenu key={`${x}`} icon={<Gravatar />} title="username">
              <div>text</div>
            </SubMenu>
          ))}
        </Menu>
      </Sider>
    )
  }
}
