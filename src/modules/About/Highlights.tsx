import Header from "../shared/Header"
import styles from "@/styles/About/About.module.scss"
import { FaAccessibleIcon, FaClock, FaLeaf, FaShoePrints } from "react-icons/fa"

function Feature(props: { title: string; description: string; icon: JSX.Element }) {
    return (
        <div className={styles.item}>
            {props.icon}
            <h2 className="title">{props.title}</h2>
            <p className="description small">{props.description}</p>
        </div>
    )
}

function FeatureList() {
    return (
        <div className={styles.list}>
            <Feature
                title="No footsteps left behind"
                description={`After a file has been deleted from Usva's servers there is literally
                no traces about you.`}
                icon={<FaShoePrints />}
            />
            <Feature
                title="Straightforward workflow"
                description={`Add your files, press upload, ready.`}
                icon={<FaClock />}
            />
            <Feature
                title="Optimized"
                description={`Usva was designed to be very energy-efficient.`}
                icon={<FaLeaf />}
            />
        </div>
    )
}

export default function Highlights() {
    const description = `Most notable features of Usva condensed`

    return (
        <div className={styles.highlights}>
            <Header title="Highlights" bigHeader={true} description={description} />
            <FeatureList />
        </div>
    )
}
