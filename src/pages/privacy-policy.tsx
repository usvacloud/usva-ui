import styles from "@/styles/TextPages.module.scss"

export default function PrivacyPolicy() {
    return (
        <>
            <div className={styles.main}>
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
                            For each time an user uploads a new file their IP-Address is saved. IP-Address is
                            saved only temporarily in format of string as a SHA256 (256-bit secure hash
                            algorithm) hash. Feedbacks and reports are saved without any identifiers.
                        </p>
                        <p className="description small">
                            The data is saved in the database connected to the backend. The country locations
                            may vary, but for the primary production instance, accessible at https://usva.cc/,
                            all servers are located in the Europe Union. Therefore, GDPR applies, and you can
                            make any legal requests to email found in the bottom of each page.
                        </p>

                        <p className="description small">
                            Cookies are saved to your browser at the time you authenticate yourself to
                            download a file. Saved cookies include access tokens for all the files you&apos;ve
                            authenticated for. The time they are saved for varies, but often it&apos;s from 15
                            minutes to 1 day.
                        </p>

                        <p className="description small">
                            All user data is processed during an action of server&apos;s general cleanup
                            process, database queries or different sorts of actions you make as an end-user.
                        </p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.content}>
                        <h2 className="title">Third-parties in privacy</h2>

                        <p className="description small">
                            We do not sell any data to any third parties. In a self-hosted instance of this
                            service the administrator, or any other peer, is not auhtorized to view the
                            content of your files. All your files are private, and the server administrator is
                            the only one responsible for data loss. Even as we don&apos;t sell data to third
                            parties ourselves, the servers, if hosted at a third-party, may collect some data.
                            The service provider for any instance of theirs is responsible for answering and
                            proceeding in GDPR requests.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
