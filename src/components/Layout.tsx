import React from 'react'

type PropTypes = {
  children: React.ReactNode
}

const Layout: React.FC<PropTypes> = ({ children }) => <main>{children}</main>

export default Layout
