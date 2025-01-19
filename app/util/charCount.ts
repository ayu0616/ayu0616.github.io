/** 全角を2、半角を1として文字数をカウント */
export const charCount = (str: string): number => {
    let count = 0
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i)
        if (
            (c >= 0x0 && c < 0x81) ||
            c === 0xf8f0 ||
            (c >= 0xff61 && c < 0xffa0) ||
            (c >= 0xf8f1 && c < 0xf8f4)
        ) {
            count += 1
        } else {
            count += 2
        }
    }
    return count
}
