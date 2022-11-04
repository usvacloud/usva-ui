import styles from "@/styles/Home/Home.module.scss"
import FileUpload from "./FileUpload"

export default function Landing() {
    return (
        <>
            <div className={styles.landing}>
                <div className={styles.centerContainer}>
                    <div className={styles.header}>
                        <h2 className="title small">Welcome to Usva, also mildly known as</h2>
                        <h1 className="title big">
                            The <span className={styles.special}>friendliest</span> temporary{" "}
                            <span className={styles.special}>file cloud</span> to exist.
                        </h1>
                    </div>
                    <FileUpload />
                </div>
            </div>
        </>
    )
}
