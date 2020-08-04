import React from 'react'
import { Link, PageProps } from 'gatsby'

import Layout from '@components/Layout'
import SEO from '@components/SEO'

const IndexPage: React.FC<PageProps> = () => (
  <Layout>
    <SEO title="Home" />
    Home
  </Layout>
)

export default IndexPage
