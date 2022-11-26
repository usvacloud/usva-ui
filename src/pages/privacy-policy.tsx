import styles from "@/styles/TextPages.module.scss"

export default function PrivacyPolicy() {
    return (
        <>
            <div className={styles.header}>
                <h1 className="title">Privacy Policy</h1>
                <p className="description">
                    Our privacy practices. Primarily describes what information we save for each user.
                </p>
            </div>

            <div className={styles.section}>
                <div className={styles.content}>
                    <h2 className="title">What data this service collects</h2>

                    <p className="description small">
                        For each user this service saves their uploads, their IP-Address as sha256-hashed
                        strings, the time the upload was transferred and feedbacks and reports they have
                        submitted.
                    </p>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.content}>
                    <h2 className="title">Where the data is saved</h2>

                    <p className="description small">
                        The data is saved in the database connected to the backend. The country locations may
                        vary, but the primary production instance, found at usva.cc, all servers are located
                        in Europe Union. Therefore GDPR applies, and you can make legal requests to email
                        found in the bottom of each page.
                    </p>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.content}>
                    <h2 className="title">How data is processed</h2>

                    <p className="description small">
                        The user data is processed during an action of server&apos;s cleanup, database queries
                        and different sorts of actions you make as an end-user.
                    </p>
                </div>
            </div>
        </>
    )
}
