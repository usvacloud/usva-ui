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
import UploadOverview from "./FileUploadComponents/UploadOverview"
import { motion } from "framer-motion"
import config from "../../config"
import { ApiWrapper } from "apiwrapper/main"
import { archive } from "utils/archiver"
import ErrorScreen from "./FileUploadComponents/ErrorScreen"
import { isTitleValidCallback } from "utils/other"
import { FileHandler, FileInitMeta } from "filehandler/upload"
import { UploadFinished, UploadPreview } from "./FileUploadComponents/components"
import Notice from "../shared/Notice"

export type FileUploadState = {
    processing: boolean
    uploading: boolean
    uploaded: boolean
    error: Error | undefined
}

//TODO: get rid of the damn useState-hell
export default function FileUpload() {
    // Initialize overview and files states
    const [fileMetas, setFileMetas] = useState<FileInitMeta[]>([])
    const [uploadedUUID, setUploadedUUID] = useState<string>()
    const [overviewShown, setOverviewShown] = useState<boolean>(false)
    const [uploadTitle, setUploadTitle] = useState<string>()
    const [isLocked, setIsLocked] = useState<boolean>(false)
    const [fileUploadState, setFileUploadState] = useState<FileUploadState>({
        processing: false,
        uploading: false,
        uploaded: false,
        error: undefined,
    })

    // class instances and ref objects
    const fileInputRef = useRef<HTMLInputElement>(null)
    const fileHandler = useMemo(() => new FileHandler(), [])
    const api = useMemo(() => new ApiWrapper(config.api_base), [])

    useMemo(() => {
        const stmt =
            fileUploadState.uploaded ||
            fileUploadState.uploading ||
            fileUploadState.processing ||
            fileUploadState?.error !== undefined
        setIsLocked(stmt)
    }, [fileUploadState])

    async function uploadFiles() {
        if (fileMetas.length == 0 || isLocked) return
        setFileUploadState((prev) => ({ ...prev, uploading: true, processing: true }))
        console.log(fileHandler.files)

        const r = await archive(fileHandler.files)
        setFileUploadState((prev) => ({ ...prev, processing: false }))

        const req = await api.newFile(r, {
            title: uploadTitle,
        })

        if (req instanceof Error)
            setFileUploadState((prev) => ({
                ...prev,
                error: req,
            }))
        else setUploadedUUID(req)

        setFileUploadState((prev) => ({ ...prev, uploading: false, uploaded: true }))
    }

    function removeFile(nth: number) {
        setFileMetas((prev) => prev.filter((_, i) => nth !== i))
        fileHandler.removeFile(nth)
    }

    function resetForm() {
        if (fileUploadState.processing || fileUploadState.uploading) return
        setFileUploadState({
            processing: false,
            uploaded: false,
            uploading: false,
            error: undefined,
        })
        setFileMetas([])
        fileHandler.reset()
    }

    function addFile() {
        if (isLocked || !fileInputRef.current) return
        fileInputRef.current.onchange = () => {
            const metas = fileHandler.sync(fileInputRef)
            if (metas) setFileMetas((prev) => prev.concat(metas))
        }
        fileInputRef.current.click()
    }

    return (
        <div>
            <Notice />
            <UploadOverview
                removeFile={removeFile}
                files={fileMetas}
                locked={isLocked}
                shown={overviewShown}
                setShown={setOverviewShown}
                title={uploadTitle || "Untitled upload"}
                setTitle={setUploadTitle}
                isTitleValidCallback={isTitleValidCallback}
            />

            {/* The box itself */}
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
                    {fileMetas.length >= 1 ? (
                        <>
                            {/* Uploaded screen */}
                            <motion.div
                                animate={{
                                    transform: fileUploadState.uploaded ? "scaleY(1)" : "scaleY(0.8)",
                                    opacity: fileUploadState.uploaded ? 1 : 0,
                                    display: fileUploadState.uploaded ? "block" : "none",
                                }}
                                transition={{ duration: 0.3 }}
                                className={[
                                    styles.uploadinfo,
                                    fileUploadState.error ? styles.critical : "",
                                ].join(" ")}
                            >
                                {!fileUploadState.error && uploadedUUID ? (
                                    <UploadFinished
                                        filename={uploadedUUID}
                                        switchOverlay={setOverviewShown}
                                        resetForm={resetForm}
                                    />
                                ) : (
                                    <ErrorScreen error={fileUploadState.error} resetUpload={resetForm} />
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
                                <UploadPreview
                                    addFile={addFile}
                                    removeFile={removeFile}
                                    fileMetas={fileMetas}
                                    fileUploadState={fileUploadState}
                                    isLocked={isLocked}
                                    resetForm={resetForm}
                                    setOverviewShown={setOverviewShown}
                                    uploadFiles={uploadFiles}
                                />
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
