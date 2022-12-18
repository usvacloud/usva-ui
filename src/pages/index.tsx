import styles from "@/styles/Home/Home.module.scss"
import FileUpload from "@/components/Home/FileUpload"

export default function Home() {
    return (
        <>
            <div className={styles.landing}>
                <div className={styles.centerContainer}>
                    <FileUpload />
                </div>
            </div>
        </>
    )
}
