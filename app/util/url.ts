export const urlJoin = (...paths: string[]): string => {
    return paths.join('/').replace(/\/{2,}/g, '/')
}
