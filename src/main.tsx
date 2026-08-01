import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyThemeChrome, shouldUseDarkChrome } from './lib/themeChrome'

// Paint dark chrome before React so home /ozellikler never flash a white bar
applyThemeChrome(shouldUseDarkChrome())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
