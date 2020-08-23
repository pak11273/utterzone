// ref:  https://github.com/Rupinderthind/Ant_design_navbar

import { Button, Drawer } from "antd"
import React, { Component } from "react"

import { LeftMenu } from "./_NavBarLeft"
import { Link } from "react-router-dom"
import { RightMenu } from "./_NavBarRight"

// import { useLogoutMutation, useMeQuery } from "../generated/graphql"
export class NavbarMain extends Component {
  state = {
    current: "mail",
    visible: false,
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }
  onClose = () => {
    this.setState({
      visible: false,
    })
  }
  render() {
    return (
      <nav className="menuBar">
        <div className="logo">
          <Link to="/">UZ</Link>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <div className="rightMenu">
            <RightMenu />
          </div>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn"></span>
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer>
        </div>
      </nav>
    )
  }
}
