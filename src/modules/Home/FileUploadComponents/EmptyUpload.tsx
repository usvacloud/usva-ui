import styles from "@/styles/Home/Home.module.scss"
import { FaExclamationCircle, FaCloud } from "react-icons/fa"
import { FileUploadState } from "../FileUpload"

export function UploadWaiting({ fileUploadState }: { fileUploadState: FileUploadState }) {
    return (
        <>
            <div className={styles.loadicon}>
                {fileUploadState.error ? <FaExclamationCircle /> : <FaCloud />}
            </div>
            <p className={styles.uploadDescription}>
                {fileUploadState.error?.message ?? "Your modern file upload experience starts here"}
            </p>
        </>
    )
}
