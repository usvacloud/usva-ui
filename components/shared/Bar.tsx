import { createRef, useEffect, useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { motion } from "framer-motion"

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

    return <div className="bar">
        <div className="content">
            <div className="top">
                <a className="logo" href="/">Usva</a>
                <div onClick={toggleBar} className="menuicon">
                    {
                        barVisible 
                            ? <FaTimes />
                            : <FaBars />
                    }
                </div>
            </div>
            {
                ((windowWidth || 0) < 650) 
                ? (
                    <motion.div 
                        animate={{
                            height: barVisible ? "inherit":0,
                            display: barVisible ? "block":"none",
                            opacity: barVisible ? 1:0
                        }}
                        transition={{ ease: "easeInOut", duration: .1 }}
                    >
                        <div className="links">
                            <a href="/join-the-community" className="animated">Join the community</a>
                            <a href="/download-file" className="animated">Download a file</a>
                            <a href="/support" className="animated">Support</a>
                        </div>
                    </motion.div>
                ) 
                : (
                <div className="links">
                    <a href="/join-the-community" className="animated">Join the community</a>
                    <a href="/download-file" className="animated">Download a file</a>
                    <a href="/support" className="animated">Support</a>
                </div>
                )
            }
            
        </div>
    </div>
}