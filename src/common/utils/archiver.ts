import JSZip from "jszip"
import { Stream } from "stream"

export async function archive(files: File[], stream: Stream): Promise<Blob> {
    const jsStream = JSZip()
    const f = files.map(async (file) => {
        jsStream.file(file.name, await file.arrayBuffer())
        stream.emit("add", file)
    })
    await Promise.all(f)

    const conte = await jsStream.generateAsync({ type: "blob" })
    return conte
}
