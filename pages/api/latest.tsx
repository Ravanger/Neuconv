import { NextApiRequest, NextApiResponse } from "next"
import { parseString } from "xml2js"
import fetch from "node-fetch"

const API_URL: string =
  "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"

type ResponseData = {
  date: string
  base: string
  rates: { [key: string]: number }
  error?: any
}

const fetchLatest = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  await fetch(API_URL)
    .then((response) => response.text())
    .then((xml) => {
      parseString(xml, (err, result) => {
        if (err) throw err

        if (result) {
          const cubePath = result["gesmes:Envelope"].Cube[0].Cube[0]

          let output: ResponseData = {
            date: cubePath.$.time,
            base: "EUR",
            rates: {},
          }
          cubePath.Cube.forEach((data: any) => {
            output.rates[data.$.currency] = parseFloat(data.$.rate)
          })

          res.status(200).json(output)
        }
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        date: "00-00-00",
        base: "ERR",
        rates: {},
        error: "Internal error occurred",
      })
    })
}

export default fetchLatest
