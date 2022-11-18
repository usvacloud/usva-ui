import { useRouter } from "next/router"
import styles from "@/styles/File/SpecificFile.module.scss"
import { useEffect, useMemo, useState } from "react"
import { defaultWrapper, FileInformation } from "@/common/apiwrapper/main"
import { humanReadableDate, humanReadableSize } from "src/common/utils/units"

export default function FileDownload() {
    const { slug } = useRouter().query
    const [file, setFile] = useState<FileInformation>()
    const [downloaded, setDownloaded] = useState<boolean>(false)
    const [error, setError] = useState<Error>()
    const filename = useMemo(() => slug && (typeof slug === "string" ? slug : slug[0]), [slug])

    useEffect(() => {
        if (!downloaded) return
        setTimeout(() => setDownloaded(false), 4000)
    }, [downloaded])

    async function download() {
        if (!filename || downloaded || error) return

        let done = false
        const file = await defaultWrapper.downloadFile(filename)
        if (file instanceof Error) return setError(file)
        if (!file.body) return setError(Error("Failed to parse body"))

        const downloadFilename = filename.substring(0, 3).concat(".zip")
        const writeStream = require("streamsaver").createWriteStream(downloadFilename)
        window.onunload = writeStream.abort
        window.onbeforeunload = (evt) => {
            if (done) evt.returnValue = `Are you sure you want to leave?`
        }

        await file.body?.pipeTo(writeStream)

        setDownloaded(true)
        done = true
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
                                    "Here's your upload."
                                )}{" "}
                            </h1>
                            <p>
                                Before you proceed further, here is a quick review of your download.
                                <br />
                                (psst! when you download the file, you accept our{" "}
                                <a href="/file-downloader-policy">File Downloader Policy</a>.)
                            </p>
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
                                Download
                            </button>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
