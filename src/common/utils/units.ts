export function humanReadableSize(bytes: number): string {
    const sizes = {
        GB: 1000000000,
        MB: 1000000,
        KB: 1000,
        Bytes: 1,
    }

    let added = false
    let sz = "Unknown size"
    Object.entries(sizes).map((val) => {
        if (added) return
        if (bytes / val[1] >= 1) {
            added = true
            sz = `${Math.floor(bytes / val[1])} ${val[0]}`
        }
    })

    return sz
}

export function humanReadableDate(date: Date): string {
    return date.toLocaleString()
}
