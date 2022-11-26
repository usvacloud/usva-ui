import Header from "../shared/Header"
import styles from "@/styles/About/About.module.scss"
export default function Contribute() {
    return (
        <div className={styles.box}>
            <div className={styles.boxcontent}>
                <Header title="Open for contributions" endChar="!" bigHeader={true} />
                <p className="description">
                    Usva is open-source software and open to any kinds of contributions. There is a lot of
                    things you can help with, including for example writing API docs or improving the website.
                </p>
                <div className={styles.links}>
                    <a
                        href="///github.com/romeq/usva"
                        rel="noreferrer"
                        target="_blank"
                        className={styles.button}
                    >
                        Backend source code
                    </a>
                    <a
                        href="///github.com/romeq/usva-ui"
                        rel="noreferrer"
                        target="_blank"
                        className={styles.button}
                    >
                        Website source code
                    </a>
                </div>
            </div>
        </div>
    )
}
