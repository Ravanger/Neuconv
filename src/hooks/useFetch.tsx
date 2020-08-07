// https://medium.com/swlh/usefetch-a-custom-react-hook-36d5f5819d8

import { useState, useEffect } from 'react'

type UseFetchPropTypes = {
  url: RequestInfo
  method?: string
  bodyData?: any
}

type UseFetchReturnTypes = {
  data: any
  isLoading: boolean
  hasError: boolean
  errorMessage: string
}

const UseFetchDefaultProps = {
  url: '',
  method: 'GET',
  bodyData: {},
}

const useFetch = (props: UseFetchPropTypes): UseFetchReturnTypes => {
  const { url, method, bodyData } = props

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Controller to cancel fetch on unmount
    const controller = new AbortController()

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(url, {
          method: method,
          body: JSON.stringify(bodyData),
          signal: controller.signal,
        })
        const result = await response.json()
        if (response.ok) {
          setData(result)
        } else {
          setHasError(true)
          setErrorMessage(result)
        }
        setIsLoading(false)
      } catch (err) {
        setHasError(true)
        setErrorMessage(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (!isLoading) {
      fetchData()
    }

    return () => {
      // Cancel fetch request
      controller.abort()
    }
  }, [])

  return { data, isLoading, hasError, errorMessage }
}

useFetch.defaultProps = UseFetchDefaultProps

export default useFetch
