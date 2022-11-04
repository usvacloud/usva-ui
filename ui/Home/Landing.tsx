import styles from "@/styles/Home/Home.module.scss"
import FileUpload from "./FileUpload"

export default function Landing() {
    return (
        <>
            <div className={styles.landing}>
                <div className={styles.centerContainer}>
                    <div className={styles.header}>
                        <h2 className="title small">We wouldn&apos;t be lying if we said that we are...</h2>
                        <h1 className="title big">The friendliest temporary file cloud to exist.</h1>
                        <h3 className="description">
                            This service was created to be a straightforward way for anyone to share their
                            personal files as privately and securely as possible.
                        </h3>
                    </div>
                    <FileUpload />
                </div>
            </div>
        </>
    )
}
