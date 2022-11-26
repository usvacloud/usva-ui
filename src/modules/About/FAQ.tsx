import styles from "@/styles/About/About.module.scss"
import Header from "../shared/Header"

function Question(props: { question: string; answer: string }) {
    return (
        <div className={styles.question}>
            <h2 className="title">{props.question}</h2>
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
                    To upload a file, navigate to the website landing page and .
                    We are constantly improving our service to make uploads easier and faster.
                `}
                />
                <Question
                    question="Can you know the content of my uploads?"
                    answer={`
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
    )
}
