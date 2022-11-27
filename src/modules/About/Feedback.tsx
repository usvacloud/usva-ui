import feedbackstyles from "@/styles/About/Feedback.module.scss"
import styles from "@/styles/About/About.module.scss"
import overlays from "@/styles/shared/Overlays.module.scss"
import { FormEvent, useState } from "react"
import Header from "../shared/Header"
import { AnimatePresence, motion } from "framer-motion"
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
import { defaultWrapper, Errors } from "src/common/apiwrapper/main"
import { useEffect } from "react"
import { useRef } from "react"
import { useMemo } from "react"
import { useCallback } from "react"

const choices = [
    {
        icon: <FaProjectDiagram />,
        text: "Quite a few features",
    },
    {
        icon: <FaSmileBeam />,
        text: "Positive",
    },
    {
        icon: <FaFrown />,
        text: "Overall negative",
    },
    {
        icon: <FaBug />,
        text: "Lots of bugs",
    },
    {
        icon: <FaFileUpload />,
        text: "Too hard to use",
    },
    {
        icon: <FaCommentDots />,
        text: "Something else",
    },
]

export default function Feedback() {
    const [showForm, setShowForm] = useState(false)
    const [showThankYou, setShowThankYou] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [checks, setChecks] = useState<number[]>([])
    const [error, setError] = useState<Error | null>()
    const textarearef = useRef<HTMLTextAreaElement>(null)

    async function processUpload(event?: FormEvent) {
        if (event) event.preventDefault()
        setProcessing(true)

        if (checks.length == 0) {
            setProcessing(false)
            return
        }

        const req = await defaultWrapper.sendFeedback({
            message: textarearef?.current?.value || null,
            boxes: checks,
        })
        if (req instanceof Error) {
            setError(req)
        }

        setProcessing(false)
        setShowThankYou(true)
    }

    useEffect(() => {
        if (showThankYou) setTimeout(() => setShowForm(false), 5000)
    }, [showThankYou])

    useEffect(() => {
        if (textarearef.current == document.activeElement) return
        typeof window !== undefined &&
            window.addEventListener("keydown", (evt) => {
                if (evt.key == "Enter") {
                    processUpload()
                }
            })
    }, [])

    return (
        <div className={styles.box}>
            <div className={[styles.boxcontent, styles.blue].join(" ")}>
                <Header bigHeader={true} title="Tell us what you think" />
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
                    {!showThankYou && (
                        <div className={feedbackstyles.content}>
                            <FaTimes
                                className={[styles.close, overlays.close].join(" ")}
                                onClick={() => setShowForm(false)}
                            />
                            <h2 className="title">Give feedback!</h2>
                            <p>Please select at least one checkbox.</p>
                            <div className={feedbackstyles.form}>
                                <form onSubmit={processUpload}>
                                    <div className={feedbackstyles.container}>
                                        <textarea
                                            ref={textarearef}
                                            spellCheck={false}
                                            placeholder="My lovely description. This field is optional."
                                        />
                                    </div>

                                    <div className={feedbackstyles.checkboxes}>
                                        {choices.map((el, index) => {
                                            return (
                                                <div className={feedbackstyles.checkbox} key={index}>
                                                    <input
                                                        type="checkbox"
                                                        id={index.toString()}
                                                        name={index.toString()}
                                                        onChange={(e) => {
                                                            setChecks((prev) => {
                                                                if (e.target.checked) prev.push(index)
                                                                else prev.splice(index, 1)
                                                                return prev
                                                            })
                                                        }}
                                                    />
                                                    <label htmlFor={index.toString()}>
                                                        {el.icon} {el.text}
                                                    </label>
                                                </div>
                                            )
                                        })}
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
                    )}
                    <motion.div
                        animate={{
                            transform: showThankYou ? "translateY(0px)" : "translateY(20px)",
                            opacity: showThankYou ? 1 : 0,
                            display: showThankYou ? "block" : "none",
                        }}
                    >
                        <FaTimes
                            className={[styles.close, overlays.close].join(" ")}
                            onClick={() => setShowForm(false)}
                        />
                        {error ? (
                            <Header
                                title="Failed to send feedback"
                                endChar="!"
                                description={
                                    "We are very sorry, but we weren't able to complete your request. Please try again later."
                                }
                            />
                        ) : (
                            <Header
                                title="Thank you"
                                endChar="!"
                                description={
                                    "Thank you for giving feedback! We read your feedback as soon as possible. This window closes automatically in a few seconds."
                                }
                            />
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
