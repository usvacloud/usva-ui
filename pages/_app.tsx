import Bar from "ui/shared/Bar"
import Footer from "ui/shared/Footer"
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
