import styles from "@/styles/Home/Home.module.scss"
import FileUpload from "./FileUpload"

export default function Landing() {
    return (
        <>
            <div className={styles.landing}>
                <div className={styles.centerContainer}>
                    <div className={styles.header}>
                        <h2 className="title small">This website got a flex:</h2>
                        <h1 className="title big">
                            Usva is built from ground-up with sacred{" "}
                            <span className={styles.special}>interest</span> and singular{" "}
                            <span className={styles.special}>love</span> to all users. Therefore, it&apos;s
                            user friendly and has all the features you need.
                        </h1>
                    </div>
                    <FileUpload />
                </div>
            </div>
        </>
    )
}
