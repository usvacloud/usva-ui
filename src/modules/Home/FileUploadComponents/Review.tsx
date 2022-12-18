import { FileInitMeta } from "src/common/filehandler/upload"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { filterProps, motion } from "framer-motion"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import { FaTimes, FaPlusCircle, FaWrench, FaThumbsUp, FaTrash } from "react-icons/fa"
import { FileUploadState } from "../FileUpload"
import IconByExtension from "./IconByExtension"
import styles from "@/styles/Home/Home.module.scss"
import { humanReadableSize } from "@/common/utils/units"
import pgstyles from "@/styles/shared/CircularPB.module.scss"

type UploadPreviewProps = {
    fileUploadState: FileUploadState
    fileMetas: FileInitMeta[]
    removeFile: (id: number) => void
    isLocked: boolean
    setOverviewShown: Dispatch<SetStateAction<boolean>>
    addFile: () => void
    uploadFiles: () => void
    resetForm: () => void
}

function ProgressButton(props: { percent: number; children: JSX.Element | JSX.Element[] }) {
    return (
        <>
            {props.children}
            {props.percent > 0 && props.percent < 100 && (
                <CircularProgressbar className={pgstyles.progress} value={props.percent} maxValue={100} />
            )}
        </>
    )
}

export function Review({
    fileUploadState,
    fileMetas,
    removeFile,
    isLocked,
    setOverviewShown,
    addFile,
    uploadFiles,
    resetForm,
}: UploadPreviewProps) {
    return (
        <motion.div
            animate={{
                height: !fileUploadState.uploaded ? "initial" : "none",
                display: !fileUploadState.uploaded ? "flex" : "none",
            }}
            className={styles.preview}
        >
            <h2 className="title">Quick review of your files before upload</h2>
            <p className={styles.tosnt}>
                As you proceed you accept our{" "}
                <Link target="_blank" href="/terms-of-service">
                    Terms
                </Link>{" "}
                and{" "}
                <Link target="_blank" href="/privacy-policy">
                    Privacy Policy
                </Link>
            </p>
            <div className={styles.icons}>
                <button className={styles.icon} onClick={() => setOverviewShown(true)}>
                    <FaWrench />
                </button>

                <button className={styles.icon} onClick={addFile}>
                    <FaPlusCircle />
                </button>
            </div>

            {fileMetas.map((f, i) => {
                if (!f || i >= 3) return
                return (
                    <motion.div
                        animate={{
                            transform: fileMetas ? "scaleY(1)" : "scaleY(0)",
                        }}
                        key={i}
                        className={[styles.file, isLocked ? styles.disabled : ""].join(" ")}
                    >
                        <div className={styles.left}>
                            <IconByExtension type={f.type} />
                            <span className={styles.filename}>{f.filename}</span>
                        </div>
                        <div className={styles.right}>
                            <span className={styles.size}>{f.size}</span>
                            <FaTrash
                                onClick={(e) => {
                                    const x = e.currentTarget.parentElement
                                    if (x) {
                                        x.style.transform = "scaleY(0)"
                                        x.style.opacity = "0"
                                    }
                                    setTimeout(() => {
                                        removeFile(i)
                                        if (x) x.style.opacity = "1"
                                    }, 250)
                                }}
                                className={styles.close}
                            />
                        </div>
                    </motion.div>
                )
            })}

            <div className={styles.buttons}>
                <button
                    onClick={uploadFiles}
                    className={[styles.button, styles.primary, isLocked ? styles.disabled : ""].join(" ")}
                >
                    <ProgressButton
                        percent={(fileUploadState.status.current / fileUploadState.status.total) * 100}
                    >
                        {fileUploadState.status.current == 0 ? (
                            <span>Upload file{fileMetas.length > 1 ? "s" : ""}</span>
                        ) : fileUploadState.status.current == fileUploadState.status.total ? (
                            <>
                                <span>Finishing... </span>
                                <span className="spinner">
                                    <FaThumbsUp />
                                </span>
                            </>
                        ) : (
                            <span>
                                {humanReadableSize(fileUploadState.status.current)} of{" "}
                                {humanReadableSize(fileUploadState.status.total)}
                            </span>
                        )}
                    </ProgressButton>
                </button>
            </div>
        </motion.div>
    )
}
