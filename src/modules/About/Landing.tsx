import styles from "@/styles/About/About.module.scss"

export default function Landing() {
    return (
        <div className={styles.landing}>
            <div className={styles.centerContainer}>
                <div className={styles.header}>
                    <h1 className="title big">
                        Usva is an open-source temporary file cloud with multiple features.
                    </h1>
                    <p className="description">
                        Usva&apos;s primary goal is to provide everyone a trustworthy and anonymous file
                        sharing service with built-in security controls for every user. Usva isn&apos;t
                        tracking you down, or showing you annoying ads. Usva is hosted without any profit.
                    </p>
                </div>
            </div>
        </div>
    )
}
