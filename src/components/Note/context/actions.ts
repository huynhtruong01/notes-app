import { DataNote } from '../../../types'
import { NoteActionTypes } from './actionTypes'

export interface SetNoteList {
    title: NoteActionTypes.SET_NOTE_LIST
    payload: DataNote[]
}

export interface SetNoteFiltersList {
    title: NoteActionTypes.SET_NOTE_FILTERS_LIST
    payload: DataNote[]
}

export interface SetNoteDetail {
    title: NoteActionTypes.NOTE_DETAIL
    payload: DataNote
}

export interface SetSearchNote {
    title: NoteActionTypes.SEARCH_NOTE
    payload: string
}

export interface AddNote {
    title: NoteActionTypes.ADD_NOTE
    payload: DataNote
}

export interface UpdateNote {
    title: NoteActionTypes.UPDATE_NOTE
    payload: DataNote
}

export interface DeleteNote {
    title: NoteActionTypes.DELETE_NOTE
    payload: number
}

export interface ShowModalNote {
    title: NoteActionTypes.SHOW_MODAL_NOTE
    payload: boolean
}

export type NoteActions =
    | SetNoteList
    | SetNoteFiltersList
    | AddNote
    | UpdateNote
    | DeleteNote
    | ShowModalNote
    | SetNoteDetail
    | SetSearchNote
