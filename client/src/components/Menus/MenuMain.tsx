import { Layout, Menu } from "antd"
import { TeamOutlined, UserOutlined } from "@ant-design/icons"

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
        className="main_menu_sider"
        style={{ height: "800px", overflow: "scroll" }}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          className="main_menu_sider--menu"
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Contacts">
            <Menu.Item key="3">Jed</Menu.Item>
            <Menu.Item key="4">Clem</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<TeamOutlined />}
            title="Participants"
            className=".main_menu_sider--participants"
          ></SubMenu>
          {[
            1,
            2,
            1,
            1,
            1,
            1,
            11,
            1,
            1,
            1,
            111,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            11,
            1,
            1,
          ].map((x, i) => (
            <SubMenu
              key={`${i}`}
              icon={<Gravatar />}
              className="main_menu_submenu"
              title={
                <span className="main_menu_submenu_span">ZZZZimbalimbabm</span>
              }
            ></SubMenu>
          ))}
        </Menu>
      </Sider>
    )
  }
}
