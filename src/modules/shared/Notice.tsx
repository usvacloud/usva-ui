import styles from "@/styles/shared/Notice.module.scss"

export default function Notice() {
    return (
        <>
            <p className={styles.notice}>
                This is a beta version of Usva. All features are probably not implemented yet.
            </p>
        </>
    )
}
