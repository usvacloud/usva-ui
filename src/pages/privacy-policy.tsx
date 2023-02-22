import styles from "@/styles/TextPages.module.scss"

export default function PrivacyPolicy() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1 className="title">Privacy Policy</h1>
                    <p>
                        In this data protection policy, I inform about the processing of personal data in
                        accordance with the EU General Data Protection Regulation (2016/679).
                    </p>
                </div>
                <div className={styles.section}>
                    <div className={styles.content}>
                        <h2 className="title">Purpose and basis of dealing with personal information</h2>
                        <p>
                            I process, collect and retain users&apos; personal data for pre-defined legal
                            purposes.
                        </p>

                        <h3 className="title">Offering and delivering the service</h3>
                        <p>
                            Processing of user personal data is necessary to provide cloud storage and prevent
                            abuse, such as distributing material that is unlawful or protected by copyright to
                            the public. The legal basis for the proceedings is the agreement.
                        </p>

                        <h3 className="title">Contacting</h3>
                        <p>
                            If a person contacts me, for example, through an email or form on the website, I
                            will process the person&apos;s contact information. Handling is necessary to
                            answer the questions asked and get feedback. The legal basis for the processing is
                            the consent that the user can cancel at any time by contacting me.
                        </p>

                        <h3 className="title">Offering and delivering the service</h3>
                        <p>
                            Processing of user personal data is necessary to provide cloud storage and prevent
                            abuse, such as distributing material that is unlawful or protected by copyright to
                            the public. The legal basis for the proceedings is the agreement.
                        </p>

                        <h3 className="title">Legal obligation</h3>
                        <p>
                            In certain cases, for example, the user violates the terms of use of the service
                            by distributing unlawful or copyrighted material, I have to comply with the
                            provisions of the right holder or the authority under a statutory obligation.
                        </p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.content}>
                        <h2 className="title">Personal data groups in question</h2>
                        <p>
                            I only collect personal information from users that are necessary for pre
                            -determined purposes. Providing personal data is a contractual requirement if the
                            user wants to use cloud storage. For communication, the provision of personal
                            information is voluntary. I do not process minors&apos; personal information.
                        </p>
                        <p>
                            I will process the following personal information in order to provide the service:
                        </p>
                        <ul>
                            <li>files that the user stores on my service</li>
                            <li>a cookie tag used only for user authentication</li>
                            <li>IP address that is protected cryptographically by SHA-256 hash algorithm</li>
                        </ul>
                        <p>
                            I will deal with the user to contact me with the following personal information:
                        </p>
                        <ul>
                            <li>Email address</li>
                            <li>Correspondence</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.content}>
                        <h2 className="title">Personal data retention period</h2>
                        <p>
                            The files and the encrypted IP address combined with them will be retained for up
                            to 30 days. Contact information will be retained for up to two (2) years unless
                            the user cancel the consent. From the regulation of the authority, the information
                            may need to be retained longer than necessary.
                        </p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.content}>
                        <h2 className="title">Security of personal data</h2>
                        <p>
                            I process personal data in a way that aims to ensure proper safety of personal
                            data, including protection from unauthorized processing and accidentally loss,
                            destruction or damage. The information is not profiled or processed for automatic
                            decision -making.
                        </p>
                        <p>
                            I use appropriate technical and organizational protection measures to ensure this
                            goal, such as firewalls, encryption techniques and safe equipment, proper access
                            control, and carefully control the server usernames.
                        </p>
                        <p>
                            The file retaining the file is located in Germany, provided by a reliable service
                            provider Oracle (https://oracle.com). Only I have access to the material
                            containing personal data, and I am committed to absolute confidentiality and
                            confidentiality of the things I have learned when processing personal information.
                        </p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.content}>
                        <h2 className="title">Data transfer to third countries</h2>
                        <p>
                            Personal data is not transferred outside the EU/ETA-area. The server is located in
                            Germany.
                        </p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.content}>
                        <h2 className="title">Rights to personal data</h2>
                        <p>
                            The user has the right to use the following rights by contacting me via email. My
                            contact information is at the end of this privacy policy.
                        </p>

                        <h3>Right to access personal data</h3>
                        <p>The user has the right to receive a copy of their personal data.</p>

                        <h3>Right to correct personal data</h3>
                        <p>
                            The user has the right to demand that the user&apos;s inaccurate and incorrect
                            personal data be corrected.
                        </p>

                        <h3>The right to delete data and be forgotten</h3>
                        <p>
                            The user has the right to demand that I delete the user&apos;s data without undue
                            delay.
                        </p>

                        <h3>The right to limit data processing</h3>
                        <p>
                            The user has the right to ask me to limit the processing of the user&apos;s
                            personal data.
                        </p>

                        <h3>The right to transfer data from one system to another</h3>
                        <p>
                            The user has the right to receive the personal data they have provided to me in a
                            structured, commonly used and machine-readable format and, if they wish, to
                            transfer the data in question to another controller.
                        </p>

                        <h3>The right to file a complaint with the supervisory authority</h3>
                        <p>
                            Every user has the right to file a complaint with the supervisory authority if the
                            data subject considers that the processing of personal data concerning him/her
                            violates the data protection regulation. The data subject can file a complaint,
                            for example, if the data controller does not properly implement the data
                            subject&apos;s rights in the data protection regulation.
                        </p>
                        <p>
                            In Finland, you can file a complaint with the{" "}
                            <a href="https://tietosuoja.fi/ilmoitus-tietosuojavaltuutetulle">
                                Data Protection Commissioner.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
