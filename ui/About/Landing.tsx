import styles from "@/styles/About/About.module.scss"

export default function Landing() {
    return (
        <div className={styles.landing}>
            <div className={styles.centerContainer}>
                <div className={styles.header}>
                    <h1 className="title big">
                        You get Usva as a completely free service, we get a loyal user.
                    </h1>
                    <h3 className="description">
                        Usva is built from ground-up to provide the best user experience and reliability for
                        sharing any sort of files. Because privacy is extremely important consept nowadays,
                        Usva takes it seriously (more precisely Usva encrypts your files with modern
                        algorithms to prevent thefts).
                    </h3>
                </div>
            </div>
        </div>
    )
}
