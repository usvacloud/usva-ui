import { Dispatch, RefObject, SetStateAction } from "react"
import { humanReadableSize } from "utils/units"

export type FileInitMetas = {
    filename: string
    size: string
    id: number
    type: string
}[]

// Handle everything related to file manipulation.
// Implements custom way for manipulating files afterwards with
// files still containing their metadata
export class FileHandler {
    files: File[]
    metas: [FileInitMetas, Dispatch<SetStateAction<FileInitMetas>>]

    constructor(metas: [FileInitMetas, Dispatch<SetStateAction<FileInitMetas>>]) {
        this.metas = metas
        this.files = []

        this.add = this.add.bind(this)
        this.sync = this.sync.bind(this)
        this.removeFile = this.removeFile.bind(this)
        this.reset = this.reset.bind(this)
    }

    // Function which opens the file upload prompt
    add(file: File | null | undefined) {
        if (!file) return

        const st = this.files.filter((f) => f.lastModified === file.lastModified).length > 0
        if (st) return

        this.metas[1]((previous) => [
            ...previous,
            {
                filename: file.name,
                size: humanReadableSize(file.size),
                id: this.files.length + 1,
                type: file.type,
            },
        ])
        this.files = this.files.concat(file)
    }

    sync(ref: RefObject<HTMLInputElement>) {
        const htmlFiles = ref.current?.files
        if (!htmlFiles) return

        for (let i = 0; i < htmlFiles.length; i++) this.add(htmlFiles.item(i))
    }

    removeFile(i: number) {
        let f = this.files
        f.splice(i, 1)
        this.files = f
    }

    reset() {
        this.metas[1]([])
        this.files = []
    }
}
