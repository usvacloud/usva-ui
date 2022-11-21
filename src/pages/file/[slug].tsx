import { useRouter } from "next/router"
import styles from "@/styles/File/SpecificFile.module.scss"
import pbstyles from "@/styles/shared/CircularPB.module.scss"
import { useEffect, useMemo, useState } from "react"
import { defaultWrapper, FileInformation } from "@/common/apiwrapper/main"
import { humanReadableDate, humanReadableSize } from "src/common/utils/units"
import { MotionConfig } from "framer-motion"
import { CircularProgressbar } from "react-circular-progressbar"

export default function FileDownload() {
    const { slug } = useRouter().query
    const [file, setFile] = useState<FileInformation>()
    const [downloading, setDownloading] = useState<boolean>(true)
    const [downloaded, setDownloaded] = useState<boolean>(false)
    const [error, setError] = useState<Error>()
    const filename = useMemo(() => slug && (typeof slug === "string" ? slug : slug[0]), [slug])

    useEffect(() => {
        if (!downloaded) return
        setTimeout(() => setDownloaded(false), 4000)
    }, [downloaded])

    async function download() {
        if (!filename || downloaded || error) return

        const file = await defaultWrapper.downloadFile(filename)
        if (file instanceof Error) return setError(file)
        if (!file.data) return setError(Error("Failed to parse body"))

        const downloadFilename = filename.substring(0, 4).concat(".zip")
        const writeStream: WritableStream = require("streamsaver").createWriteStream(downloadFilename)
        window.onunload = writeStream.abort

        const resp = new Response(file.data).body
        let chunk = await resp?.getReader().read(150)

        setDownloaded(true)
    }

    useEffect(() => {
        async function fetchData() {
            if (!filename) return

            const f = await defaultWrapper.getFileInformation(filename)
            if (f instanceof Error) {
                if (window) window.location.replace("/not-found")
                return
            }
            setFile(f)
        }

        fetchData()
    }, [filename])

    return (
        <>
            <div className={styles.main}>
                <div className={styles.content}>
                    {file ? (
                        <>
                            <div className={styles.filemeta}>
                                <h1 className={file.title ? styles.withname : ""}>
                                    {file.title ? (
                                        <>
                                            Download of <span className={styles.special}>{file.title}</span>
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
                                    Download{" "}
                                    {
                                        <CircularProgressbar
                                            className={pbstyles.progress}
                                            value={123}
                                            maxValue={100}
                                        />
                                    }
                                </button>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    )
}
