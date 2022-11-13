import appconfig from "../config"

export type FileUploadOptions = {
    encrypted?: boolean
    title?: string
}

export type FileInformation = {
    encrypted: boolean
    filename: string
    locked: boolean
    size: number
    title: string
    uploadDate: Date
    viewCount: number
}

export const Errors = {
    FileNotCreated: Error("File was not uploaded"),
    FileNotFound: Error("File was not found"),
    PermissionDenied: Error("Permission was denied"),
    RequestFailed: Error("Request failed"),
}

export class ApiWrapper {
    constructor() {}

    async getFileInformation(uuid: string): Promise<FileInformation | Error> {
        const req = await this.makeRequest(`${appconfig.api_base}/file/info?filename=${uuid}`)
        if (req instanceof Error) return req

        switch (req.status) {
            case 200:
                break
            case 401:
            case 403:
                return Errors.PermissionDenied
            case 404:
                return Errors.FileNotFound
            default:
                return Errors.RequestFailed
        }

        const reqjson = await req.json()
        return {
            encrypted: reqjson["encrypted"],
            filename: reqjson["filename"],
            locked: reqjson["locked"],
            size: reqjson["size"],
            title: reqjson["title"],
            uploadDate: new Date(reqjson["uploadDate"]),
            viewCount: reqjson["viewCount"],
        }
    }

    async downloadFile(uuid: string): Promise<Response | Error> {
        const req = await this.makeRequest(`${appconfig.api_base}/file/?filename=${uuid}`)
        if (!(req instanceof Error) && !req.body) return Error("File could not be downloaded")
        return req
    }

    async newFile(file: File, options?: FileUploadOptions): Promise<string | Error> {
        const fd = new FormData()
        fd.append("file", file)
        if (options?.title) fd.append("title", options.title)
        const requestinit = {
            method: "POST",
            body: fd,
        }

        const req = await this.makeRequest(`${appconfig.api_base}/file/upload`, requestinit)
        if (req instanceof Error) return req
        const rbd = await req.json()

        if (!req?.ok || !Object.keys(rbd).includes("filename")) return Errors.FileNotCreated
        return rbd["filename"]
    }

    private async makeRequest(input: RequestInfo, init?: RequestInit | undefined): Promise<Response | Error> {
        try {
            const req = await fetch(input, init)
            if (req.ok) return req

            switch (req.status) {
                case 401:
                case 403:
                    return Errors.PermissionDenied
                case 404:
                    return Errors.FileNotFound
                default:
                    return Errors.RequestFailed
            }
        } catch (e) {
            return Error("Request returned an exception")
        }
    }
}

export const defaultWrapper = new ApiWrapper()
