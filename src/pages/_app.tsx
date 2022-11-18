import Bar from "../modules/shared/Bar"
import Footer from "../modules/shared/Footer"
import "@/styles/modules.scss"
import "@/styles/globals.scss"
import "@/styles/textstyles.scss"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Bar />
            <Component {...pageProps} />
            <Footer />
        </>
    )
}

export default MyApp