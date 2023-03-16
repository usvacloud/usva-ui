import { FaAnchor } from "react-icons/fa"
import styles from "@/styles/shared/ErrorPage.module.scss"
import Link from "next/link"

export default function NotFound() {
    return (
        <>
            <div className={styles.errormain}>
                <div className={styles.middle}>
                    <h1>
                        Hi there, traveler! <FaAnchor />
                    </h1>
                    <h2>
                        You seem a bit lost. This page was not found or you don&apos;t have enough permissions
                        to access it. Would you like for me to help you a bit?
                    </h2>
                    <Link href="/" className={styles.button}>
                        Yes please, take me home!
                    </Link>
                </div>
            </div>
        </>
    )
}
