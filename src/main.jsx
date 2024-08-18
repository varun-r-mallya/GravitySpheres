import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import BlogHeading from './components/BlogHeading.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
    <BlogHeading />
    <App />
  </>
  // </StrictMode>,
)
