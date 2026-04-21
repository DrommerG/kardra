import Hero from '../components/sections/home/Hero'
import Problem from '../components/sections/home/Problem'
import Solution from '../components/sections/home/Solution'
import ProductsVsServices from '../components/sections/home/ProductsVsServices'
import FeaturedProducts from '../components/sections/home/FeaturedProducts'
import FeaturedServices from '../components/sections/home/FeaturedServices'
import HowItWorks from '../components/sections/home/HowItWorks'
import UseCasesPreview from '../components/sections/home/UseCasesPreview'
import HomeCTA from '../components/sections/home/HomeCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <ProductsVsServices />
      <FeaturedProducts />
      <FeaturedServices />
      <HowItWorks />
      <UseCasesPreview />
      <HomeCTA />
    </>
  )
}
