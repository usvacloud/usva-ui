import styles from "@/styles/Home.module.scss"
import Header from "./Header"

export default function Support() {
    return (
        <div className={styles.box}>
            <div className={styles.boxcontent}>
                <Header title="Ciao! Please read this alert" />
                <p className="description">
                    We&apos;d be forever happy if you donated a small amount to keep this project running!
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
