import { useRouter } from "next/router"
import styles from "@/styles/File/SpecificFile.module.scss"

export default function FileDownload() {
    const { slug } = useRouter().query
    return (
        <div className={styles.main}>
            <h1>File download: {slug}</h1>
        </div>
    )
}
