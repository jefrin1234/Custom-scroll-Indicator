import React, { useEffect, useState } from 'react'
import './scroll.css'
function ScrollIndicator({ url }) {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [scrollPercentage, setScrollPercentage] = useState(0)


  async function fetchData(getUrl) {
    try {

      setLoading(loading)
      const response = await fetch(getUrl)
      const data = await response.json();
      console.log(data)

      if (data && data.products && data.products.length !== 0) {
        setData(data.products)
        setLoading(false)
      }

    }
    catch (error) {
      console.log(error)
      setErrorMessage(error.message)
    }
  }

  useEffect(() => {
    fetchData(url)
  }, [url])


  function handelScrollPercentage() {
    console.log(document.body.scrollTop, document.documentElement.scrollTop, document.documentElement.scrollHeight, document.documentElement.clientHeight);
    const howMuchScrolled = document.body.scrollTop || document.documentElement.scrollTop

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

    setScrollPercentage((howMuchScrolled / height) * 100)
  }

  useEffect(() => {
    window.addEventListener('scroll', handelScrollPercentage)

    return () => {
      window.removeEventListener('scroll', () => {

      }, [])
    }
  })

  console.log(data, loading)
  console.log(scrollPercentage)

  if(errorMessage){
    return <div>Error {errorMessage}</div>
  }

  if(loading){
    return <div>Loading data Please wait</div>
  }

  return (
    <div>
      <div className="top-container">
        <h1>Custom Scroll Indicator</h1>
        <div className="scroll-progress-tracking-container">
          <div className='current-progress-bar' style={{ width: `${scrollPercentage}%` }}></div>
        </div>
      </div>

      <div className='data-container'>
        {
          data && data.length > 0 ?
            data.map((item) =>
              <p>{item.title}</p>
            )
            : null
        }
      </div>
    </div>
  )
}

export default ScrollIndicator
