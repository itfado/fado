import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import VideoShowcase from '@/components/VideoShowcase'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Ecosystem from '@/components/Ecosystem'
import GlobalPresence from '@/components/GlobalPresence'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <VideoShowcase />
      <Stats />
      <About />
      <Ecosystem />
      <GlobalPresence />
      <Contact />
      <Footer />
    </main>
  )
}
