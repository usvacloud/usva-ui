import Header from "../shared/Header"
import styles from "@/styles/About/About.module.scss"

function Feature(props: { title: string; description: string; id: Number }) {
    return (
        <div className={styles.item}>
            <div className={[styles.bgbox, styles["i" + props.id.toString()]].join(" ")} />

            <h2 className="title">{props.title}</h2>
            <p className="description small">{props.description}</p>
        </div>
    )
}

function FeatureList() {
    return (
        <div className={styles.list}>
            <Feature
                title="Optimal File Preservation"
                description={`
                Files are saved for specific amount of time by default, but
                they can also be removed at any time before they expire.
            `}
                id={1}
            />
            <Feature
                title="Very Very Very Good Security"
                description={`
                All uploaded files are processed with strong cryptography algorithms
                before upload.
                `}
                id={2}
            />
            <Feature
                title="Easy and Fast Workflow"
                description={`
                All files are compressed before upload to minimize the amount
                of uploaded data. Even better, everything can be done in under 20 seconds.
            `}
                id={3}
            />
        </div>
    )
}

export default function Highlights() {
    const description = `Most notable features of Usva condensed`

    return (
        <div className={styles.highlights}>
            <Header title="Highlights" description={description} />
            <FeatureList />
        </div>
    )
}
