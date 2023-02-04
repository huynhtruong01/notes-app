export const LS = {
    setLS(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data))
    },
    getLS(key: string) {
        return JSON.parse(localStorage.getItem(key) || '[]')
    },
    removeLS(key: string) {
        localStorage.removeItem(key)
    },
}
