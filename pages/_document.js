import Document, { Html, Head, Main, NextScript } from "next/document"
import NoScript from "@components/NoScript"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body style={{ margin: 0 }}>
          <NoScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
