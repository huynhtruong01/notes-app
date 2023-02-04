import { DataNote } from '../../../types'
import { DataNoteForm } from './../../../types/note'
import { NoteActionTypes } from './actionTypes'

export const setNoteList = (title: string, payload: DataNote[]) => {
    return {
        title,
        payload,
    }
}

export const showModal = (title: string, payload: boolean) => {
    return {
        title,
        payload,
    }
}

export const setNoteDetail = (title: string, payload: DataNote) => {
    return {
        title,
        payload,
    }
}

export const resetNoteDetail = () => {
    return {
        title: NoteActionTypes.NOTE_DETAIL,
        action: {
            title: '',
        },
    }
}

export const setSearch = (title: string, payload: string) => {
    return {
        title,
        payload,
    }
}

export const addNote = (payload: DataNote) => {
    return {
        title: NoteActionTypes.ADD_NOTE,
        payload,
    }
}

export const updateNote = (payload: DataNote) => {
    return {
        title: NoteActionTypes.UPDATE_NOTE,
        payload,
    }
}

export const deleteNote = (payload: number) => {
    return {
        title: NoteActionTypes.DELETE_NOTE,
        payload,
    }
}
