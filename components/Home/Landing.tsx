import styles from "@/styles/Home.module.scss"
import { useState } from "react"
import FileUpload from "./FileUpload"

export default function Landing() {
    const [uploadOverviewShown, setUploadOverviewShown] = useState(false)

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
                <FileUpload />
            </div>
        </div>
    </>
}