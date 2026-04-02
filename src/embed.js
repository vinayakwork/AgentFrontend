import React from 'react'
import ReactDOM from 'react-dom/client'
import ChatWidget from './ChatWidget'
import styles from './index.css?inline'

const CONSENT_KEY = 'framerCookiesConsentMode'
 
function isConsentGiven() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return false
    const consent = JSON.parse(raw)
    return consent?.necessary === true
  } catch {
    return false
  }
}
 
// function mount() {
//   const script =
//     document.currentScript ||
//     document.querySelector('script[data-vapr-url], script[src*="vapr-widget"]')

//   const vaprUrl   = script?.dataset?.vaprUrl   || 'http://localhost:5000'
//   const agentName = script?.dataset?.agentName || 'Vapr Assistant'
//   const token     = script?.dataset?.token     || ''

//   const host = document.createElement('div')
//   host.id = 'vapr-widget-host'
//   document.body.appendChild(host)

//   const shadow = host.attachShadow({ mode: 'open' })

//   const style = document.createElement('style')
//   style.textContent = styles
//   shadow.appendChild(style)

//   const mountPoint = document.createElement('div')
//   shadow.appendChild(mountPoint)

//   ReactDOM.createRoot(mountPoint).render(
//     <ChatWidget vaprUrl={vaprUrl} agentName={agentName} token={token} />
//   )
// }

// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', mount)
// } else {
//   mount()
// }


function mountWidget() {
  // Don't mount twice
  if (document.getElementById('vapr-widget-host')) return
 
  const script =
    document.currentScript ||
    document.querySelector('script[data-vapr-url], script[src*="vapr-widget"]')
 
  const vaprUrl   = script?.dataset?.vaprUrl   ;
  const agentName = script?.dataset?.agentName ;
  const token     = script?.dataset?.token     || ''
 
  const host = document.createElement('div')
  host.id = 'vapr-widget-host'
  document.body.appendChild(host)
 
  const shadow = host.attachShadow({ mode: 'open' })
 
  const style = document.createElement('style')
  style.textContent = styles
  shadow.appendChild(style)
 
  const mountPoint = document.createElement('div')
  shadow.appendChild(mountPoint)
 
  ReactDOM.createRoot(mountPoint).render(
    <ChatWidget vaprUrl={vaprUrl} agentName={agentName} token={token} />
  )
}
 
function init() {
  if (isConsentGiven()) {
    // Consent already accepted — mount immediately
    mountWidget()
    return
  }
 
  // Poll every second until necessary consent is given
  const interval = setInterval(() => {
    if (isConsentGiven()) {
      clearInterval(interval)
      mountWidget()
    }
  }, 1000)
}
 
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}