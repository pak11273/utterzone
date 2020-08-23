import React, { useState } from "react"

import { Button } from "antd"

interface HamburgerProps {
  changeState: any
}

export const Hamburger: React.FC<HamburgerProps> = ({ changeState }) => (
  <Button className="barsMenu" type="primary" onClick={changeState}>
    <span className="barsBtn"></span>
  </Button>
)
