import { useState } from 'react'
import Hero from './sections/Hero'
import ShowCaseSection from './sections/ShowCaseSection'
import NavBar from './components/NavBar'
import LogoSection from './components/LogoSection'

function App() {
  const [count, setCount] = useState(0)

  return (
  <main>
      <NavBar />
      <Hero />
      <ShowCaseSection />
      <LogoSection />
    </main>
  )
}

export default App
