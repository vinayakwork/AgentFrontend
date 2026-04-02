// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import ChatWidget from './ChatWidget'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ChatWidget />
//   </React.StrictMode>
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ChatWidget from './ChatWidget'

function isConsentGiven() {
  try {
    const raw = localStorage.getItem('framerCookiesConsentMode')
    if (!raw) return false
    return JSON.parse(raw)?.necessary === true
  } catch { return false }
}

function init() {
  if (isConsentGiven()) {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode><ChatWidget /></React.StrictMode>
    )
    return
  }
  const interval = setInterval(() => {
    if (isConsentGiven()) {
      clearInterval(interval)
      ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode><ChatWidget /></React.StrictMode>
      )
    }
  }, 1000)
}

init()