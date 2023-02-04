const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export const formatDate = (date: Date): string => {
    const dateConvert = new Date(date)
    const date$: number = dateConvert.getDate()
    const month: number = dateConvert.getMonth()
    const year: number = dateConvert.getFullYear()

    return `${date$} ${months[month]} ${year}`
}

export const formatTime = (date: Date): string => {
    const dateConvert = new Date(date)
    const hours: string = `0${dateConvert.getHours()}`.slice(-2)
    const minutes: string = `0${dateConvert.getMinutes()}`.slice(-2)
    const checkTimeConvert: string = Number.parseInt(hours) > 12 ? 'PM' : 'AM'

    return `${hours}:${minutes} ${checkTimeConvert}`
}

export const convertDate = (date: Date): string => {
    return `${formatTime(date)} - ${formatDate(date)}`
}
