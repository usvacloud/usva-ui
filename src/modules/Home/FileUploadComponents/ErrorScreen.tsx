import styles from "@/styles/Home/Home.module.scss"

export function ErrorScreen(props: { error: Error | undefined; resetUpload: () => void }) {
    let err = props.error
    if (!err) err = Error("We are terribly sorry. Your upload failed for an unkonown reason.")
    return (
        <div className={[styles.finished, styles.critical].join(" ")}>
            <h2 className="title">{err.message}</h2>
            <p>
                {err.cause
                    ? `${err.cause}`
                    : `Unfortunately we had some issues while preparing your upload for further processing. If this
                problem persists, please contact the developer for further assistance.`}
            </p>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={props.resetUpload}>
                    Start over
                </button>
            </div>
        </div>
    )
}
