import { Stream } from "stream"
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios"
import appconfig from "../../../config"

export type FileUploadOptions = {
    title?: string
    password?: string
    encrypt?: boolean
}

export type FileInformation = {
    filename: string
    locked: boolean
    size: number
    title: { String: string; Valid: boolean }
    uploadDate: Date
    viewCount: number
}

export type RestrictionSizes = {
    bytes: number
    gigabytes: number
    kilobytes: number
    megabytes: number
}

export type Restrictions = {
    filePersistDuration: {
        days: number
        hours: number
        seconds: number
    }
    maxDailyUploadSize: RestrictionSizes
    maxEncryptedFileSize: RestrictionSizes
    maxSingleUploadSize: RestrictionSizes
}

export const Errors = {
    FileNotCreated: Error("File was not uploaded"),
    FileNotFound: Error("File was not found"),
    PermissionDenied: Error("Permission was denied"),
    RequestFailed: Error("Request failed"),
    TooBigFile: Error("Your file is too big!", {
        cause: "Awh! The server said that your file is too big and rejected your request.",
    }),
    TooMuchTraffic: Error("Too much traffic!", {
        cause: `Server's antidefense rejected your request because there was too many expensive requests from your identifier.  
        Please try again soon, this usually doesn't last long.`,
    }),
}

export class ApiWrapper {
    constructor() {}

    async getRestrictions(): Promise<Restrictions | Error> {
        const restrictions = await this.makeRequest(`${appconfig.api_base}/restrictions`)
        if (restrictions instanceof Error) {
            return restrictions
        }

        return restrictions.data
    }

    async getFileInformation(uuid: string, password: string | undefined): Promise<FileInformation | Error> {
        let headers = undefined

        if (password)
            headers = {
                Authorization: `Bearer ${Buffer.from(password, "base64").toString("hex")}`,
            }

        const req = await this.makeRequest(`${appconfig.api_base}/file/info?filename=${uuid}`, {
            withCredentials: true,
            headers,
        })
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

        return {
            filename: req.data["filename"],
            locked: req.data["locked"],
            size: req.data["size"],
            title: req.data["title"],
            uploadDate: new Date(req.data["uploadDate"]),
            viewCount: req.data["viewCount"],
        }
    }

    async newFile(file: File, options?: FileUploadOptions, reqStream?: Stream): Promise<string | Error> {
        const fd = new FormData()
        fd.append("file", file)

        if (options?.title) fd.append("title", options.title)
        if (options?.encrypt) fd.append("can_encrypt", "yes")
        if (options?.password) fd.append("password", Buffer.from(options.password, "base64").toString("hex"))
        const req = await this.makeRequest(`${appconfig.api_base}/file/upload`, {
            method: "POST",
            data: fd,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress(progressEvent) {
                reqStream?.emit("progress", progressEvent)
            },
        })
        if (req instanceof Error) return req

        if (!Object.keys(req.data).includes("filename")) return Errors.FileNotCreated
        return req.data["filename"]
    }

    async sendFeedback(body: { message: string | null; boxes: number[] }): Promise<void | Error> {
        const req = await this.makeRequest(`${appconfig.api_base}/feedback/`, {
            method: "POST",
            data: JSON.stringify(body),
        })

        if (req instanceof Error) return req
        return
    }

    private async makeRequest(
        input: string,
        init?: AxiosRequestConfig | undefined
    ): Promise<AxiosResponse | Error> {
        try {
            return await axios(input, init)
        } catch (e) {
            if (!(e instanceof AxiosError)) return Error("API is not available")
            switch (e.response?.status) {
                case 401:
                case 403:
                    return Errors.PermissionDenied
                case 404:
                    return Errors.FileNotFound
                case 413:
                    return Errors.TooBigFile
                case 429:
                    return Errors.TooMuchTraffic
                default:
                    return Errors.RequestFailed
            }
        }
    }
}

export const defaultWrapper = new ApiWrapper()
