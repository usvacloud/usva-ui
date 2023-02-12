import styles from "@/styles/About/About.module.scss"
import Header from "../shared/Header"

function Question(props: { question: string; answer: string }) {
    return (
        <div className={styles.question}>
            <h3 className="title">{props.question}</h3>
            <p className="description small">{props.answer}</p>
        </div>
    )
}

export default function FAQ() {
    return (
        <div className={styles.faq}>
            <Header
                bigHeader={true}
                title="Frequently Asked Questions"
                description={`We know. We haven't answered all the questions yet.`}
            />

            <div className={styles.list}>
                <Question
                    question="How do I upload my file or files?"
                    answer={`
                    Navigate to the website root, drop the files to the box (or add them manually) and follow the steps.
                    We are constantly improving our service to make uploads easier and faster.
                `}
                />
                <Question
                    question="Can I protect my files somehow?"
                    answer={`
                    Yes. This service provides an optional password protection for every upload. 
                    For more advanced protection you can choose to encrypt your files in the upload process.
                `}
                />
                <Question
                    question="What is the main concept of Usva?"
                    answer={`
                    The ideology behind Usva is to offer a service for extremely simple bulk file
                    uploads securely. Usva is completely free for the users.
                `}
                />
            </div>
        </div>
    )
}
