import styles from "@/styles/Home/Home.module.scss"
import { FaEllipsisH, FaRedoAlt } from "react-icons/fa"

export function FinishedScreen(props: {
    filename: string
    switchOverlay: (x: boolean) => void
    resetForm: () => void
}) {
    return (
        <div className={styles.finished}>
            <h2 className="title">Congratulations, your files were uploaded!</h2>
            <p>
                Thank you! Your files have now been processed and uploaded successfully. This means that you
                can now send your files forward. Just copy the link to your files below!
            </p>
            <input
                spellCheck={false}
                type="text"
                onSelect={(e) => e.currentTarget.select()}
                className={styles.manualcopylink}
                value={`${typeof window !== "undefined" ? window.location.origin : ""}/file/${
                    props.filename
                }`}
                onChange={() => {}}
            />

            <div className={styles.buttons}>
                <button onClick={props.resetForm} className={styles.button}>
                    Upload a new file <FaRedoAlt />
                </button>
            </div>
        </div>
    )
}
