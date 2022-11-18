import React from "react"
import { FaFile, FaFileArchive, FaFileImage, FaImage, FaRegFileArchive } from "react-icons/fa"

export default function IconByExtension(props: { type: string }) {
    switch (true) {
        case props.type.includes("application"):
            return <FaFileArchive />
        case props.type.includes("image"):
            return <FaFileImage />
        default:
            return <FaFile />
    }
}
