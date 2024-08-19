import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import BlogContainer from './containers/BlogContainer.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
    <BlogContainer />
    {/* <App /> */}
  </>
  // </StrictMode>,
)
