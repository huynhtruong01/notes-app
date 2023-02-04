export interface DataNote {
    id?: number
    title: string
    description: string
    dateTime: Date
    color: string
    isSave: boolean
}

export interface DataNoteFilters {
    isShowSave: boolean
    search: string
}

export interface DataNoteForm {
    title: string
}
