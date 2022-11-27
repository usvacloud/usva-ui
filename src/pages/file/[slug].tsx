import { useRouter } from "next/router"
import styles from "@/styles/File/SpecificFile.module.scss"
import ovstyles from "@/styles/shared/Overlays.module.scss"
import pbstyles from "@/styles/shared/CircularPB.module.scss"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { defaultWrapper, Errors, FileInformation } from "@/common/apiwrapper/main"
import { humanReadableDate, humanReadableSize } from "src/common/utils/units"
import { CircularProgressbar } from "react-circular-progressbar"
import { FaSpinner } from "react-icons/fa"
import { motion } from "framer-motion"
import config from "config"

export default function FileDownload() {
    const { slug } = useRouter().query
    const [file, setFile] = useState<FileInformation>()
    const [passwordRequired, setPasswordRequired] = useState<boolean>(false)
    const [progress, setProgress] = useState<{ c: number; t: number }>({ c: 0, t: 0 })
    const [downloaded, setDownloaded] = useState<boolean>(false)
    const [error, setError] = useState<Error>()
    const passwordRef = useRef<HTMLInputElement>(null)
    const filename = useMemo(() => slug && (typeof slug === "string" ? slug : slug[0]), [slug])

    useEffect(() => {
        if (!downloaded) return
        setTimeout(() => setDownloaded(false), 4000)
    }, [downloaded])

    async function download() {
        if (!filename || downloaded || error || typeof window === "undefined") return
        window.location.replace(`${config.api_base}/file?filename=${filename}`)
    }

    const fetchData = useCallback(async () => {
        if (!filename) return

        const f = await defaultWrapper.getFileInformation(filename, passwordRef.current?.value)
        if (f instanceof Error) {
            console.error(f)
            if (f === Errors.PermissionDenied) setPasswordRequired(true)
            else if (window) window.location.replace("/not-found")
            return
        }
        setFile(f)
        setPasswordRequired(false)
    }, [filename])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <>
            <motion.div
                animate={{
                    display: passwordRequired ? "flex" : "none",
                }}
                className={[styles.fullscreenform, ovstyles.fullscreenform].join(" ")}
            >
                <motion.div
                    animate={{
                        transform: passwordRequired ? "translateY(0px)" : "translateY(50%)",
                        opacity: passwordRequired ? 1 : 0,
                    }}
                    className={ovstyles.contentbox}
                >
                    <div className={styles.overlayheader}>
                        <h3>This download has been protected.</h3>
                        <p>Please authorize yourself before viewing this file!</p>
                    </div>
                    <div className={styles.form}>
                        <input
                            type="password"
                            placeholder="File password"
                            ref={passwordRef}
                            className={styles.password}
                        />
                        <button onClick={fetchData} className={styles.button}>
                            Open this file
                        </button>
                    </div>
                </motion.div>
            </motion.div>
            <div className={styles.main}>
                <div className={styles.content}>
                    {file ? (
                        <>
                            <div className={styles.filemeta}>
                                <h1 className={file.title.Valid ? styles.withname : ""}>
                                    {file.title.Valid ? (
                                        <>
                                            Download of{" "}
                                            <span className={styles.special}>{file.title.String}</span>
                                        </>
                                    ) : (
                                        "Here's your download."
                                    )}
                                </h1>
                                <p>Before you proceed further, here is a quick review of your download.</p>
                                <ul>
                                    <li>Size: {humanReadableSize(file.size)}</li>
                                    <li>Uploaded: {humanReadableDate(file.uploadDate)}</li>
                                    <li>
                                        This file has been viewed for {file.viewCount} time
                                        {file.viewCount !== 1 ? "s" : ""}
                                    </li>
                                </ul>
                                {error ? <p>{error.message}</p> : <></>}
                            </div>
                            <div className={styles.buttons}>
                                <button
                                    onClick={download}
                                    className={[
                                        styles.button,
                                        styles.primary,
                                        error || downloaded ? styles.critical : "",
                                    ].join(" ")}
                                >
                                    {progress.c > 0 && progress.c < progress.t ? (
                                        <CircularProgressbar
                                            className={pbstyles.progress}
                                            value={progress.c}
                                            maxValue={progress.t}
                                        />
                                    ) : (
                                        <>Download</>
                                    )}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="spinner">
                            <FaSpinner />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
