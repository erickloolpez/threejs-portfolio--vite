import { useState } from 'react'
import Hero from './sections/Hero'
import ShowCaseSection from './sections/ShowCaseSection'

function App() {
  const [count, setCount] = useState(0)

  return (
  <main>
      <Hero />
      <ShowCaseSection />
    </main>
  )
}

export default App
