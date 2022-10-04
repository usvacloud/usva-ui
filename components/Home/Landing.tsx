import styles from "@/styles/Home.module.scss"

export default function Landing() {
    return <>
        <div className={styles.landing}>
            <div className={styles.centerContainer}>
                <div className={styles.header}>

                    <h2 className="title small">Our best part is that we are...</h2>
                    <h1 className="title big">The friendliest temporary file cloud to exist.</h1>
                    <h3 className="description">
                        This service was created to be a straightforward way for anyone to share their personal files as privately as possible.
                        Advanced encryption standard prevents any unwanted parties from lurking your files.
                    </h3>

                </div>

                <div className={styles.fileUpload}>
                    <p className={styles.fileDescription}>Select or drop files here</p>

                    <input type="file" />
                </div>
            </div>
        </div>
    </>
}