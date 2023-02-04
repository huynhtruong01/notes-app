export const highlightText = (value: string, search: string): string => {
    if (!search) return value
    const re = new RegExp('\\b(' + search.toLowerCase() + '\\b)', 'igm')
    value = value.replace(re, '<span class="highlighted-text">$&</span>')
    return value
}
