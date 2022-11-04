import styles from "@/styles/About/About.module.scss"

export default function Landing() {
    return (
        <div className={styles.landing}>
            <div className={styles.centerContainer}>
                <div className={styles.header}>
                    <h1 className="title big">You have Usva and we have a loyal user.</h1>
                    <h3 className="description">
                        It might not be clear at first, but after a while you&apos;ll find many situations
                        where you could make life easier with Usva. Usva also provides file inspection even
                        when the file was encrypted.
                    </h3>
                </div>
            </div>
        </div>
    )
}
