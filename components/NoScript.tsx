import { CSSProperties } from "react"

const NoScript = () => {
  return (
    <noscript>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 3000,
          height: "100%",
          width: "100%",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "1.2em",
            fontFamily: "monospace",
            fontWeight: "bolder",
          }}
        >
          Please enable Javascript to use this app
        </p>
      </div>
    </noscript>
  )
}

export default NoScript
