import React from 'react'
import { Link } from 'gatsby'

const Header: React.FC = () => (
  <header>
    <div>
      <h1>
        <Link to="/">Currency Converter</Link>
      </h1>
    </div>
  </header>
)

export default Header
