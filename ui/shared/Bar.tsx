import { useEffect, useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { motion } from "framer-motion"
import Link from "next/link"

function Links() {
    return (
        <>
            <div className="links">
                <a href="/Log In" className="animated">
                    For developers
                </a>
                <a href="/about" className="animated">
                    About
                </a>
                <a href="/download-file" className="animated">
                    Download a file
                </a>
            </div>
        </>
    )
}

export default function Bar() {
    const [barVisible, setBarVisible] = useState(false)
    const [windowWidth, setWindowWidth] = useState<Number>()

    const updateBarState = () => {
        if (typeof window !== "undefined") {
            if (window.innerWidth < 650) setBarVisible(false)
            else setBarVisible(true)
        }
    }

    const toggleBar = () => {
        setBarVisible(!barVisible)
    }

    useEffect(updateBarState, [])
    useEffect(() => {
        if (typeof window !== "undefined") setWindowWidth(window.innerWidth)
    }, [barVisible])

    if (typeof window !== "undefined") window.onresize = updateBarState

    return (
        <div className="bar">
            <div className="content">
                <div className="top">
                    <Link className="logo" href="/">
                        Usva
                    </Link>
                    <div onClick={toggleBar} className="menuicon">
                        {barVisible ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
                {(windowWidth || 0) < 650 ? (
                    <motion.div
                        animate={{
                            height: barVisible ? "inherit" : 0,
                            display: barVisible ? "block" : "none",
                            opacity: barVisible ? 1 : 0,
                        }}
                        transition={{ ease: "easeInOut", duration: 0.1 }}
                    >
                        <Links />
                    </motion.div>
                ) : (
                    <Links />
                )}
            </div>
        </div>
    )
}
