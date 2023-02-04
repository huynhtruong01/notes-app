import { NOTE_LIST } from '../../../environments'
import { DataNote } from '../../../types'
import { LS } from '../../../utils'
import { DataNoteForm } from './../../../types/note'
import { NoteActions } from './actions'
import { NoteActionTypes } from './actionTypes'

export interface DataInitValues {
    noteList: DataNote[]
    noteFilterList: DataNote[]
    showModalNote: boolean
    noteDetail: DataNote
    search: string
}

export const initValues: DataInitValues = {
    noteList: LS.getLS(NOTE_LIST),
    noteFilterList: LS.getLS(NOTE_LIST),
    showModalNote: false,
    noteDetail: {
        id: undefined,
        title: '',
        description: '',
        dateTime: new Date(),
        isSave: false,
        color: '',
    },
    search: '',
}

function reducers(
    state: DataInitValues = initValues,
    action: NoteActions
): DataInitValues {
    switch (action.title) {
        case NoteActionTypes.SET_NOTE_LIST:
            return { ...state, noteList: [...action.payload] }
        case NoteActionTypes.SET_NOTE_FILTERS_LIST:
            return { ...state, noteFilterList: [...action.payload] }
        case NoteActionTypes.SHOW_MODAL_NOTE:
            return { ...state, showModalNote: action.payload }
        case NoteActionTypes.NOTE_DETAIL:
            return { ...state, noteDetail: { ...action.payload } }
        case NoteActionTypes.SEARCH_NOTE:
            return { ...state, search: action.payload }
        case NoteActionTypes.ADD_NOTE: {
            const newNoteList: DataNote[] = [...state.noteList, action.payload]
            LS.setLS(NOTE_LIST, newNoteList)

            return { ...state, noteList: newNoteList }
        }
        case NoteActionTypes.UPDATE_NOTE: {
            const index: number = state.noteList.findIndex(
                (note: DataNote) => action.payload.id === note.id
            )

            if (index >= 0) {
                state.noteList[index] = action.payload
                LS.setLS(NOTE_LIST, state.noteList)
            }

            return { ...state, noteList: [...state.noteList] }
        }
        case NoteActionTypes.DELETE_NOTE: {
            const index: number = state.noteList.findIndex(
                (note: DataNote) => action.payload === note.id
            )

            if (index >= 0) {
                state.noteList.splice(index, 1)
                LS.setLS(NOTE_LIST, state.noteList)
            }

            const newNoteList: DataNote[] = [...state.noteList]

            return { ...state, noteList: newNoteList }
        }
        default:
            return state
    }
}

export default reducers
