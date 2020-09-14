import React from "react"
import Head from "next/head"

type PropTypes = {
  title: string
  author?: string
  description?: string
  keywords?: string
  pageUrl?: string
  imageUrl?: string
  themecolor?: string
}

const defaultProps = {
  author: "",
  description: "",
  keywords: "",
  pageUrl: "",
  imageUrl: "",
}

const SEO: React.FC<PropTypes> = (props) => {
  const {
    author,
    description,
    title,
    keywords,
    pageUrl,
    imageUrl,
    themecolor,
  } = props

  return (
    <Head>
      <title>{title}</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      {themecolor && <meta name="theme-color" content={themecolor} />}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={title} />{" "}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={author} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      <link rel="canonical" href={pageUrl} />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color={themecolor} />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="application-name" content={title} />
      <meta name="msapplication-TileColor" content="#ecf0f3" />
    </Head>
  )
}

SEO.defaultProps = defaultProps

export default SEO
