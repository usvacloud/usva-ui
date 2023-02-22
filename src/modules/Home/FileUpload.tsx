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
import Head from "next/head"

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
    const [encryptFile, setEncryptFile] = useState<boolean>(false)
    const [passwordValid, setPasswordValid] = useState(false)
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

        let file = {
            filename: "upload.zip",
            content: new Blob(),
        }

        const willZip = fileHandler.files.length > 1
        if (willZip) {
            const stream = new Stream()
            stream.on("add", (info: File) => {
                setFileUploadState((prev) => ({
                    ...prev,
                    status: {
                        ...prev.status,
                        current: prev.status.current + info.size / 2,
                    },
                }))
            })

            try {
                file.content = await archive(fileHandler.files, stream)
            } catch (e) {
                setFileUploadState((prev) => ({
                    ...prev,
                    error: new Error("Error occured while zipping your files"),
                }))
            }
        } else {
            file.content = fileHandler.files[0]
            file.filename = fileHandler.files[0].name
        }

        const reqstream = new Stream()
        reqstream.on("progress", (info: AxiosProgressEvent) => {
            setFileUploadState((prev) => ({
                ...prev,
                status: {
                    ...prev.status,
                    total: info.total || prev.status.total,
                    current: prev.status.current + (willZip ? info.bytes / 2 : info.bytes),
                },
            }))
        })

        const req = await api.newFile(
            new File([await file.content.arrayBuffer()], file.filename),
            {
                title: uploadTitle,
                password: passwordInputRef.current?.value,
                encrypt: encryptFile,
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

        setEncryptFile(false)
        if (passwordInputRef.current) passwordInputRef.current.value = ""
        setPasswordValid(false)
        setFileMetas([])
        fileHandler.reset()
    }

    function addFile() {
        if (isLocked || !fileInputRef.current) return
        fileInputRef.current.click()
    }

    useEffect(() => {
        if (!fileInputRef.current) return
        fileInputRef.current.onchange = () => {
            const metas = fileHandler.sync(fileInputRef)
            if (metas) setFileMetas((prev) => prev.concat(metas))
        }
    }, [fileInputRef, fileHandler])

    const animation = (x: any): TargetAndTransition => {
        return {
            transform: x ? "translateY(0px)" : "translateY(20px)",
            display: x ? "block" : "none",
            opacity: x ? 1 : 0,
        }
    }

    return (
        <>
            <Head>
                <title>Usva | Upload your files</title>
                <meta name="title" content="Usva | Upload your files" />
                <meta
                    name="description"
                    content="With usva you can share your files easily and securely all around the internet."
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://usva.cc/" />
                <meta property="og:title" content="Usva | Upload your files" />
                <meta
                    property="og:description"
                    content="With usva you can share your files easily and securely all around the internet."
                />
                <meta property="og:image" content="" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://usva.cc/" />
                <meta property="twitter:title" content="Usva | Upload your files" />
                <meta
                    property="twitter:description"
                    content="With usva you can share your files easily and securely all around the internet."
                />
                <meta property="twitter:image" content="" />
            </Head>
            <div>
                {/* The box itself */}
                <Container
                    addFile={addFile}
                    fileHandler={fileHandler}
                    fileMetas={fileMetas}
                    setFileMetas={setFileMetas}
                    fileUploadState={fileUploadState}
                >
                    <motion.div animate={animation(fileMetas.length == 0)}>
                        <UploadWaiting fileUploadState={fileUploadState} />
                    </motion.div>

                    <motion.div
                        initial={{
                            display: "none",
                        }}
                        animate={animation(fileMetas.length >= 1 && !fileUploadState.error)}
                    >
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

                    <motion.div
                        initial={{
                            display: "none",
                        }}
                        animate={animation(!fileUploadState.error && fileUploadState.uploaded)}
                    >
                        <FinishedScreen
                            filename={uploadedUUID || ""}
                            switchOverlay={setOverviewShown}
                            resetForm={resetForm}
                        />
                    </motion.div>

                    <motion.div
                        initial={{
                            display: "none",
                        }}
                        animate={animation(fileUploadState.error)}
                    >
                        <ErrorScreen error={fileUploadState.error} resetUpload={resetForm} />
                    </motion.div>

                    <input type="file" multiple={true} ref={fileInputRef} />
                </Container>

                <UploadOverlay
                    removeFile={removeFile}
                    files={fileMetas}
                    setEncrypt={setEncryptFile}
                    encrypt={encryptFile}
                    locked={isLocked}
                    shown={false || overviewShown}
                    passwordInputRef={passwordInputRef}
                    setShown={setOverviewShown}
                    title={uploadTitle || "Untitled upload"}
                    setTitle={setUploadTitle}
                    isTitleValidCallback={isTitleValidCallback}
                    passwordValid={passwordValid}
                    setPasswordValid={setPasswordValid}
                />
            </div>
        </>
    )
}
