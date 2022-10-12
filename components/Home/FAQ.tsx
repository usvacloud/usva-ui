import styles from "@/styles/Home.module.scss"
import Header from "./Header"

function Question(props: {
    question: string,
    answer: string,
}) {
    return <div className={styles.question}>
        <h2 className="title">{props.question}</h2>
        <p className="description small">{props.answer}</p>
    </div>
}

export default function FAQ() {
    return <div className={styles.faq}>
        <Header
            title="Frequently Asked Questions"
            description={`We know. We haven't answered all the questions yet.`}
        />

        <div className={styles.list}>
            <Question
                question="How do I upload my file or files?"
                answer={`
                    To upload a file, drop the file to the white box on top of this page.
                    We are constantly improving our service to make uploads easier and faster.
                `}
            />
            <Question
                question="How can you know what I upload?"
                answer={`
                    I can't keep track of what you upload, and that is the main concept of privacy.
                    To keep track of the quality and legality of uploads, 
                    we provide a file reporting feature.
                `}
            />
            <Question
                question="What is the main concept of Usva?"
                answer={`
                    The ideology behind Usva is to offer a service for extremely simple bulk file
                    uploads securely. Usva is completely free and we run it with users' donations.
                `}
            />
        </div>
    </div>
}