import { FileHandler, FileInitMeta } from "@/common/filehandler/upload"
import styles from "@/styles/Home/Home.module.scss"
import { FileUploadState } from "../FileUpload"

export default function Container(props: {
    fileHandler: FileHandler
    fileMetas: FileInitMeta[]
    addFile: () => void
    fileUploadState: FileUploadState
    children: JSX.Element[]
}) {
    const { fileHandler, fileMetas, addFile, fileUploadState, children } = props

    return (
        <div
            onDrop={(e) => {
                e.preventDefault()
                e.currentTarget.style.transform = "none"

                if (e.dataTransfer.items) {
                    Array.from(e.dataTransfer.items).map((item) => {
                        if (item.kind !== "file") return
                        fileHandler.add(item.getAsFile())
                    })
                    return
                }

                Array.from(e.dataTransfer.files).map((file) => fileHandler.add(file))
            }}
            onDragOver={(e) => {
                e.preventDefault()
                e.currentTarget.style.transform = "translateY(10px)"
            }}
            onDragLeave={(e) => {
                e.preventDefault()
                e.currentTarget.style.transform = "none"
            }}
            className={styles.uploader}
        >
            <div
                onClick={fileMetas.length <= 0 ? addFile : () => {}}
                className={[
                    styles.fileUpload,
                    fileMetas.length <= 0 ? styles.waiting : "",
                    fileUploadState.error ? styles.critical : "",
                ].join(" ")}
            >
                {children}
            </div>
        </div>
    )
}
