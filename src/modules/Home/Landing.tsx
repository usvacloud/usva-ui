import styles from "@/styles/Home/Home.module.scss"
import FileUpload from "./FileUpload"

export default function Landing() {
    return (
        <>
            <div className={styles.landing}>
                <div className={styles.centerContainer}>
                    <div className={styles.header}>
                        <h2 className="title small">Hi there, my name is Usva.</h2>
                        <h1 className="title big">
                            And I&apos;m here to help you share your files in a{" "}
                            <span className={styles.special}>super fast and secure</span> way.
                        </h1>
                    </div>
                    <FileUpload />
                </div>
            </div>
        </>
    )
}
