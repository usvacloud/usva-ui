import JSZip from "jszip"
import { Readable } from "stream"

export async function archive(files: File[]): Promise<Blob> {
    const jsStream = JSZip()
    await Promise.all(
        files.map(async (file) => {
            console.log(file.name)
            jsStream.file(file.name, await file.arrayBuffer())
        })
    )

    const conte = await jsStream.generateAsync({ type: "blob" })
    return conte
}
