import Bar from "../modules/shared/Bar"
import Footer from "../modules/shared/Footer"
import "@/styles/globals.scss"
import "@/styles/modules.scss"
import "@/styles/textstyles.scss"
import type { AppProps } from "next/app"
import { MotionConfig } from "framer-motion"
import { useEffect } from "react"

function MyApp({ Component, pageProps }: AppProps) {
    function detectColorScheme() {
        let darkTheme = false
        if (localStorage.getItem("theme")) {
            if (localStorage.getItem("theme") == "dark") {
                darkTheme = true
            }
        } else if (!window.matchMedia) {
            return
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            darkTheme = true
        }

        if (darkTheme) document.documentElement.setAttribute("data-theme", "dark")
    }

    useEffect(() => {
        if (typeof window === "undefined") return
        detectColorScheme()
        const htmlel = window.document.querySelector("html")
        if (htmlel?.getAttribute("data-darkreader-scheme") === "dark")
            document.documentElement.setAttribute("data-theme", "dark")
    }, [])
    return (
        <>
            <MotionConfig transition={{ duration: 0.6, bounce: 0, type: "spring" }}>
                <Bar />
                <Component {...pageProps} />
                <Footer />
            </MotionConfig>
        </>
    )
}

export default MyApp
