import styles from "@/styles/Home.module.scss"
import Header from "./Header"

function Feature(props: {
    title: string,
    description: string,
    id: Number,
}) {
    return <div className={styles.item}>
        <div className={[styles.bgbox, styles["i"+props.id.toString()]].join(" ")} />

        <h2 className="title">{props.title}</h2>
        <p className="description small">{props.description}</p>
    </div>
}

function FeatureList() {
    return <div className={styles.list}>
        <Feature 
            title="Extreme Privacy"
            description={`
                For the sake of scalability and reliability, 
                it’s possible to delete all information from a specific file.
            `}
            id={1}
        />
        <Feature 
            title="Extreme Privacy"
            description={`
                For the sake of scalability and reliability, 
                it’s possible to delete all information from a specific file.
            `}
            id={2}
        />
        <Feature 
            title="Extreme Privacy"
            description={`
                For the sake of scalability and reliability, 
                it’s possible to delete all information from a specific file.
            `}
            id={3}
        />
    </div>
}

export default function Highlights() {
    const description = `There is many reasons to use Usva. For example, it’s easy to use and it’s completely handcrafted. Usva hears it’s users, and adapts to users’ needs when possible.`

    return <div className={styles.highlights}>
        <Header title="Highlights" description={description} />
        <FeatureList />
    </div>
}