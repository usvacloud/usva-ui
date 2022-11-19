import styles from "@/styles/Home/Home.module.scss"
import { useMemo, useRef, useState } from "react"
import { FaCloud, FaExclamationCircle } from "react-icons/fa"
import UploadOverlay from "./FileUploadComponents/Overlay"
import { AnimatePresence, AnimationControls, motion, TargetAndTransition, VariantLabels } from "framer-motion"
import { archive } from "@/common/utils/archiver"
import { ErrorScreen } from "./FileUploadComponents/ErrorScreen"
import { isTitleValidCallback } from "@/common/utils/other"
import { FileHandler, FileInitMeta } from "@/common/filehandler/upload"
import { Review } from "./FileUploadComponents/Review"
import { FinishedScreen } from "./FileUploadComponents/FinishedScreen"
import Notice from "../shared/Notice"
import { defaultWrapper as api } from "@/common/apiwrapper/main"
import { UploadWaiting } from "./FileUploadComponents/EmptyUpload"
import Container from "./FileUploadComponents/Container"

export type FileUploadState = {
    processing: boolean
    uploading: boolean
    uploaded: boolean
    status: {
        total: number
        current: number
    }
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
        status: {
            current: 0,
            total: 0,
        },
    })

    // class instances and ref objects
    const fileInputRef = useRef<HTMLInputElement>(null)
    const fileHandler = useMemo(() => new FileHandler(), [])

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

        const r = await archive(fileHandler.files)
        setFileUploadState((prev) => ({ ...prev, processing: false }))

        const req = await api.newFile(new File([r], "upload.zip"), {
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
            status: {
                current: 0,
                total: 0,
            },
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

    const animation = (x: any): TargetAndTransition => {
        return {
            transform: x ? "translateY(0px)" : "translateY(20px)",
            display: x ? "block" : "none",
            opacity: x ? 1 : 0,
        }
    }

    return (
        <div>
            <UploadOverlay
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
            <Container
                addFile={addFile}
                fileHandler={fileHandler}
                fileMetas={fileMetas}
                fileUploadState={fileUploadState}
            >
                <motion.div animate={animation(fileMetas.length >= 1)}>
                    <Review
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

                <motion.div animate={animation(fileMetas.length < 1)}>
                    <UploadWaiting fileUploadState={fileUploadState} />
                </motion.div>

                <motion.div animate={animation(!fileUploadState.error && fileUploadState.uploaded)}>
                    <FinishedScreen
                        filename={uploadedUUID || ""}
                        switchOverlay={setOverviewShown}
                        resetForm={resetForm}
                    />
                </motion.div>

                <motion.div animate={animation(fileUploadState.error)}>
                    <ErrorScreen error={fileUploadState.error} resetUpload={resetForm} />
                </motion.div>

                <input type="file" multiple={true} ref={fileInputRef} />
            </Container>
            <Notice />
        </div>
    )
}
