import { RefObject } from "react"
import { humanReadableSize } from "src/common/utils/units"

export type FileInitMeta = {
    filename: string
    size: string
    id: number
    type: string
    rawsize: number
}

// Handle everything related to file manipulation.
// Implements custom way for manipulating files afterwards with
// files still containing their metadata
export class FileHandler {
    files: File[]

    constructor() {
        this.files = []

        this.add = this.add.bind(this)
        this.sync = this.sync.bind(this)
        this.removeFile = this.removeFile.bind(this)
        this.reset = this.reset.bind(this)
    }

    // Function which opens the file upload prompt
    add(file: File | null | undefined): FileInitMeta | undefined {
        if (!file) return

        const st = this.files.filter((f) => f.lastModified === file.lastModified).length > 0
        if (st) return

        this.files = this.files.concat(file)
        return {
            filename: file.name,
            id: this.files.length - 1,
            size: humanReadableSize(file.size),
            type: file.type,
            rawsize: file.size,
        }
    }

    sync(ref: RefObject<HTMLInputElement>): FileInitMeta[] | undefined {
        let fm: FileInitMeta[] = []

        const htmlFiles = ref.current?.files
        if (!htmlFiles) return fm

        for (let i = 0; i < htmlFiles.length; i++) {
            const file = this.add(htmlFiles.item(i))
            if (file) fm.push(file)
        }

        return fm
    }

    removeFile(i: number) {
        let tmpfiles = this.files
        tmpfiles.splice(i, 1)
        this.files = tmpfiles
    }

    reset() {
        this.files = []
    }
}
