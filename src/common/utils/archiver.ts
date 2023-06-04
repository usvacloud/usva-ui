import JSZip from "jszip"
import { Stream } from "stream"

export async function archive(files: File[], stream: Stream): Promise<Blob> {
    const jsStream = JSZip()
    const f = files.map(async (file) => {
        jsStream.file(file.name, await file.arrayBuffer())
        stream.emit("add", file)
    })
    try {
        await Promise.all(f)
    } catch (e) {
        console.error(e)
    }

    const conte = await jsStream.generateAsync({ type: "blob" })
    return conte
}
