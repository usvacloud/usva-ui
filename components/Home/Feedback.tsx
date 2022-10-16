import styles from "@/styles/Home.module.scss"
import { useEffect, useState } from "react"
import Header from "./Header"
import { motion } from "framer-motion";
import { FaSpinner, FaTimes } from "react-icons/fa";

export default function Feedback() {
    const [quickFeedback, setQuickFeedback] = useState(false);
    const [processing, setProcessing] = useState(false);

    function processUpload() {
        setProcessing(true)
        setTimeout(() => {
            setProcessing(false)
            setQuickFeedback(false)
        }, 1000)
    }

    return <div className={styles.box}>
        <div className={[styles.content, styles.blue].join(" ")}>
            <Header
                title="Tell us what you think"
            />
            <p className="description small">
                Don't worry! We made it easy for you. 
                It takes less than 10 seconds to give feedback, and we'd love to hear
                your opinion to improve our service.
            </p>
            <div className={styles.links}>
                <a className={styles.button} onClick={() => setQuickFeedback(true)}>Let's do it!</a>
                <a className={styles.button} href="mailto:feedback@usva.cc">Contact developer via mail</a>
            </div>
        </div>
    
        <motion.div
            animate={{
                transform: quickFeedback ? "scaleY(1)" : "scaleY(0)",
                opacity: quickFeedback ? 1 : 0
            }}
            className={styles.fullscreenform}
        >
            <div className={styles.content}>
                <FaTimes className={styles.close} onClick={() => setQuickFeedback(false)} />

                <div>
                    <Header 
                        title="Give feedback"
                    />
                    <p className="description">
                        We are always happy to hear you. If you'd for example like a new feature, 
                        you can now tell it below.
                    </p>
                </div>
                
                <div className={styles.form}>

                    <div className={styles.container}>
                        <h3 className="title">Shortly in your own beautiful words (optional):</h3>
                        <textarea placeholder="I love the colors!" />
                    </div>

                    <div className={styles.container}>
                        <h3 className="title">Please select boxes that match your opinion.</h3>
                        <div className={styles.checkboxes}>

                            <div className={styles.container}>
                                <input type="checkbox" id="1" name="fav_language" value="HTML" />
                                <label htmlFor="1">Too few features</label>
                            </div>

                            <div className={styles.container}>
                                <input type="checkbox" id="4" name="fav_language" value="HTML" />
                                <label htmlFor="4">Positive in general</label>
                            </div>

                            <div className={styles.container}>
                                <input type="checkbox" id="5" name="fav_language" value="HTML" />
                                <label htmlFor="5">Untrustworthy</label>
                            </div>

                            <div className={styles.container}>
                                <input type="checkbox" id="6" name="fav_language" value="HTML" />
                                <label htmlFor="6">Something else</label>
                            </div>

                            <div className={styles.container}>
                                <input type="checkbox" id="2" name="fav_language" value="HTML" />
                                <label htmlFor="2">Untrustworthy</label>
                            </div>

                            <div className={styles.container}>
                                <input type="checkbox" id="3" name="fav_language" value="HTML" />
                                <label htmlFor="3">Something else</label>
                            </div>
                        </div>
                    </div>

                    <button className={styles.button} onClick={processUpload}>
                        {processing
                            ? <div className="spinner light"><FaSpinner /></div> 
                            : "Send my feedback"}
                    </button>
                </div>
            </div>
        </motion.div>
    </div>
}