import Hero from "../components/Hero"
import BrandLogos from "../components/BrandLogos"
import AnimatedSection from "../components/AnimatedSection"
import AccountSection from "../components/AccountSection"

const Home = ({ setPage, openBrandPage, user }) => {
  return (
    <>
      <Hero />
      <BrandLogos openBrandPage={openBrandPage} />
      <AnimatedSection setPage={setPage} />
      <AccountSection setPage={setPage} user={user} />
    </>
  )
}

export default Home
