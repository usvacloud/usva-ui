export function isTitleValidCallback(title: string | undefined) {
    if (title && title.length > 32) return false
    return true
}
