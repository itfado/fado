import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import TransitionCanvas from '@/components/TransitionCanvas'
import LatestBlogs from '@/components/LatestBlogs'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Ecosystem from '@/components/Ecosystem'
import GlobalPresence from '@/components/GlobalPresence'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import BrandMarquee from '@/components/BrandMarquee'

export default function Home() {
  return (
    <main>
      <TransitionCanvas />
      <Nav />
      <Hero />
      <BrandMarquee />
      <Stats />
      <About />
      <Ecosystem />
      <GlobalPresence />
      <LatestBlogs />
      <Contact />
      <Footer />
    </main>
  )
}
