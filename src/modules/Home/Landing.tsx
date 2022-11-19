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
                            ...and I&apos;m here to help you share your files over the{" "}
                            <span className={styles.special}>internet</span>.
                        </h1>
                    </div>
                    <FileUpload />
                </div>
            </div>
        </>
    )
}
