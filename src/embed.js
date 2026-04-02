import React from 'react'
import ReactDOM from 'react-dom/client'
import ChatWidget from './ChatWidget'
import styles from './index.css?inline'

function mount() {
  const script =
    document.currentScript ||
    document.querySelector('script[data-vapr-url], script[src*="vapr-widget"]')

  const vaprUrl   = script?.dataset?.vaprUrl   || 'http://localhost:5000'
  const agentName = script?.dataset?.agentName || 'Vapr Assistant'
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}
