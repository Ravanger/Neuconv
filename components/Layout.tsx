import React from "react"

type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => <main>{props.children}</main>

export default Layout
