import styles from "@/styles/Home/Home.module.scss"
import FileUpload from "./FileUpload"

export default function Landing() {
    return (
        <>
            <div className={styles.landing}>
                <div className={styles.centerContainer}>
                    <div className={styles.header}>
                        <h1 className="title big">
                            Hi, my name is Usva. I&apos;m here to help you save your files.
                        </h1>
                    </div>
                    <FileUpload />
                </div>
            </div>
        </>
    )
}
