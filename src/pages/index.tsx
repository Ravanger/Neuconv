import React from 'react'
import { PageProps } from 'gatsby'

import Layout from '@components/Layout'
import SEO from '@components/SEO'

const IndexPage: React.FC<PageProps> = () => (
  <Layout>
    <SEO title="Home" />
    <form method="get" className="pure-g">
      <input type="number" className="pure-u-1" />
      <input type="number" className="pure-u-1" />
    </form>
  </Layout>
)

export default IndexPage
