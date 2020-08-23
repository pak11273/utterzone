import { Button } from "antd"
import React from "react"

interface HamburgerProps {
  changeState: any
}

export const Hamburger: React.FC<HamburgerProps> = ({ changeState }) => (
  <Button className="barsMenu" type="primary" onClick={changeState}>
    <span className="barsBtn"></span>
  </Button>
)
