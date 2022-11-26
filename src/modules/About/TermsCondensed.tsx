import styles from "@/styles/About/About.module.scss"
import Header from "../shared/Header"

export default function TermsCondensed() {
    return (
        <div className={styles.termscondensed}>
            <Header
                bigHeader={true}
                title="Summary of Usva's terms and policies"
                description={`
                A quick overview of your privacy and rights with Usva. 
                Here you can find the most notable parts of both privacy policy and terms of service.
            `}
            />

            <div className={styles.content}>
                <div className={styles.terms}>
                    <h3 className={styles.title}>Terms of Service</h3>
                    <ul>
                        <li>Uploads including any form of pornographic content is strictly prohibited.</li>
                        <li>
                            Uploads including any illegal documents, including copyrighted content is
                            prohibited.
                        </li>
                        <li>
                            Uploads including personal information should be always encrypted when possible,
                            to prevent possible breaches from leaking them.
                        </li>
                    </ul>
                    <p className={styles.tosnotice}>
                        In case prohibited content is uploaded, the uploader will be banned from uploading for
                        the next 30 days and files the user has uploaded will be deleted without further
                        notice.
                    </p>
                </div>
                <div className={styles.terms}>
                    <h3 className={styles.title}>Privacy Policy</h3>
                    <p className={styles.desc}>
                        In nutshell, we save IP addresses of file uploaders as SHA256 hashed strings to make
                        temporary banning of guilty uploaders possible. All personal information is strictly
                        processed either in the browser or at the latest in the server.
                    </p>
                </div>
            </div>
        </div>
    )
}
