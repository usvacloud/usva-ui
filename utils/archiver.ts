import { Pack, pack } from "tar-stream"
import { gzipSync } from "react-zlib-js"

async function addFile(file: File, tarStream: Pack): Promise<void> {
    return new Promise(async (resolve, _) => {
        const fileReader = new FileReader()

        fileReader.onload = async (event) => {
            const result = event.target?.result as ArrayBuffer
            tarStream.entry({ name: file.name }, Buffer.from(result))
            resolve()
        }
        fileReader.readAsArrayBuffer(file)
    })
}

export async function archive(files: File[]): Promise<File> {
    const tarStream = pack()
    await Promise.all(files.map(async (file) => addFile(file, tarStream)))
    tarStream.finalize()

    const bfr = await gzipSync(Buffer.from(await tarStream.read()))

    return new File([bfr], "tarfolder.tar")
}
