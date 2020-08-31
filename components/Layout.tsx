import React from "react"
import styled from "@emotion/styled"

const MainWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`

type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => (
  <MainWrapper>{props.children}</MainWrapper>
)

export default Layout
