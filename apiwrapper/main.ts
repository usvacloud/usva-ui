import { NextFetchEvent } from "next/server"
import config from "../config"

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
    FileNotCreated: new Error("File was not uploaded"),
    FileNotFound: new Error("File was not found"),
    PermissionDenied: new Error("Permission was denied"),
    RequestFailed: new Error("Request failed"),
}

export class ApiWrapper {
    baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl ?? config.api_base
    }

    async getFile(uuid: string): Promise<FileInformation | Error> {
        const req = await fetch(`${this.baseUrl}/file/info?filename=${uuid}`)
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

    async newFile(file: File, options?: FileUploadOptions): Promise<string | Error> {
        const fd = new FormData()
        fd.append("file", file)
        if (options?.title) fd.append("title", options.title)

        let request: {
            req?: Response
            body?: any
        } = {}

        try {
            const req = await fetch(`${this.baseUrl}/file/upload`, {
                method: "POST",
                body: fd,
            })
            request.req = req
            request.body = await req.json()
        } catch (_) {
            return Errors.FileNotCreated
        }

        if (!request?.req?.ok ?? !request?.body?.filename) {
            return Errors.FileNotCreated
        }

        return request.body["filename"]
    }
}
