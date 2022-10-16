import Landing from "@/components/Home/Landing"
import Highlights from "@/components/Home/Highlights"
import FAQ from "@/components/Home/FAQ"
import TermsCondensed from "@/components/Home/TermsCondensed"
import Support from "@/components/Home/Support"
import Feedback from "@/components/Home/Feedback"
import { MotionConfig } from "framer-motion"

export default function Home() {
  return (
    <>
        <MotionConfig transition={{ duration: 0.2, ease: "easeInOut" }} reducedMotion="always">
            <Landing />
            <Highlights />
            <Feedback />
            <FAQ />
            <Support />
            <TermsCondensed />
        </MotionConfig>
    </>
  )
}