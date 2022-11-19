import styles from "@/styles/Home/Home.module.scss"
import { FaEllipsisH, FaRedoAlt } from "react-icons/fa"

export function FinishedScreen(props: {
    filename: string
    switchOverlay: (x: boolean) => void
    resetForm: () => void
}) {
    return (
        <div className={styles.finished}>
            <h3 className="title">Congratulations, your upload was processed!</h3>
            <p>
                Thank you! Your files have now been processed and uploaded successfully. This means that you
                can now send your files forward. Just copy the link to your files below!
            </p>
            <input
                spellCheck={false}
                type="text"
                onSelect={(e) => e.currentTarget.select()}
                className={styles.manualcopylink}
                value={`${typeof window !== "undefined" ? window.location.host : ""}/file/${props.filename}`}
                onChange={() => {}}
            />

            <div className={styles.buttons}>
                <div className={styles.icons}>
                    <button onClick={() => props.switchOverlay(true)} className={styles.icon}>
                        <FaEllipsisH />
                    </button>
                </div>
                <button onClick={props.resetForm} className={styles.button}>
                    Upload a new file <FaRedoAlt />
                </button>
            </div>
        </div>
    )
}
