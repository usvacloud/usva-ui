import Highlights from "@/components/About/Highlights"
import FAQ from "@/components/About/FAQ"
import TermsCondensed from "@/components/About/TermsCondensed"
import Support from "@/components/About/Support"
import Feedback from "@/components/About/Feedback"
import AboutLanding from "@/components/About/Landing"
import { MotionConfig } from "framer-motion"

export default function Home() {
    return (
        <>
            <MotionConfig transition={{ duration: 0.2, ease: "easeInOut" }} reducedMotion="always">
                <AboutLanding />
                <Highlights />
                <Feedback />
                <FAQ />
                <Support />
                <TermsCondensed />
            </MotionConfig>
        </>
    )
}