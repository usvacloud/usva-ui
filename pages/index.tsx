import Landing from "@/components/Home/Landing"
import Highlights from "@/components/Home/Highlights"
import FAQ from "@/components/Home/FAQ"
import TermsCondensed from "@/components/Home/TermsCondensed"
import Support from "@/components/Home/Support"
import Feedback from "@/components/Home/Feedback"

export default function Home() {
  return (
    <>
      <Landing />
      <Highlights />
      <Feedback />
      <FAQ />
      <Support />
      <TermsCondensed />
    </>
  )
}