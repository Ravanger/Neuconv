import React from "react"
import styled from "@emotion/styled"

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: rgb(250, 250, 250);
  background: linear-gradient(
    135deg,
    rgba(250, 250, 250, 1) 0% rgba(240, 255, 255, 1) 1000%
  );
`

type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => (
  <MainWrapper>{props.children}</MainWrapper>
)

export default Layout
