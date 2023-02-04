import { useContext, useEffect, useState } from 'react'
import { DataNote, DataNoteFilters } from '../../types'
import { NoteFilters, NoteList } from './components'
import { NoteActionTypes, setNoteList } from './context'
import { NoteContext } from './context/NoteProvider'
import styles from './Note.module.css'

export function Note() {
    const [filters, setFilters] = useState<DataNoteFilters>({
        search: '',
        isShowSave: false,
    })
    const { state, dispatch } = useContext(NoteContext)
    const { noteList, noteFilterList } = state

    useEffect(() => {
        const newNoteFilters: DataNote[] = noteList.filter((note: DataNote) => {
            const hasGetSave = filters.isShowSave
                ? note.isSave === filters.isShowSave
                : true

            return (
                hasGetSave &&
                note.title.toLowerCase().includes(filters.search.toLowerCase())
            )
        })

        dispatch(setNoteList(NoteActionTypes.SET_NOTE_FILTERS_LIST, newNoteFilters))
    }, [state.noteList, filters])

    const handleFiltersChange = (filters: DataNoteFilters) => {
        setFilters(filters)
    }

    return (
        <div className={styles.note}>
            <h3 className={styles.noteTitle}>Notes</h3>
            <NoteFilters filters={filters} onChange={handleFiltersChange} />
            <NoteList noteList={noteFilterList} />
        </div>
    )
}
