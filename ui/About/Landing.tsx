import styles from "@/styles/About/About.module.scss"

export default function Landing() {
    return (
        <div className={styles.landing}>
            <div className={styles.centerContainer}>
                <div className={styles.header}>
                    <h1 className="title big">
                        You get Usva as a completely free service, we have you as a loyal user.
                    </h1>
                    <h3 className="description">
                        Usva is built from ground-up to provide the best user experience and reliability for
                        all users and files. Because privacy is extremely important consept nowadays, we apply
                        a lot of modern practices in our services to secure the identity of our users.
                    </h3>
                </div>
            </div>
        </div>
    )
}
