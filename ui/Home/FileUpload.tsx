import styles from "@/styles/Home/Home.module.scss"
import { useEffect, useMemo, useRef, useState } from "react"
import {
    FaArrowUp,
    FaCloud,
    FaEllipsisH,
    FaExclamationCircle,
    FaFileArchive,
    FaPlusCircle,
    FaRedoAlt,
    FaTimes,
} from "react-icons/fa"
import UploadOverview from "./UploadOverview"
import IconByExtension from "./IconByExtension"
import { motion } from "framer-motion"
import config from "../../config"
import { ApiWrapper } from "apiwrapper/main"
import { HumanReadableSize } from "utils/units"
import { archive } from "utils/archiver"

const apiNotAvailable = "We are currently having issues in reaching our servers. Please try again later."

//TODO: get rid of the damn useState-hell
export default function FileUpload() {
    let fileInputRef = useRef<HTMLInputElement>(null)
    let buttonRef = useRef<HTMLSpanElement>(null)

    const [fileProcesses, setFileUploadState] = useState({
        processing: false,
        uploading: false,
        uploaded: false,
    })

    const [uploadedFileState, setUploadedFileState] = useState({
        filename: "",
    })

    const [errorState, setErrorState] = useState<{
        warning: string | undefined
        error: string | undefined
    }>({
        warning: undefined,
        error: undefined,
    })

    const [isLocked, setIsLocked] = useState<boolean>(false)
    useMemo(
        () =>
            setIsLocked(
                fileProcesses.uploaded ||
                    fileProcesses.uploading ||
                    fileProcesses.processing ||
                    errorState.error !== undefined
            ),
        [fileProcesses.uploaded, fileProcesses.uploading, fileProcesses.processing, errorState.error]
    )

    // Initialize overview and files states
    //  Automatically close overview when all files are removed
    const [overviewShown, setOverviewShown] = useState<boolean>(false)
    const [files, setFiles] = useState<File[]>([])
    useEffect(() => {
        if (files.length < 1) setOverviewShown(false)
    }, [files])

    // Initialize syncNeeded state
    //  Handle everything related to file manipulation.
    //  Implements custom way for manipulating files afterwards with
    //  files still containing their metadata
    const [syncNeeded, setSyncNeeded] = useState(false)
    useEffect(() => {
        if (!fileInputRef.current || !syncNeeded) return

        const htmlFiles = fileInputRef.current.files
        if (!htmlFiles) return

        let tmpFiles: File[] = []
        for (let i = 0; i < htmlFiles.length; i++) {
            const file = htmlFiles.item(i)
            if (file && files.filter((f) => f.lastModified === file.lastModified).length === 0)
                tmpFiles.push(file)
        }

        setFiles((prev) => prev.concat(tmpFiles))
        setSyncNeeded(false)
    }, [files, syncNeeded])

    // Function which opens the file upload prompt
    const addFile = () => {
        if (!fileInputRef.current || isLocked) return
        if (!fileInputRef.current.onchange) fileInputRef.current.onchange = () => setSyncNeeded(true)
        fileInputRef.current.click() // open the actual file input
    }

    // Remove a file by id
    // Perhaps only used in the file icons
    const removeFile = (i: number) => {
        setFileUploadState((prev) => ({ ...prev, processing: true }))

        let f = files
        f.splice(i, 1)
        setFiles(f)

        setFileUploadState((prev) => ({ ...prev, processing: false }))
    }

    // Handle the upload process
    // Creates a tarball, writes it to a new File instance
    // and uploads it to server.
    // TODO: Add encryption
    // TODO: Add compression
    const handleUpload = async () => {
        if (files.length == 0 || isLocked) return
        setFileUploadState((prev) => ({ ...prev, uploading: true }))

        const tarfile = await archive(files)
        const req = await new ApiWrapper(config.api_base).newFile(tarfile)

        if (typeof req !== "string") {
            setFileUploadState((prev) => ({ ...prev, uploading: false, uploaded: true }))
            setErrorState((prev) => ({ ...prev, error: req.message }))
            return
        }

        setUploadedFileState({ filename: req })
        setFileUploadState((prev) => ({ ...prev, uploading: false, uploaded: true }))
    }

    const [uploadName, setUploadName] = useState<string>()
    const isTitleValidCallback = (title: string | undefined) => {
        if (!title) return true
        else if (title.length <= 0) return true

        if (title.length > 32) return false
        return true
    }

    useEffect(() => {
        async function fetchData() {
            try {
                await fetch(config.api_base)
            } catch (_) {
                setErrorState((prev) => ({ ...prev, error: apiNotAvailable }))
            }
        }

        fetchData()
    }, [])

    return (
        <div>
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
            <div
                onDrop={(e) => {
                    e.preventDefault()
                    e.currentTarget.style.transform = "none"

                    const appendFileToList = (file: File | null) => {
                        if (!file || isLocked) return

                        if (file && files.filter((f) => f.lastModified === file.lastModified).length === 0)
                            setFiles((prev) => prev.concat(file))
                    }

                    if (e.dataTransfer.items) {
                        Array.from(e.dataTransfer.items).map((item) => {
                            if (item.kind !== "file") return
                            appendFileToList(item.getAsFile())
                        })
                        return
                    }

                    Array.from(e.dataTransfer.files).map((file) => appendFileToList(file))
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
                    onClick={(!files || files?.length === 0) && !errorState.error ? addFile : () => {}}
                    className={[
                        styles.fileUpload,
                        !files || files?.length === 0 ? styles.waiting : "",
                        errorState.error ? styles.critical : "",
                    ].join(" ")}
                >
                    {files && files?.length > 0 ? (
                        <>
                            {/* Uploaded screen */}
                            <motion.div
                                animate={{
                                    transform: fileProcesses.uploaded ? "scaleY(1)" : "scaleY(0.5)",
                                    opacity: fileProcesses.uploaded ? 1 : 0,
                                    display: fileProcesses.uploaded ? "block" : "none",
                                }}
                                transition={{ duration: 0.3 }}
                                className={styles.uploadinfo}
                            >
                                {!errorState.error ? (
                                    <>
                                        <h3 className="title">Congratulations, your upload was processed!</h3>
                                        <p>
                                            Thank you! Your files have now been processed and uploaded
                                            successfully. This means that you can now send your files forward.
                                            Just copy the link to your files below!
                                        </p>
                                        <input
                                            spellCheck={false}
                                            type="text"
                                            onSelect={(e) => e.currentTarget.select()}
                                            className={styles.manualcopylink}
                                            value={uploadedFileState.filename}
                                            onChange={() => {}}
                                        />

                                        <div className={styles.buttons}>
                                            <div className={styles.icons}>
                                                <button
                                                    onClick={() => setOverviewShown(true)}
                                                    className={styles.icon}
                                                >
                                                    <FaEllipsisH />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setFileUploadState({
                                                        processing: false,
                                                        uploaded: false,
                                                        uploading: false,
                                                    })
                                                    setFiles([])
                                                }}
                                                className={styles.button}
                                            >
                                                Upload a new file <FaRedoAlt />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="title">{errorState.error}</h3>
                                        <p>
                                            Unfortunately we had some issues while preparing your upload for
                                            further processing. If this problem persists, please (please!)
                                            contact the developer for assistance.
                                        </p>
                                        <div className={styles.buttons}>
                                            <button
                                                className={[styles.button, styles.critical].join(" ")}
                                                onClick={() => {
                                                    setFileUploadState({
                                                        processing: false,
                                                        uploaded: false,
                                                        uploading: false,
                                                    })
                                                    setFiles([])
                                                    setErrorState({ warning: undefined, error: undefined })
                                                }}
                                            >
                                                Start over
                                            </button>
                                        </div>
                                    </>
                                )}
                            </motion.div>

                            {/* Files shown */}
                            <motion.div
                                animate={{
                                    height: !fileProcesses.uploaded ? "initial" : "none",
                                    display: !fileProcesses.uploaded ? "flex" : "none",
                                }}
                                className={styles.fileContainer}
                            >
                                <p className="title">
                                    You {fileProcesses.uploaded ? "uploaded" : "have added"} {files.length}{" "}
                                    file{files.length > 1 && "s"}, which{" "}
                                    {files.length > 1
                                        ? `${files.length <= 3 ? "are all" : `of 3 are`}`
                                        : `is`}{" "}
                                    shown below.
                                    <a
                                        onClick={() => {
                                            if (fileProcesses.uploading) return
                                            setFiles([])
                                            setFileUploadState({
                                                uploaded: false,
                                                uploading: false,
                                                processing: false,
                                            })
                                            setUploadName(undefined)
                                        }}
                                        href="#"
                                        className="animated"
                                    >
                                        {fileProcesses.uploaded ? "Upload another" : "Reset"}
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
                                                {f.name ?? "Anonymous file"}
                                            </span>
                                            <span className={styles.size}>
                                                {HumanReadableSize(f.size) || "Unknown size"}
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
                                        {fileProcesses.uploading ? (
                                            <div className={styles.buttonProcessing}>
                                                <span ref={buttonRef} className={styles.uploading}>
                                                    Your files are now uploading.
                                                </span>
                                                <div className={styles.updown}>
                                                    <FaArrowUp />
                                                </div>
                                            </div>
                                        ) : fileProcesses.uploaded ? (
                                            <span ref={buttonRef}>Upload done.</span>
                                        ) : (
                                            <span ref={buttonRef}>
                                                Upload file{files.length > 1 ? "s" : ""}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </motion.div>

                            {errorState.warning ? (
                                <p className={styles.warning}>{errorState.warning}</p>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <>
                            <div className={styles.loadicon}>
                                {errorState.error ? <FaExclamationCircle /> : <FaCloud />}
                            </div>
                            <p className={styles.uploadDescription}>
                                {errorState.error
                                    ? errorState.error
                                    : "Your modern file upload experience starts here"}
                            </p>
                        </>
                    )}

                    <input type="file" multiple={true} ref={fileInputRef} />
                </div>
            </div>
        </div>
    )
}
