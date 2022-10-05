import styles from "@/styles/Home.module.scss"
import Header from "./Header"

export default function Support() {
    return <div className={styles.support}>
        <Header
            title="Support this project"
            description={`
                We are alive, but unfortunately it isn't free for us.
                Show your support by donating a small amount
                to keep this website running. Thank you and remember to have a great day! :)
            `}
        />
        <div className={styles.links}>
            <div className={styles.button}>Make a donation</div>
        </div>
    </div>
}