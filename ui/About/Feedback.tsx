import feedbackstyles from "@/styles/About/Feedback.module.scss"
import styles from "@/styles/About/About.module.scss"
import { useState } from "react"
import Header from "ui/shared/Header"
import { motion } from "framer-motion"
import {
    FaBug,
    FaCommentDots,
    FaFileUpload,
    FaFrown,
    FaProjectDiagram,
    FaSmileBeam,
    FaSpinner,
    FaTimes,
} from "react-icons/fa"

export default function Feedback() {
    const [quickFeedback, setQuickFeedback] = useState(false)
    const [processing, setProcessing] = useState(false)

    function processUpload() {
        setProcessing(true)
        setTimeout(() => {
            setProcessing(false)
            setQuickFeedback(false)
        }, 500)
    }

    return (
        <div className={styles.box}>
            <div className={[styles.boxcontent, styles.blue].join(" ")}>
                <Header title="Tell us what you think" />
                <p className="description small">
                    Don&apos;t worry! We made it easy for you. It takes less than 10 seconds to give feedback,
                    and we&apos;d love to hear your opinion to improve our service.
                </p>
                <div className={styles.links}>
                    <a className={styles.button} onClick={() => setQuickFeedback(true)}>
                        Let&apos;s do it!
                    </a>
                    <a className={styles.button} href="mailto:feedback@usva.cc">
                        Contact developer via mail
                    </a>
                </div>
            </div>

            <motion.div
                animate={{
                    transform: quickFeedback ? "scaleY(1)" : "scaleY(0)",
                    opacity: quickFeedback ? 1 : 0,
                }}
                className={styles.fullscreenform}
            >
                <div className={styles.contentbox}>
                    <div className={feedbackstyles.content}>
                        <FaTimes className={styles.close} onClick={() => setQuickFeedback(false)} />

                        <h2 className="title">Feedback form</h2>
                        <div className={feedbackstyles.form}>
                            <div className={feedbackstyles.container}>
                                <textarea
                                    spellCheck={false}
                                    placeholder="My lovely description. This field is optional."
                                />
                            </div>

                            <div className={feedbackstyles.checkboxes}>
                                <div className={feedbackstyles.checkbox}>
                                    <input type="checkbox" id="1" name="fav_language" value="HTML" />
                                    <label htmlFor="1">
                                        {" "}
                                        <FaProjectDiagram /> Quite a few features
                                    </label>
                                </div>
                                <div className={feedbackstyles.checkbox}>
                                    <input type="checkbox" id="4" name="fav_language" value="HTML" />
                                    <label htmlFor="4">
                                        <FaSmileBeam /> Positive!
                                    </label>
                                </div>
                                <div className={feedbackstyles.checkbox}>
                                    <input type="checkbox" id="5" name="fav_language" value="HTML" />
                                    <label htmlFor="5">
                                        <FaBug />
                                        Lots of bugs
                                    </label>
                                </div>
                                <div className={feedbackstyles.checkbox}>
                                    <input type="checkbox" id="3" name="fav_language" value="HTML" />
                                    <label htmlFor="3">
                                        <FaFileUpload />
                                        Too hard to use
                                    </label>
                                </div>
                                <div className={feedbackstyles.checkbox}>
                                    <input type="checkbox" id="2" name="fav_language" value="HTML" />
                                    <label htmlFor="2">
                                        <FaFrown />
                                        Overall negative
                                    </label>
                                </div>
                                <div className={feedbackstyles.checkbox}>
                                    <input type="checkbox" id="6" name="fav_language" value="HTML" />
                                    <label htmlFor="6">
                                        <FaCommentDots /> Something else..
                                    </label>
                                </div>
                            </div>

                            <button className={feedbackstyles.button} onClick={processUpload}>
                                {processing ? (
                                    <div className="spinner light">
                                        <FaSpinner />
                                    </div>
                                ) : (
                                    "Send my feedback"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
