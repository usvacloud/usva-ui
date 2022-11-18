import Landing from "@/components/Home/Landing"
import { MotionConfig } from "framer-motion"

export default function Home() {
    return (
        <>
            <MotionConfig transition={{ duration: 0.2, ease: "easeInOut" }} reducedMotion="always">
                <Landing />
            </MotionConfig>
        </>
    )
}
