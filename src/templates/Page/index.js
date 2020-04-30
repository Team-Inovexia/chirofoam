import React from 'react'
import { graphql } from 'gatsby'
import Header from '~/components/header'
import Footer from '~/components/footer'
import SEO from '~/components/seo'
import Logo from '~/assets/img/logo-home.png'
import ReactHtmlParser from 'react-html-parser'

const Page = ({ data }) => {
  const page = data.shopifyPage
  return (
    <>
      <SEO
        title={page.title}
        description={page.bodySummary}
        image={Logo} 
        imageWidth={200} 
        imageHeight={44}
      />
      <Header />
      <main className="content">{ReactHtmlParser(page.body)}</main>
      <Footer />
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyPage(handle: {eq: $handle}) {
      title
      body
      bodySummary
    }
  }
`


export default Page
