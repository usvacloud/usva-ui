import { FileInitMeta } from "src/common/filehandler/upload"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { filterProps, motion } from "framer-motion"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import { FaTimes, FaPlusCircle, FaWrench, FaThumbsUp, FaSpinner } from "react-icons/fa"
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
            className={styles.fileContainer}
        >
            <p className="title">
                You {fileUploadState.uploaded ? "uploaded" : "have added"} {fileMetas.length} file
                {fileMetas.length > 1 && "s"}, which{" "}
                {fileMetas.length > 1 ? `${fileMetas.length <= 3 ? "are all" : `of 3 are`}` : `is`} shown
                below.
                <a onClick={resetForm} href="#" className="animated">
                    Reset
                </a>
            </p>

            {fileMetas.map((f, i) => {
                if (!f || i >= 3) return

                const maxsize = 25

                const splitFilename = f.filename.split(".")
                const trimFilename = splitFilename[Math.min(0, splitFilename.length - 1)]

                const filename: string = (
                    trimFilename.length > maxsize ? trimFilename.substr(0, maxsize) : trimFilename
                ).trim()

                return (
                    <motion.div
                        animate={{
                            transform: fileMetas ? "scaleY(1)" : "scaleY(0)",
                        }}
                        key={i}
                        className={[styles.fileInfo, isLocked ? styles.disabled : ""].join(" ")}
                    >
                        <IconByExtension type={f.type} />
                        <span className={styles.filename}>{filename}</span>
                        <span className={styles.size}>{f.size}</span>
                        <FaTimes
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
                    </motion.div>
                )
            })}

            <p className={styles.tosnt}>
                As you proceed you accept our{" "}
                <a target="_blank" href="/terms-of-service">
                    Terms
                </a>{" "}
                and{" "}
                <a target="_blank" href="/privacy-policy">
                    Privacy Policy
                </a>
            </p>
            <div className={styles.buttons}>
                <div className={styles.icons}>
                    <button className={styles.icon} onClick={() => setOverviewShown(true)}>
                        <FaWrench />
                    </button>

                    <button className={styles.icon} onClick={addFile}>
                        <FaPlusCircle />
                    </button>
                </div>

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
                                <span>Getting your link </span>
                                <span className="spinner" style={{ height: "unset", width: "unset" }}>
                                    <FaSpinner />
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
