import styles from "@/styles/Home/Home.module.scss"
import FileUpload from "./FileUpload"

export default function Landing() {
    return (
        <>
            <div className={styles.landing}>
                <div className={styles.centerContainer}>
                    <div className={styles.header}>
                        <h2 className="title small">Hi, my name is Usva.</h2>
                        <h1 className="title big">
                            And I&apos;m here to help you share your files at{" "}
                            <i>
                                <span className={styles.special}>lightspeed</span>!
                            </i>
                        </h1>
                    </div>
                    <FileUpload />
                </div>
            </div>
        </>
    )
}
