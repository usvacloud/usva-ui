import styles from "@/styles/Home.module.scss"
import { useEffect, useRef, useState } from "react"
import {
    FaArrowUp,
    FaClipboard,
    FaEllipsisH,
    FaExclamationCircle,
    FaFileArchive,
    FaPlusCircle,
    FaTimes,
} from "react-icons/fa"
import UploadOverview from "./UploadOverview"
import IconByExtension from "./IconByExtension"
import { motion } from "framer-motion"

export default function FileUpload() {
    let fileInputRef = useRef<HTMLInputElement>(null)
    let buttonRef = useRef<HTMLSpanElement>(null)

    const [fileUploadState, setFileUploadState] = useState<{
        processing: boolean
        uploading: boolean
        uploaded: boolean
        failed: boolean
        encryptionProps: {
            password: string | undefined
        }
    }>({
        processing: false,
        uploading: false,
        uploaded: false,
        failed: false,
        encryptionProps: {
            password: undefined,
        },
    })

    const [uploadProcessing, setUploadProcessing] = useState<{
        warning: string | undefined
        error: string | undefined
    }>({
        warning: undefined,
        error: undefined,
    })
    useEffect(() => {
        if (!window.crypto.subtle)
            setUploadProcessing((prev) => ({ ...prev, warning: "Your browser doesn't support encryption." }))
    }, [])

    const [isLocked, setIsLocked] = useState<boolean>(false)
    useEffect(
        () =>
            setIsLocked(fileUploadState.uploaded || fileUploadState.uploading || fileUploadState.processing),
        [fileUploadState.uploaded, fileUploadState.uploading, fileUploadState.processing]
    )

    const [overviewShown, setOverviewShown] = useState<boolean>(false)
    const [files, setFiles] = useState<File[]>([])
    useEffect(() => {
        if (files.length < 1) setOverviewShown(false)
    }, [files])

    const [syncNeeded, setSyncNeeded] = useState(false)
    useEffect(() => {
        if (!fileInputRef.current || !syncNeeded) return

        const htmlFiles = fileInputRef.current.files
        if (!htmlFiles) return

        let tmpFiles: File[] = []
        for (let i = 0; i < htmlFiles.length; i++) {
            const file = htmlFiles.item(i)
            if (file?.type && files.filter((f) => f.lastModified === file.lastModified).length === 0)
                tmpFiles.push(file)
        }

        setFiles((prev) => prev.concat(tmpFiles))
        setSyncNeeded(false)
    }, [files, syncNeeded])

    const addFile = () => {
        if (!fileInputRef.current || isLocked) return
        if (!fileInputRef.current.onchange) fileInputRef.current.onchange = () => setSyncNeeded(true)
        fileInputRef.current.click() // open the actual file input
    }

    const removeFile = (i: number) => {
        setFileUploadState((prev) => ({ ...prev, processing: true }))

        let f = files
        f.splice(i, 1)
        setFiles(f)

        setFileUploadState((prev) => ({ ...prev, processing: false }))
    }

    // Processing the files
    const handleUpload = () => {
        if (isLocked) return

        setFileUploadState((prev) => ({ ...prev, uploading: true }))
        setTimeout(() => {
            setFileUploadState((prev) => ({ ...prev, uploading: false, uploaded: true }))
        }, 2000)
    }

    const [uploadName, setUploadName] = useState<string>()
    const isTitleValidCallback = (title: string | undefined) => {
        if (!title) return true
        else if (title.length <= 0) return true

        if (title.length > 32) return false
        return true
    }

    useEffect(() => {
        if (!uploadName) return

        if (!isTitleValidCallback(uploadName))
            return setUploadProcessing((prev) => ({
                ...prev,
                warning: "Upload's name is invalid and wasn't saved.",
            }))

        setUploadProcessing((prev) => ({ ...prev, warning: undefined }))
    }, [uploadName])

    return (
        <>
            <UploadOverview
                removeFile={removeFile}
                files={files}
                locked={isLocked}
                shown={overviewShown}
                setShown={setOverviewShown}
                title={uploadName || "Untitled upload"}
                setTitle={setUploadName}
                isTitleValidCallback={isTitleValidCallback}
            />
            <div className={styles.uploadContainer}>
                <div
                    onClick={(!files || files?.length === 0) && !uploadProcessing.error ? addFile : () => {}}
                    className={[
                        styles.fileUpload,
                        !files || files?.length === 0 ? styles.waiting : "",
                        uploadProcessing.error ? styles.critical : "",
                    ].join(" ")}
                >
                    {files && files?.length > 0 ? (
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
                                <h3 className="title">Congratulations, your upload was processed!</h3>
                                <p>
                                    Thank you! The files you uploaded have now been processed and uploaded
                                    successfully. This means that you can now send your files forward. Copy
                                    either the link from button below or below:
                                </p>
                                <a className={styles.manualcopylink}>
                                    /file/5930b0ba-2e21-446a-9ecc-8531afa30c6a
                                </a>

                                <div className={styles.buttons}>
                                    <div className={styles.icons}>
                                        <button
                                            onClick={() => setOverviewShown(true)}
                                            className={styles.icon}
                                        >
                                            <FaEllipsisH />
                                        </button>
                                    </div>
                                    <button className={styles.button}>
                                        Copy share link <FaClipboard />
                                    </button>
                                </div>
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
                                    You {fileUploadState.uploaded ? "uploaded" : "have added"} {files.length}{" "}
                                    file{files.length > 1 && "s"}, which{" "}
                                    {files.length > 1
                                        ? `${files.length <= 3 ? "are all" : `of 3 are`}`
                                        : `is`}{" "}
                                    shown below.
                                    <a
                                        onClick={() => {
                                            if (fileUploadState.uploading) return
                                            setFiles([])
                                            setFileUploadState({
                                                failed: false,
                                                uploaded: false,
                                                uploading: false,
                                                processing: false,
                                                encryptionProps: { password: undefined },
                                            })
                                            setUploadName(undefined)
                                        }}
                                        href="#"
                                        className="animated"
                                    >
                                        {fileUploadState.uploaded ? "Upload another" : "Reset"}
                                    </a>
                                </p>

                                {files.map((f, i) => {
                                    if (i >= 3 || !f) return
                                    return (
                                        <motion.div
                                            animate={{
                                                transform: files ? "scaleY(1)" : "scaleY(0)",
                                            }}
                                            key={i}
                                            className={[
                                                styles.fileInfo,
                                                isLocked ? styles.disabled : "",
                                            ].join(" ")}
                                        >
                                            <IconByExtension type={f.type} />
                                            <span className={styles.filename}>
                                                {f.name ? f.name : "Anonymous file"}
                                            </span>
                                            <FaTimes
                                                onClick={(e) => {
                                                    if (e.currentTarget.parentElement)
                                                        e.currentTarget.parentElement.style.transform =
                                                            "scaleY(0)"
                                                    setTimeout(() => removeFile(i), 150)
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
                                        onClick={handleUpload}
                                        className={[
                                            styles.button,
                                            styles.primary,
                                            isLocked ? styles.disabled : "",
                                        ].join(" ")}
                                    >
                                        {fileUploadState.uploading ? (
                                            <div className={styles.buttonProcessing}>
                                                <span ref={buttonRef} className={styles.uploading}>
                                                    Your files are now uploading.
                                                </span>
                                                <div className={styles.updown}>
                                                    <FaArrowUp />
                                                </div>
                                            </div>
                                        ) : fileUploadState.uploaded ? (
                                            <span ref={buttonRef}>Upload done.</span>
                                        ) : (
                                            <span ref={buttonRef}>Proceed to upload</span>
                                        )}
                                    </button>
                                </div>
                            </motion.div>

                            {uploadProcessing.warning ? (
                                <p className={styles.warning}>{uploadProcessing.warning}</p>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <>
                            <div className={styles.loadicon}>
                                {uploadProcessing.error ? <FaExclamationCircle /> : <FaFileArchive />}
                            </div>
                            <p className={styles.uploadDescription}>
                                {uploadProcessing.error
                                    ? uploadProcessing.error
                                    : "Select or drop files here"}
                            </p>
                        </>
                    )}

                    <input type="file" multiple={true} ref={fileInputRef} />
                </div>
            </div>
        </>
    )
}
