export function HumanReadableSize(bytes: number) {
    const sizes = {
        GB: 1000000000,
        MB: 1000000,
        KB: 1000,
        Bytes: 1
    }

    let added = false
    const str = Object.entries(sizes).map(val => {
        if (added) return
        if ((bytes / val[1]) >= 1) {
            added = true
            return `${Math.floor(bytes / val[1])} ${val[0]} `
        }
    })

    return str
}