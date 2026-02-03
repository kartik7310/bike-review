

import BikePage from './pages/BikePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/bike" element={<BikePage />} />
      </Routes>
    </Router>
  )
}

export default App