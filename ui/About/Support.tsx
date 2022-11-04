import Header from "../shared/Header"
import styles from "@/styles/About/About.module.scss"

export default function Support() {
    return (
        <div className={styles.box}>
            <div className={styles.boxcontent}>
                <Header title="Hi dear user! Do you have a moment" endChar="?" />
                <p className="description">
                    We&apos;d be forever happy if you donated a small amount to keep this project running.
                </p>
                <div className={styles.links}>
                    <a
                        href="///paypal.me/tvalkonen"
                        rel="noreferrer"
                        target="_blank"
                        className={styles.button}
                    >
                        Make a donation
                    </a>
                </div>
            </div>
        </div>
    )
}
