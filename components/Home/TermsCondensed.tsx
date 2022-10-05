import styles from "@/styles/Home.module.scss"
import Header from "./Header"

export default function TermsCondensed() {
    return <div className={styles.termscondensed}>
        <Header
            title="Summary of Usva's terms and policies"
            description={`A few want to read the entirety of legal texts, 
                but many care about their privacy and rights. 
                Because I want this service to be extremely simple and trustworthy to use,
                I’ve listed below the most important parts of privacy policy and terms of service.`
            }
        />

        <div className={styles.content}>
            <div className={styles.terms}>
                <h2 className={styles.title}>Terms of Service</h2>
                <ul>
                    <li>Uploads including any form of pornographic content is strictly prohibited.</li>
                    <li>Uploads including any illegal documents, including copyrighted content is prohibited.</li>
                    <li>
                        Uploads including personal information should be always encrypted when possible,
                        to prevent possible breaches from leaking them.
                    </li>
                </ul>
                <p className={styles.tosnotice}>
                    In case prohibited content is uploaded, the uploader will be banned from uploading for the next 30 days
                    and files the user has uploaded will be deleted without further notice.
                </p>
            </div>
            <div className={styles.terms}>
                <h2 className={styles.title}>Privacy Policy</h2>
                <p className={styles.desc}>
                    Your IP address is, depending on the server’s configuration,
                    going to be saved for the file’s lifetime.
                    This security practice is only done to prevent possible breaking of the Terms of Service.
                    I’m personally all against breaking any privacy regulations,
                    and building services with distorted privacy policies. 
                    The saved IP address is hashed, as well as any other personal information are strictly
                    processed to enhance security of the client.
                </p>
            </div>
        </div>
    </div>
}