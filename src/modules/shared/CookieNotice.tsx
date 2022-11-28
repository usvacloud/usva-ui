import styles from "@/styles/shared/CookieNotice.module.scss"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

export default function CookieNotice() {
    const [accepted, setAccepted] = useState(false)
    const oh = useRef<HTMLDivElement>(null)
    const lsname = useMemo(() => "cookiesAccepted", [])

    useEffect(() => {
        if (typeof window === "undefined") return
        const hasAccepted = localStorage.getItem(lsname) === "yes"
        if (!hasAccepted && oh.current) oh.current.style.display = "block"
        setAccepted(hasAccepted)
    }, [lsname])

    function allowCookies() {
        if (typeof window === "undefined") return
        localStorage.setItem(lsname, "yes")
        setAccepted(true)
        setTimeout(() => {
            if (oh.current) oh.current.style.display = "none"
        }, 300)
    }

    return (
        <>
            <motion.div
                animate={{
                    opacity: accepted ? 0 : 1,
                    transform: accepted ? "translateY(5px)" : "translateY(0px)",
                }}
                ref={oh}
                className={styles.main}
            >
                <div className={styles.bg}>
                    <div className={styles.content}>
                        <h3>Quick notice for ya!</h3>
                        <p>
                            This service uses cookies to save the authentication session when downloading
                            protected files. For more information see our{" "}
                            <Link target="_blank" href="/privacy-policy">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                        <button onClick={allowCookies}>Alright</button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
