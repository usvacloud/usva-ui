import Bar from "../modules/shared/Bar"
import Footer from "../modules/shared/Footer"
import "@/styles/globals.scss"
import "@/styles/modules.scss"
import "@/styles/textstyles.scss"
import type { AppProps } from "next/app"
import { MotionConfig } from "framer-motion"
import { useEffect } from "react"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <MotionConfig transition={{ duration: 0.2, ease: "easeInOut" }}>
                <Bar />
                <Component {...pageProps} />
                <Footer />
            </MotionConfig>
        </>
    )
}

export default MyApp
