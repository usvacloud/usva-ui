import styles from "@/styles/Home/Home.module.scss"

export default function ErrorScreen(props: { error: Error; resetUpload: () => void }) {
    return (
        <>
            <h3 className="title">{props.error.name}</h3>
            <p>
                Unfortunately we had some issues while preparing your upload for further processing. If this
                problem persists, please (please!) contact the developer for assistance.
            </p>
            <div className={styles.buttons}>
                <button className={[styles.button, styles.critical].join(" ")} onClick={props.resetUpload}>
                    Start over
                </button>
            </div>
        </>
    )
}
