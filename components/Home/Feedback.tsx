import styles from "@/styles/Home.module.scss"
import { useState } from "react"
import Header from "./Header"
import { motion } from "framer-motion";

export default function Accounts() {
    const [quickFeedback, setQuickFeedback] = useState(false);

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
    
        {quickFeedback &&
            <motion.div
                animate={{
                    opacity: 1,
                    display: "block",
                    zIndex: 100,              
                }}
            >
                <div className={styles.fullscreenform}>
                    <div className={styles.content}>
                        <div>
                            <Header 
                                title="Give feedback"
                            />
                            <p className="description small">
                            We are always happy to hear you. If you'd for example like a new feature, you can now tell it below.
                            </p>
                        </div>
                        
                        <div className={styles.form}>
                            <div className={styles.container}>
                                <h2 className="title">Please select boxes that match your opinion.</h2>
                                <div className={styles.checkboxes}>
                                    <div className={styles.container}>
                                        <input type="checkbox" id="1" name="fav_language" value="HTML" />
                                        <label htmlFor="1">UI/UX is slow or unpleasant</label>
                                    </div>
                                    <div className={styles.container}>
                                        <input type="checkbox" id="2" name="fav_language" value="HTML" />
                                        <label htmlFor="2">Not user friendly</label>
                                    </div>
                                    <div className={styles.container}>
                                        <input type="checkbox" id="3" name="fav_language" value="HTML" />
                                        <label htmlFor="3">Too few features</label>
                                    </div>

                                    <div className={styles.container}>
                                        <input type="checkbox" id="4" name="fav_language" value="HTML" />
                                        <label htmlFor="4">Insecure (please justify)</label>
                                    </div>
                                    <div className={styles.container}>
                                        <input type="checkbox" id="5" name="fav_language" value="HTML" />
                                        <label htmlFor="5">Untrustworthy</label>
                                    </div>
                                    <div className={styles.container}>
                                        <input type="checkbox" id="6" name="fav_language" value="HTML" />
                                        <label htmlFor="6">Something else</label>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.container}>
                                <h2 className="title">Anything else? Write below.</h2>
                                <input placeholder="I love the colors!" type="text"/>
                            </div>

                            <div className={styles.buttons}>
                                <button className={styles.close} onClick={() => setQuickFeedback(false)}>Close</button>
                                <button className={styles.button}>Send my feedback</button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        }
    </div>
}