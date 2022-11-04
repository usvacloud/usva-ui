import { Pack, pack } from "tar-stream"

export class Archiver {
    private tarStream: Pack
    private fileReader: FileReader

    constructor() {
        this.tarStream = pack()
        this.fileReader = new FileReader()
    }

    async archive(this: Archiver, files: File[]): Promise<File> {
        await Promise.all(files.map(this.addFileCallback()))
        this.tarStream.finalize()

        return new File([await this.tarStream.read()], "tarfolder.tar")
    }

    private addFileCallback() {
        return async (file: File) => await this.addFile(file)
    }

    // FIXME: doesn't support images, they corrupt for some reason.
    // perhaps it'll be smart to write file to "tarStream" 
    // as binary?
    private async addFile(file: File): Promise<void> {
        return new Promise(async (resolve, _) => {
            this.fileReader.onload = (event) => {
                const result = event.target?.result as string
                this.tarStream.entry({ name: file.name }, result)
                resolve(undefined)
            }
            this.fileReader.readAsText(file)
        })
    }
}