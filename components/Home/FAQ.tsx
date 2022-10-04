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
                question="How do I use this?"
                answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
            />
            <Question
                question="How do I use this?"
                answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
            />
            <Question
                question="How do I use this?"
                answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
            />
            <Question
                question="How do I use this?"
                answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
            />
            <Question
                question="How do I use this?"
                answer={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
            />
        </div>
    </div>
}