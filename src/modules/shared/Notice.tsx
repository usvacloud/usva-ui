import styles from "@/styles/shared/Notice.module.scss"

export default function Notice() {
    return (
        <>
            <p className={styles.notice}>
                By the way, this is a beta version of Usva and therefore all features are not implemented yet.
            </p>
        </>
    )
}
