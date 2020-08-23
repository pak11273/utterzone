// ref:  https://github.com/Rupinderthind/Ant_design_navbar

// import { useLogoutMutation, useMeQuery } from "../generated/graphql"

// import { Link } from "react-router-dom"
// import React from "react"
// import { isServer } from "../utils/isServer"

// // import { useApolloClient  } from "@apollo/client"

// interface NavBarProps {}

// export const NavBar: React.FC<NavBarProps> = () => {
//   const [logout, { loading: logoutFetching }] = useLogoutMutation()
//   // const apolloClient = useApolloClient()
//   console.log(logoutFetching)
//   const { data, loading } = useMeQuery({
//     skip: isServer(),
//   })

//   let body = null

//   // data is loading
//   if (loading) {
//     // user not logged in
//   } else if (!data?.me) {
//     body = (
//       <>
//         <Link to="/login">login</Link>
//         <a href="/register">register</a>
//       </>
//     )
//     // user is logged in
//   } else {
//     body = (
//       <div>
//         <a href="/create-post">
//           <button>create post</button>
//         </a>
//         <div>{data.me.username}</div>
//         <button
//           onClick={async () => {
//             await logout()
//             // await apolloClient.resetStore()
//           }}
//         >
//           logout
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <div>
//         <a href="/">
//           <div>Utterzone</div>
//         </a>
//         <div>{body}</div>
//       </div>
//     </div>
//   )
// }

import { Button, Drawer } from "antd"
import React, { Component } from "react"

import { Link } from "react-router-dom"
import { Menu } from "antd"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
class LeftMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <SubMenu title={<span>Zones</span>}>
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
}

// import { Menu, Icon } from "antd"
// const SubMenu = Menu.SubMenu
// const MenuItemGroup = Menu.ItemGroup
class RightMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <Link to="/login">Sign In</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Sign Up</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

// import LeftMenu from "./LeftMenu"
// import RightMenu from "./RightMenu"

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
