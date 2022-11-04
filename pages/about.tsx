import Highlights from "ui/About/Highlights"
import FAQ from "ui/About/FAQ"
import TermsCondensed from "ui/About/TermsCondensed"
import Support from "ui/About/Support"
import Feedback from "ui/About/Feedback"
import AboutLanding from "ui/About/Landing"
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
