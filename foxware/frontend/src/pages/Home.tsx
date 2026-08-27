import { Hero } from '../sections/Hero'
import { Marquee } from '../sections/Marquee'
import { Features } from '../sections/Features'
import { Stats } from '../sections/Stats'
import { Founder } from '../sections/Founder'
import { FAQ } from '../sections/FAQ'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Features />
      <Stats />
      <Founder />
      <FAQ />
    </>
  )
}