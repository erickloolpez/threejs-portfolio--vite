import { useState } from 'react'
import Hero from './sections/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
  <main>
      <Hero />
    </main>
  )
}

export default App
