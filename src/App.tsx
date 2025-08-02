import { useState } from 'react'
import Hero from './sections/Hero'
import ShowCaseSection from './sections/ShowCaseSection'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
  <main>
      <NavBar />
      <Hero />
      <ShowCaseSection />
    </main>
  )
}

export default App
