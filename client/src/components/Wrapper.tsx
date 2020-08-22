import React from "react"

export type WrapperVariant = "small" | "regular"

interface WrapperProps {
  variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return <div>{children}</div>
}
