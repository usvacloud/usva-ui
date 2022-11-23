import styles from "@/styles/Home/Home.module.scss"
import FileUpload from "@/components/Home/FileUpload"

export default function Home() {
    return (
        <>
            <div className={styles.landing}>
                <div className={styles.centerContainer}>
                    <div className={styles.header}>
                        <h1>Hello! My name is Usva. I&apos;m here to help you share your files.</h1>
                    </div>
                    <FileUpload />
                </div>
            </div>
        </>
    )
}
