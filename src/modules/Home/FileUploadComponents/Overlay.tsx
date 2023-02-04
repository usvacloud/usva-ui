import { motion } from "framer-motion"
import React, { Ref, useEffect, useRef, useState } from "react"
import {
    FaFileUpload,
    FaLock,
    FaRegFrown,
    FaRegSmileBeam,
    FaShieldAlt,
    FaSpinner,
    FaTimes,
    FaUnlockAlt,
} from "react-icons/fa"
import styles from "@/styles/Home/Home.module.scss"
import overlays from "@/styles/shared/Overlays.module.scss"
import IconByExtension from "@/components/Home/FileUploadComponents/IconByExtension"
import { FileInitMeta } from "@/common/filehandler/upload"
import { humanReadableSize } from "@/common/utils/units"
import { useMemo } from "react"
import { ApiWrapper, defaultWrapper, Restrictions } from "@/common/apiwrapper/main"

export default function UploadOverview(props: {
    shown: boolean
    setShown: (x: boolean) => void
    locked: boolean
    setEncrypt: (i: boolean) => void
    encrypt: boolean
    files: FileInitMeta[]
    removeFile: (i: number) => void
    title: string
    passwordInputRef: Ref<HTMLInputElement>
    passwordValid: boolean
    setPasswordValid: (i: boolean) => void
    setTitle: (x: string) => void
    isTitleValidCallback: (x: string) => boolean
}) {
    const removeFile = (i: number) => {
        props.removeFile(i)
        if (props.files.length < 1) props.setShown(false)
    }

    const [restrictions, setRestrictions] = useState<Restrictions>()
    const filesSize = useMemo(
        () => props.files.reduce((prev, current) => prev + current.rawsize, 0),
        [props.files]
    )

    useEffect(() => {
        const fetch = async () => {
            const res = await defaultWrapper.getRestrictions()
            if (res instanceof Error) {
                console.error(res)
                return null
            }

            setRestrictions(res)
        }
        fetch()
    }, [])

    const [renaming, setRenaming] = useState(false)
    const [passwordSaving, setPasswordSaving] = useState(false)
    const encryptToggle = useRef<HTMLInputElement>(null)

    function updatePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPasswordSaving(true)
        props.setPasswordValid(e.target.value.length <= 128 && e.target.value.length >= 6)
        setTimeout(() => {
            setPasswordSaving(false)
        }, 10)
    }

    useEffect(() => {
        if (!props.passwordValid && encryptToggle?.current) {
            props.setEncrypt(false)
            encryptToggle.current.checked = false
        }
    }, [props, passwordSaving])

    return (
        <>
            <motion.div
                animate={{
                    transform: props.shown ? "translateY(0px) scaleY(1)" : "translateY(-100%) scaleY(0)",
                    opacity: props.shown ? 1 : 0,
                }}
                className={[styles.overview, overlays.overview].join(" ")}
                initial={{
                    opacity: 0,
                    transform: "translateY(-100%) scaleY(0)",
                }}
            >
                <div className={[styles.contentbox, overlays.contentbox].join(" ")}>
                    <div
                        className={[styles.close, overlays.close].join(" ")}
                        onClick={() => props.setShown(false)}
                    >
                        <FaTimes />
                    </div>
                    <div className={styles.settings}>
                        <h1>Upload settings</h1>
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
                                        props.setTitle(e.target.value)
                                        setTimeout(() => {
                                            setRenaming(false)
                                        }, 10)
                                    }}
                                    disabled={props.locked}
                                    type="text"
                                    placeholder="Files for tomorrow"
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
                                        ) : props.passwordValid ? (
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
                                    onChange={updatePassword}
                                    disabled={props.locked}
                                    type="password"
                                    placeholder="my-supersecret-password"
                                />
                            </div>

                            <div className={styles.checkbox}>
                                <input
                                    ref={encryptToggle}
                                    onChange={(ev) => {
                                        const canEncrypt =
                                            props.passwordValid &&
                                            filesSize < (restrictions?.maxEncryptedFileSize?.bytes || 0)
                                        if (canEncrypt) props.setEncrypt(ev.target.checked)
                                        else ev.target.checked = false
                                    }}
                                    id="1"
                                    type="checkbox"
                                ></input>
                                <label
                                    htmlFor="1"
                                    className={props.encrypt ? styles.encrypt : styles.decrypt}
                                >
                                    Encrypt with password derived key
                                    <FaShieldAlt />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.s}>
                        <h3 className="title">Files</h3>
                        <p>Final size of your upload is about {humanReadableSize(filesSize) + "."}</p>
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
                    <br />
                    <div className={styles.note}>
                        {restrictions && (
                            <ul>
                                <li>
                                    Files will be stored for {restrictions?.filePersistDuration.days} day
                                    {(restrictions?.filePersistDuration.days || 0) > 1 ? "s" : ""}.
                                </li>
                                <li>
                                    Encryption maximum is{" "}
                                    {humanReadableSize(restrictions?.maxEncryptedFileSize.bytes || 0)}, and it
                                    might add risk of data corruption. However it will keep your files more
                                    secure.
                                </li>
                                <li>
                                    You shouldn&apos;t ever trust third party to encrypt your files. If you
                                    are going to upload something sensitive, it&apos;s more than recommended
                                    that you encrypt the files yourself.
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    )
}
