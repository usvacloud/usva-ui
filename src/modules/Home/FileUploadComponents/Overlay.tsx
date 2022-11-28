import { motion } from "framer-motion"
import React, { Ref, useMemo, useState } from "react"
import {
    FaFolder,
    FaFolderOpen,
    FaLock,
    FaLockOpen,
    FaRegFrown,
    FaRegSmileBeam,
    FaSpinner,
    FaTimes,
    FaUnlock,
    FaUnlockAlt,
    FaUserLock,
} from "react-icons/fa"
import styles from "@/styles/Home/Home.module.scss"
import overlays from "@/styles/shared/Overlays.module.scss"
import IconByExtension from "@/components/Home/FileUploadComponents/IconByExtension"
import { FileInitMeta } from "@/common/filehandler/upload"
import { humanReadableSize } from "@/common/utils/units"

export default function UploadOverview(props: {
    shown: boolean
    setShown: (x: boolean) => void
    locked: boolean
    files: FileInitMeta[]
    removeFile: (i: number) => void
    title: string
    passwordInputRef: Ref<HTMLInputElement>
    setTitle: (x: string) => void
    isTitleValidCallback: (x: string) => boolean
}) {
    const removeFile = (i: number) => {
        props.removeFile(i)
        if (props.files.length < 1) props.setShown(false)
    }

    const [renaming, setRenaming] = useState(false)
    const [passwordSaving, setPasswordSaving] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)

    return (
        <>
            <motion.div
                animate={{
                    transform: props.shown ? "scaleY(1)" : "scaleY(0)",
                    opacity: props.shown ? 1 : 0,
                }}
                className={[styles.overview, overlays.overview].join(" ")}
            >
                <div className={[styles.contentbox, overlays.contentbox].join(" ")}>
                    <div
                        className={[styles.close, overlays.close].join(" ")}
                        onClick={() => props.setShown(false)}
                    >
                        <FaTimes />
                    </div>
                    <h1 className="title primary">Overview</h1>

                    <div className={styles.settings}>
                        <div className={styles.inline}>
                            <h3 className="title">General settings</h3>
                        </div>
                        <div className={styles.inputfields}>
                            <div className={styles.inputSetting}>
                                <div className={styles.inline}>
                                    <label>Name your upload</label>
                                    <div className={styles.status}>
                                        {renaming ? (
                                            <div className="spinner">
                                                <FaSpinner className={styles.spinner} />
                                            </div>
                                        ) : props.isTitleValidCallback(props.title) ? (
                                            <>
                                                <FaRegSmileBeam className={styles.check} />
                                            </>
                                        ) : (
                                            <>
                                                <FaRegFrown className={styles.times} />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <input
                                    onChange={(e) => {
                                        setRenaming(true)
                                        setTimeout(() => {
                                            props.setTitle(e.target.value)
                                            setRenaming(false)
                                        }, 20)
                                    }}
                                    disabled={props.locked}
                                    type="text"
                                    placeholder="Files for tomorrow's meeting"
                                />
                            </div>
                            <div className={styles.inputSetting}>
                                <div className={styles.inline}>
                                    <label>Protect your upload</label>
                                    <div className={styles.status}>
                                        {passwordSaving ? (
                                            <div className="spinner">
                                                <FaSpinner />
                                            </div>
                                        ) : passwordValid ? (
                                            <>
                                                <FaLock className={styles.check} />
                                            </>
                                        ) : (
                                            <>
                                                <FaUnlockAlt className={styles.times} />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <input
                                    ref={props.passwordInputRef}
                                    onChange={(e) => {
                                        setPasswordSaving(true)
                                        setPasswordValid(e.target.value != "")
                                        setTimeout(() => {
                                            setPasswordSaving(false)
                                        }, 20)
                                    }}
                                    disabled={props.locked}
                                    type="password"
                                    placeholder="my-supersecret-password"
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.s}>
                        <h3 className="title">Files</h3>
                        <p>
                            Final size of your upload is about{" "}
                            {humanReadableSize(
                                props.files.reduce((prev, current) => prev + current.rawsize, 0)
                            ) + "."}
                        </p>
                        <div className={styles.filesAdvanced}>
                            {props.files?.map((file: FileInitMeta, index: number) => {
                                if (!file) return
                                return (
                                    <div
                                        key={index}
                                        className={[styles.file, props.locked ? styles.disabled : ""].join(
                                            " "
                                        )}
                                    >
                                        <div className={styles.fileicon}>
                                            <IconByExtension type={file.type} />
                                        </div>
                                        <span className={styles.filename}>
                                            {file.filename.slice(0, 15) +
                                                (file.filename.length > 15 ? "..." : "")}
                                        </span>

                                        <span className={styles.size}>{file.size}</span>
                                        <FaTimes className={styles.close} onClick={() => removeFile(index)} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
