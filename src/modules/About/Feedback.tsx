import feedbackstyles from "@/styles/About/Feedback.module.scss"
import styles from "@/styles/About/About.module.scss"
import overlays from "@/styles/shared/Overlays.module.scss"
import { FormEvent, useState } from "react"
import Header from "../shared/Header"
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
import { defaultWrapper } from "src/common/apiwrapper/main"

export default function Feedback() {
    const [showForm, setShowForm] = useState(false)
    const [showThankYou, setShowThankYou] = useState(false)
    const [processing, setProcessing] = useState(false)

    async function processUpload(event: FormEvent) {
        event.preventDefault()
        setProcessing(true)
        await defaultWrapper.sendFeedback({
            comment: "Hello there. Your website is amazing. Great job.",
            boxes: "1,2,3,4,5,6",
        })

        setTimeout(() => {
            setProcessing(false)
            setShowForm(false)
            setShowThankYou(true)
            setTimeout(() => {
                setShowThankYou(false)
            }, 5000)
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
                    <a className={styles.button} onClick={() => setShowForm(true)}>
                        Let&apos;s do it!
                    </a>
                    <a className={styles.button} href="mailto:feedback@usva.cc">
                        Contact developer via mail
                    </a>
                </div>
            </div>

            <motion.div
                animate={{
                    transform: showForm ? "scaleY(1)" : "scaleY(0)",
                    opacity: showForm ? 1 : 0,
                }}
                className={[styles.fullscreenform, overlays.fullscreenform].join(" ")}
            >
                <div className={[styles.contentbox, overlays.contentbox].join(" ")}>
                    <div className={feedbackstyles.content}>
                        <FaTimes
                            className={[styles.close, overlays.close].join(" ")}
                            onClick={() => setShowForm(false)}
                        />

                        <h2 className="title">Give feedback!</h2>
                        <div className={feedbackstyles.form}>
                            <form onSubmit={processUpload}>
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

                                <button type="submit" className={feedbackstyles.button}>
                                    {processing ? (
                                        <div className="spinner light">
                                            <FaSpinner />
                                        </div>
                                    ) : (
                                        "Send my feedback"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div
                animate={{
                    transform: showThankYou ? "scaleY(1)" : "scaleY(0)",
                    opacity: showThankYou ? 1 : 0,
                }}
                className={[styles.fullscreenform, overlays.fullscreenform].join(" ")}
            >
                <div className={[styles.contentbox, overlays.contentbox].join(" ")}>
                    <FaTimes
                        className={[styles.close, overlays.close].join(" ")}
                        onClick={() => setShowThankYou(false)}
                    />
                    <Header
                        title="Thank you"
                        endChar="!"
                        description={
                            "Thank you for giving feedback! We read our feedbacks once per day. This window closes automatically in a few seconds."
                        }
                    />
                </div>
            </motion.div>
        </div>
    )
}
