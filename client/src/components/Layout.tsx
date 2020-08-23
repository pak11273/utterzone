import { Col, Row } from "antd"

import { NavbarMain } from "../components"
import React from "react"

type LayoutVariant = "small" | "regular"
interface LayoutProps {
  variant?: LayoutVariant
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Col xs={24} sm={22} md={16}>
        {children}
      </Col>
    </div>
  )
}
