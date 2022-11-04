import config from "../config"

export type FileUploadOptions = {
    encrypted?: Boolean,
    title?: String,
}

export const Errors = {
    FileNotCreated: new Error("File was not uploaded")
}

export class ApiWrapper {
    baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl ?? config.api_base
    } 

    async newFile(this: ApiWrapper, file: File, options?: FileUploadOptions|undefined): Promise<string|Error> {
        const fd = new FormData()
        fd.append("file", file)

        let request: {
            req?: Response
            body?: any
        } = {}

        try {
            const req = await fetch(`${this.baseUrl}/file/upload`, {
                method: "POST",
                body: fd
            })
            request.req = req
            request.body = await req.json()
        } catch(_) {
            return Errors.FileNotCreated
        }

        if (!request?.req?.ok ?? !request?.body?.filename) {
            return Errors.FileNotCreated
        }

        return request.body["filename"]
    }

}