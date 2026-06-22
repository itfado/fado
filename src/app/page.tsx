import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Ecosystem from '@/components/Ecosystem'
import GlobalPresence from '@/components/GlobalPresence'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Stats />
      <Ecosystem />
      <GlobalPresence />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
