import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Welcome to My Wesite</h1>
    <p>This is a sample site for Gatsby Crash Course.</p>
  </Layout>
)

export default IndexPage
