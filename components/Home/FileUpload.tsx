import styles from "@/styles/Home.module.scss"
import { useEffect, useRef, useState } from "react"
import { FaArrowUp, FaCircle, FaDotCircle, FaEllipsisH, FaExclamationCircle, FaFileArchive, FaInfoCircle, FaPlusCircle, FaRegCircle, FaRegFileArchive, FaTimes } from "react-icons/fa"
import UploadOverview from "./UploadOverview"
import IconByExtension from "./IconByExtension"
import { motion } from "framer-motion"

export default function FileUpload() {
    let fileInputRef = useRef<HTMLInputElement>(null)
    let buttonRef = useRef<HTMLSpanElement>(null)
    
    const [fileUploadState, setFileUploadState] = useState<{
        processing: boolean;
        uploading: boolean;
        uploaded: boolean;
        failed: boolean;
        encryptionProps: {
            password: string | undefined;
        };
    }>({
        processing: false,
        uploading: false,
        uploaded: false,
        failed: false,
        encryptionProps: {
            password: undefined,
        }
    })

    const [uploadProcessing, setUploadProcessing] = useState<{
        warning: string | undefined,
        error: string | undefined,
    }>({
        warning: undefined,
        error: undefined
    })
    useEffect(() => {
        if (!window.crypto.subtle) 
            setUploadProcessing(prev => ({...prev, warning: "Your browser doesn't support encryption."}))
    }, [])
    
    const [isLocked, setIsLocked] = useState<boolean>(false)
    useEffect(() => setIsLocked(
        fileUploadState.uploaded
            || fileUploadState.uploading 
            || fileUploadState.processing
    ))

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
            if (file?.type && files.filter(f => f.lastModified === file.lastModified).length === 0) tmpFiles.push(file)
        }

        setFiles(prev => prev.concat(tmpFiles))
        setSyncNeeded(false)
    }, [syncNeeded])

    const addFile = () => {
        if (!fileInputRef.current || isLocked) return
        if (!fileInputRef.current.onchange) fileInputRef.current.onchange = () => setSyncNeeded(true)
        fileInputRef.current.click() // open the actual file input
    }

    const removeFile = (i: number) => {
        setFileUploadState(prev => ({...prev, processing: true}))

        let f = files
        f.splice(i, 1)
        setFiles(f)

        setFileUploadState(prev => ({...prev, processing: false}))
    }
    
    // Processing the files
    const handleUpload = () => {
        if (isLocked) return
        
        setFileUploadState(prev => ({...prev, uploading: true }))
        setTimeout(() => {
            setFileUploadState(prev => ({ ...prev, uploading: false, uploaded: true }))
        }, 2000)
    }

    const [uploadName, setUploadName] = useState<string>()
    useEffect(() => {
        if (!uploadName) return

        if (uploadName.length < 0) 
            return setUploadProcessing(prev => ({...prev, warning: undefined}))
        
        if (uploadName.length >= 25) 
            return setUploadProcessing(prev => ({...prev, warning: "Upload's name is too long."}))
        

        setUploadProcessing(prev => ({...prev, warning: undefined}))
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
            />
            <div className={styles.uploadContainer}>
                <div
                    onClick={((!files || files?.length === 0) && !uploadProcessing.error) ? addFile : () => {}} 
                    className={[
                        styles.fileUpload, 
                        ((!files || files?.length === 0) ? styles.waiting : ""),
                        uploadProcessing.error ? styles.critical : ""
                    ].join(" ")}
                >
                    {
                    (files && files?.length > 0) 
                        ? (
                        <>
                            { /* Files not shown, uploaded already */}
                            <motion.div 
                                animate={{
                                    transform: fileUploadState.uploaded ? "scaleY(1)" : "scaleY(0)",
                                    opacity: fileUploadState.uploaded ? 1 : 0,
                                    display: fileUploadState.uploaded ? "block" : "none"
                                }}
                                className={styles.uploadinfo}>
                                <h3 className="title">Congratulations, your upload was processed!</h3>
                                <p>
                                    Your file was successfully uploaded to usva's servers. You can now
                                    share the upload link to anyone.
                                </p>
                                
                                <label>Copy the file link manually</label>
                                <a className={styles.manualcopylink} href="#">/download/27dd31f7-89cc-4692-b122-5f319fc5d69a</a>
                                
                                <div className={styles.buttons}>
                                    <div className={styles.icons}>
                                        <button onClick={() => setOverviewShown(true)} className={styles.icon}><FaEllipsisH /></button>
                                    </div>
                                    <button className={styles.button}>Copy share link</button>
                                </div>
                            </motion.div>

                            { /* Files shown */}
                            <motion.div 
                                animate={{
                                    height: !fileUploadState.uploaded ? "initial" : "none",
                                    display: !fileUploadState.uploaded ? "flex" : "none" 
                                }}
                                className={styles.fileContainer}>
                                <p className="title">
                                    You {
                                        fileUploadState.uploaded ? "uploaded" : "have added"
                                    } {files.length} file{files.length > 1 && "s"}, 
                                    which {
                                    files.length > 1 
                                    ? `${ files.length <= 3
                                                ? "are all"
                                                : `of 3 are`}`
                                                : `is`
                                            } shown below. 
                                    <a onClick={() => {
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
                                    }} href="#" className="animated">{
                                        fileUploadState.uploaded ? "Upload another" : "Reset"
                                    }</a>
                                </p>

                                {
                                    files.map((f, i) => {
                                        if (i >= 3 || !f) return
                                        return (
                                            <motion.div
                                                animate={{
                                                    transform: files ? "scaleY(1)" : "scaleY(0)"
                                                }}
                                                key={i}
                                                className={[styles.fileInfo, (isLocked ? styles.disabled : "")].join(" ")}>
                                                <IconByExtension type={f.type} />
                                                <span className={styles.filename}>{f.name ? f.name : "Anonymous file"}</span>
                                                <FaTimes
                                                    onClick={(e) => {
                                                        if (e.currentTarget.parentElement)
                                                            e.currentTarget.parentElement.style.transform = "scaleY(0)"
                                                        setTimeout(() => removeFile(i), 150)
                                                    }}
                                                    className={styles.close}
                                                />
                                            </motion.div>
                                        )
                                    })
                                }
                                <div className={styles.buttons}>
                                
                                    <div className={styles.icons}>
                                        <button className={styles.icon} onClick={() => setOverviewShown(true)}>
                                            <FaEllipsisH />
                                        </button>

                                        <button className={styles.icon} onClick={addFile}>
                                            <FaPlusCircle />
                                        </button>
                                    </div>

                                    <button 
                                        onClick={handleUpload} 
                                        className={[styles.button, styles.primary, (isLocked ? styles.disabled : "")].join(" ")}
                                    >
                                        {
                                            fileUploadState.uploading
                                                ? 
                                                    <div className={styles.buttonProcessing}>
                                                        <span ref={buttonRef} className={styles.uploading}>Your files are now uploading.</span>
                                                        <div className={styles.updown}><FaArrowUp /></div>
                                                    </div>
                                                : fileUploadState.uploaded
                                                    ? <span ref={buttonRef}>Upload done.</span>
                                                    : <span ref={buttonRef}>Proceed to upload</span>
                                        }
                                    </button>
                                </div>
                            </motion.div>

                            { uploadProcessing.warning 
                                ? (<p className={styles.warning}>{uploadProcessing.warning}</p>)
                                : (<></>)
                            }
                        </>
                    ) 
                    : (
                        <>
                            <div className={styles.loadicon}>
                                {uploadProcessing.error ? <FaExclamationCircle /> : <FaFileArchive />}
                            </div>
                            <p className={styles.fileDescription}>{
                                uploadProcessing.error 
                                    ? uploadProcessing.error 
                                    : "Select or drop files here"
                            }</p>
                        </>
                    )}
                    
                    <input type="file" multiple={true} ref={fileInputRef} />
                </div>
            </div>
        </>)
}