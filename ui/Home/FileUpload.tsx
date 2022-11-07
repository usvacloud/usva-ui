import styles from "@/styles/Home/Home.module.scss"
import { Dispatch, RefObject, SetStateAction, useEffect, useMemo, useRef, useState } from "react"
import {
    FaArrowUp,
    FaCloud,
    FaEllipsisH,
    FaExclamationCircle,
    FaPlusCircle,
    FaRedoAlt,
    FaTimes,
} from "react-icons/fa"
import UploadOverview from "./UploadOverview"
import IconByExtension from "./IconByExtension"
import { motion } from "framer-motion"
import config from "../../config"
import { ApiWrapper } from "apiwrapper/main"
import { archive } from "utils/archiver"
import ErrorScreen from "./ErrorScreen"
import { isTitleValidCallback } from "utils/other"
import { FileHandler, FileInitMetas } from "filehandler/upload"
import { humanReadableSize } from "utils/units"

type FileUploadState = {
    processing: boolean
    uploading: boolean
    uploaded: boolean
    error?: Error
}

function UploadFinished(props: {
    filename: string
    switchOverlay: (x: boolean) => void
    resetForm: () => void
}) {
    return (
        <>
            <h3 className="title">Congratulations, your upload was processed!</h3>
            <p>
                Thank you! Your files have now been processed and uploaded successfully. This means that you
                can now send your files forward. Just copy the link to your files below!
            </p>
            <input
                spellCheck={false}
                type="text"
                onSelect={(e) => e.currentTarget.select()}
                className={styles.manualcopylink}
                value={props.filename}
                onChange={() => {}}
            />

            <div className={styles.buttons}>
                <div className={styles.icons}>
                    <button onClick={() => props.switchOverlay(true)} className={styles.icon}>
                        <FaEllipsisH />
                    </button>
                </div>
                <button onClick={props.resetForm} className={styles.button}>
                    Upload a new file <FaRedoAlt />
                </button>
            </div>
        </>
    )
}
//TODO: get rid of the damn useState-hell
export default function FileUpload() {
    // Initialize overview and files states
    const [fileMetas, setFileMetas] = useState<FileInitMetas>([])
    const [uploadedUUID, setUploadedUUID] = useState<string>()
    const [overviewShown, setOverviewShown] = useState<boolean>(false)
    const [uploadTitle, setUploadTitle] = useState<string>()
    const [isLocked, setIsLocked] = useState<boolean>(false)
    const [fileUploadState, setFileUploadState] = useState<FileUploadState>({
        processing: false,
        uploading: false,
        uploaded: false,
    })

    // class instances and ref objects
    let fileInputRef = useRef<HTMLInputElement>(null)

    const fileHandler = new FileHandler([fileMetas, setFileMetas])
    const api = new ApiWrapper(config.api_base)

    useMemo(
        () =>
            setIsLocked(
                fileUploadState.uploaded ||
                    fileUploadState.uploading ||
                    fileUploadState.processing ||
                    fileUploadState?.error !== undefined
            ),
        [fileUploadState]
    )

    async function uploadFiles() {
        if (fileMetas.length == 0 || isLocked) return
        setFileUploadState((prev) => ({ ...prev, uploading: true }))

        const req = await api.newFile(await archive(fileHandler.files), {
            title: uploadTitle,
        })

        if (req instanceof Error)
            setFileUploadState((prev) => ({
                ...prev,
                error: new Error(req.name),
            }))
        else setUploadedUUID(req)

        setFileUploadState((prev) => ({ ...prev, uploading: false, uploaded: true }))
    }

    function resetForm() {
        setFileUploadState({
            processing: false,
            uploaded: false,
            uploading: false,
            error: undefined,
        })
        fileHandler.reset()
    }

    function addFile() {
        if (isLocked || !fileInputRef.current) return
        fileInputRef.current.onchange = () => fileHandler.sync(fileInputRef)
        fileInputRef.current.click()
    }

    return (
        <div>
            <UploadOverview
                removeFile={fileHandler.removeFile}
                files={fileMetas}
                locked={isLocked}
                shown={overviewShown}
                setShown={setOverviewShown}
                title={uploadTitle || "Untitled upload"}
                setTitle={setUploadTitle}
                isTitleValidCallback={isTitleValidCallback}
            />
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
                className={styles.uploadContainer}
            >
                <div
                    onClick={fileMetas.length <= 0 ? addFile : () => {}}
                    className={[
                        styles.fileUpload,
                        fileMetas.length <= 0 ? styles.waiting : "",
                        fileUploadState.error ? styles.critical : "",
                    ].join(" ")}
                >
                    {fileMetas.length > 0 ? (
                        <>
                            {/* Uploaded screen */}
                            <motion.div
                                animate={{
                                    transform: fileUploadState.uploaded ? "scaleY(1)" : "scaleY(0.5)",
                                    opacity: fileUploadState.uploaded ? 1 : 0,
                                    display: fileUploadState.uploaded ? "block" : "none",
                                }}
                                transition={{ duration: 0.3 }}
                                className={styles.uploadinfo}
                            >
                                {!fileUploadState.error && uploadedUUID ? (
                                    <UploadFinished
                                        filename={uploadedUUID}
                                        switchOverlay={setOverviewShown}
                                        resetForm={resetForm}
                                    />
                                ) : (
                                    <ErrorScreen
                                        error={
                                            fileUploadState.error ||
                                            new Error(
                                                "We are terribly sorry, your upload failed for unknown reason"
                                            )
                                        }
                                        resetUpload={resetForm}
                                    />
                                )}
                            </motion.div>

                            {/* Files shown */}
                            <motion.div
                                animate={{
                                    height: !fileUploadState.uploaded ? "initial" : "none",
                                    display: !fileUploadState.uploaded ? "flex" : "none",
                                }}
                                className={styles.fileContainer}
                            >
                                <p className="title">
                                    You {fileUploadState.uploaded ? "uploaded" : "have added"}{" "}
                                    {fileMetas.length} file{fileMetas.length > 1 && "s"}, which{" "}
                                    {fileMetas.length > 1
                                        ? `${fileHandler.files.length <= 3 ? "are all" : `of 3 are`}`
                                        : `is`}{" "}
                                    shown below.
                                    <a onClick={resetForm} href="#" className="animated">
                                        Reset
                                    </a>
                                </p>

                                {fileMetas.map((f, i) => {
                                    if (i >= 3 || !f) return
                                    return (
                                        <motion.div
                                            animate={{
                                                transform: fileHandler.files ? "scaleY(1)" : "scaleY(0)",
                                            }}
                                            key={i}
                                            className={[
                                                styles.fileInfo,
                                                isLocked ? styles.disabled : "",
                                            ].join(" ")}
                                        >
                                            <IconByExtension type={f.type} />
                                            <span className={styles.filename}>
                                                {f.filename.slice(0, 30) +
                                                    (f.filename.length > 30 ? "..." : "")}
                                            </span>
                                            <span className={styles.size}>{f.size}</span>
                                            <FaTimes
                                                onClick={(e) => {
                                                    if (e.currentTarget.parentElement)
                                                        e.currentTarget.parentElement.style.transform =
                                                            "scaleY(0)"
                                                    setTimeout(() => fileHandler.removeFile(i), 150)
                                                }}
                                                className={styles.close}
                                            />
                                        </motion.div>
                                    )
                                })}
                                <div className={styles.buttons}>
                                    <div className={styles.icons}>
                                        <button
                                            className={styles.icon}
                                            onClick={() => setOverviewShown(true)}
                                        >
                                            <FaEllipsisH />
                                        </button>

                                        <button className={styles.icon} onClick={addFile}>
                                            <FaPlusCircle />
                                        </button>
                                    </div>

                                    <button
                                        onClick={uploadFiles}
                                        className={[
                                            styles.button,
                                            styles.primary,
                                            isLocked ? styles.disabled : "",
                                        ].join(" ")}
                                    >
                                        {fileUploadState.uploading ? (
                                            <div className={styles.buttonProcessing}>
                                                <span className={styles.uploading}>
                                                    Your files are now uploading.
                                                </span>
                                                <div className={styles.updown}>
                                                    <FaArrowUp />
                                                </div>
                                            </div>
                                        ) : fileUploadState.uploaded ? (
                                            <span>Upload done.</span>
                                        ) : (
                                            <span>Upload file{fileHandler.files.length > 1 ? "s" : ""}</span>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    ) : (
                        <>
                            <div className={styles.loadicon}>
                                {fileUploadState.error ? <FaExclamationCircle /> : <FaCloud />}
                            </div>
                            <p className={styles.uploadDescription}>
                                {fileUploadState.error?.message ??
                                    "Your modern file upload experience starts here"}
                            </p>
                        </>
                    )}

                    <input type="file" multiple={true} ref={fileInputRef} />
                </div>
            </div>
        </div>
    )
}
