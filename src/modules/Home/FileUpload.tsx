import { useMemo, useRef, useState } from "react"
import UploadOverlay from "./FileUploadComponents/Overlay"
import { motion, TargetAndTransition } from "framer-motion"
import { archive } from "@/common/utils/archiver"
import { ErrorScreen } from "./FileUploadComponents/ErrorScreen"
import { isTitleValidCallback } from "@/common/utils/other"
import { FileHandler, FileInitMeta } from "@/common/filehandler/upload"
import { Review } from "./FileUploadComponents/Review"
import { FinishedScreen } from "./FileUploadComponents/FinishedScreen"
import { defaultWrapper as api } from "@/common/apiwrapper/main"
import { UploadWaiting } from "./FileUploadComponents/EmptyUpload"
import Container from "./FileUploadComponents/Container"
import { useEffect } from "react"
import { Stream } from "stream"
import { AxiosProgressEvent } from "axios"

export type FileUploadState = {
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
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const [fileUploadState, setFileUploadState] = useState<FileUploadState>({
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

    useEffect(() => {
        const stmt =
            fileUploadState.uploaded || fileUploadState.uploading || fileUploadState?.error !== undefined
        setIsLocked(stmt)
    }, [fileUploadState])

    async function uploadFiles() {
        if (fileMetas.length == 0 || isLocked) return

        setFileUploadState((p) => ({
            ...p,
            uploading: true,
            status: {
                total: fileHandler.getTotalSize(),
                current: 0,
            },
        }))

        const stream = new Stream()
        stream.on("add", (info: File) => {
            setFileUploadState((prev) => ({
                ...prev,
                status: { ...prev.status, current: prev.status.current + info.size / 2 },
            }))
        })
        const r = await archive(fileHandler.files, stream)
        setFileUploadState((prev) => ({ ...prev, status: { ...prev.status, total: r.size } }))

        const reqstream = new Stream()
        reqstream.on("progress", (info: AxiosProgressEvent) => {
            setFileUploadState((prev) => ({
                ...prev,
                status: {
                    ...prev.status,
                    current: prev.status.current + info.bytes / 2,
                },
            }))
        })
        const req = await api.newFile(
            new File([r], "upload.zip"),
            {
                title: uploadTitle,
                encrypted: false,
                password: passwordInputRef.current?.value,
            },
            reqstream
        )

        if (req instanceof Error)
            return setFileUploadState((prev) => ({
                ...prev,
                uploaded: true,
                uploading: false,
                error: req,
            }))
        else setUploadedUUID(req)

        setFileUploadState((prev) => ({
            ...prev,
            uploading: false,
            uploaded: true,
            status: {
                ...prev.status,
                current: prev.status.total,
            },
        }))
    }

    function removeFile(nth: number) {
        setFileMetas((prev) => prev.filter((_, i) => nth !== i))
        fileHandler.removeFile(nth)
    }

    function resetForm() {
        if (fileUploadState.uploading) return
        setFileUploadState({
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
            {/* The box itself */}
            <Container
                addFile={addFile}
                fileHandler={fileHandler}
                fileMetas={fileMetas}
                fileUploadState={fileUploadState}
            >
                <motion.div animate={animation(fileMetas.length < 1)}>
                    <UploadWaiting fileUploadState={fileUploadState} />
                </motion.div>

                <motion.div animate={animation(fileMetas.length >= 1 && !fileUploadState.error)}>
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

            <UploadOverlay
                removeFile={removeFile}
                files={fileMetas}
                locked={isLocked}
                shown={false || overviewShown}
                passwordInputRef={passwordInputRef}
                setShown={setOverviewShown}
                title={uploadTitle || "Untitled upload"}
                setTitle={setUploadTitle}
                isTitleValidCallback={isTitleValidCallback}
            />
        </div>
    )
}
