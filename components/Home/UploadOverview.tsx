import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { FaInfoCircle, FaRegBell, FaRegClock, FaRegFrown, FaRegGrimace, FaRegSmileBeam, FaTimes, FaTimesCircle } from 'react-icons/fa'
import styles from "../../styles/Home.module.scss"
import Header from './Header'
import IconByExtension from "./IconByExtension"

function UploadOverview(props: {
    shown: boolean,
    setShown: (x: boolean) => void,
    locked: boolean,
    files: File[],
    removeFile: (i: number) => void
    title: string,
    setTitle: (x: string) => void, 
}) {


    const removeFile = (i: number) => {
        props.removeFile(i)
        if (props.files.length < 1) props.setShown(false) 
    }

    return <>
        <motion.div
            animate={{
                transform: props.shown ? "scaleY(1)" : "scaleY(0)",
                opacity: props.shown ? 1 : 0
            }}
            className={styles.fullscreenOverview}
        >

            <div className={styles.content}>
                <div className={styles.close} onClick={() => props.setShown(false)}><FaTimes /></div>
                <h2 className='title primary'>Overview</h2>

                <div className={styles.s}>
                    <h3 className='title'>General settings</h3>
                    <div className={styles.inputfields}>
                        <div className={styles.inputSetting}>
                            <div className={styles.inline}>
                                <label>Name your upload</label>
                                <span className={styles.status}>
                                    Renamed your upload!
                                    {
                                        <FaRegSmileBeam className={styles.check} />
                                    }
                                </span>
                            </div>
                            <input disabled={props.locked} type="text" placeholder="Meeting at 29. March" />
                        </div>
                        <div className={styles.inputSetting}>
                            <div className={styles.inline}>
                                <label>Protect your files with encryption</label>
                            </div>
                            <input disabled={props.locked} type="password" placeholder="my-awesome-password" />
                        </div>
                    </div>
                </div>

                <div className={styles.s}>
                    <h3 className='title'>Files</h3>
                    <div className={styles.filesAdvanced}>
                        {
                            props.files?.map((file, index) => {
                                if (!file) return
                                return (
                                    <div key={index} className={[styles.file, props.locked ? styles.disabled : ""].join(" ")}>
                                        <div className={styles.fileicon}><IconByExtension type={file.type} /></div>
                                        <span className={styles.filename}>{file.name.slice(0, 25) + (file.name.length > 25 ? "..." : "") }</span>
                                        <FaTimes className={styles.close} onClick={() => removeFile(index)} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    </>
}


export default UploadOverview