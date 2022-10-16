import styles from "@/styles/Home.module.scss"
import Header from "./Header"

export default function Support() {
    return <div className={styles.box}>
        <div className={styles.content}>
            <Header
                title="Hi friend, just a quick note"
            />
            <p className="description">
                We live because of donation money, and you can show your support by donating a small amount
                to keep this website running. Anyways nothing more than that, thank you and have a great day!
            </p>
            <div className={styles.links}>
                <a href="///paypal.me/tvalkonen" target="_blank" className={styles.button}>Make a donation</a>
            </div>
        </div>
    </div>
}