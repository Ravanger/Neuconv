import React from "react"
import Head from "next/head"

type PropTypes = {
  title: string
  author?: string
  description?: string
  keywords?: string
  pageUrl?: string
  imageUrl?: string
  type?: string
}

const defaultProps = {
  author: "",
  description: "",
  keywords: "",
  pageUrl: "",
  imageUrl: "",
  type: "website",
}

const SEO: React.FC<PropTypes> = (props) => {
  const {
    author,
    description,
    title,
    keywords,
    pageUrl,
    imageUrl,
    type,
  } = props

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="application-name" content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="description" content={description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#9567f1" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={author} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      <link rel="canonical" href={pageUrl} />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
    </Head>
  )
}

SEO.defaultProps = defaultProps

export default SEO
