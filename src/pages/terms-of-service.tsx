import styles from "@/styles/TextPages.module.scss"

export default function TermsOfService() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1 className="title">Terms of Service</h1>
                    <p className="description">
                        Describes users&apos; and server administrator&apos;s rights to this service.
                    </p>
                </div>

                <div className={styles.section}>
                    <div className={styles.content}>
                        <h2 className="title">Acceptance of terms</h2>
                        <p className="description">
                            Describes what you will promise us by using this service.
                        </p>

                        <p className="description small">
                            When you accept the terms, you accept that: <br />- Your IP Address (hashed with
                            SHA256) is linked to upload. <br />- Uploads including any form of prohibited
                            content is authorized to be deleted by the action of server administrator at any
                            time.
                            <br />
                            <br />
                            Prohibited content include: <br />
                            - Any form of pornographic content <br />
                            - Copyrighted content, where uploader isn&apos;t allowed to share the content
                            <br />- Uploads including personal information
                            <br />
                            <br />
                            Personal information includes any phone numbers, physical addresses, internet
                            protocol addresses and names.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.content}>
                            <h2 className="title">User&apos;s seal of approval</h2>
                            <p className="description">
                                Describes user&apos;s rights to manipulate your data saved to servers.
                            </p>
                            <p className="description small">
                                You should only contact with this service through the official website. All
                                penetration testing is prohibited towards this service. We don&apos;t take any
                                responsibilities for the content uploaded in this service, and the uploaders
                                are always responsible for the content they upload.
                            </p>

                            <p className="description small">
                                There is, of course, changes to our way of acting touching specific area of
                                mode of operation, which also includes changes to our way of acting to user
                                specific data. Each time there is any changes the new terms or policies are
                                updated to our website at https://usva.cc. <br /> <br />
                                We save uploaders&apos; and downloaders&apos; IP-Addresses as SHA256 hashed
                                strings to limit the amount of unwanted abuse of our services. In case a file
                                seems suspicious certain checks automatic or manuals checks may be done. If
                                the reviewed file breaks the terms of service it will be deleted.
                            </p>

                            <p className="description small">
                                If you wish that an upload would be taken down for any reason, please contact
                                the administrator.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
