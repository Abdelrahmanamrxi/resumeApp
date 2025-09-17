
import Header from '@/components/layout/Header/Header'
import Hero from './Hero/Hero'
import HowItWorks from './HowItWorks/HowItWorks'
import SocialProof from './SocialProof/SocialProof'
import WhyChoseUs from './WhyChoseUs/WhyChoseUs'
import Footer from '@/components/layout/Footer/Footer'
const LandingPage = () => {

  return (
        <div className='w-full '>
        <Header/>
        <Hero/> 
        <HowItWorks/>
        <SocialProof/>
        <WhyChoseUs/>
        <Footer/>
        </div>
  )
}

export default LandingPage
