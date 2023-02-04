import debounce from 'lodash.debounce'
import { useCallback, useContext } from 'react'
import Swal from 'sweetalert2'
import { NOTE_LIST } from '../../../../environments'
import { DataNoteFilters } from '../../../../types'
import { LS } from '../../../../utils'
import { NoteActionTypes, NoteContext, setNoteList, setSearch } from '../../context'
import styles from './NoteFilters.module.css'

export interface INoteFiltersProps {
    filters: DataNoteFilters
    onChange: (filters: DataNoteFilters) => void
}

export function NoteFilters({ filters, onChange }: INoteFiltersProps) {
    const { state, dispatch } = useContext(NoteContext)
    const { noteList } = state

    const handleSaveFilterClick = () => {
        const newFilters: DataNoteFilters = {
            ...filters,
            isShowSave: !filters.isShowSave,
        }

        onChange(newFilters)
    }

    const handleSearchNote = (value: string) => {
        const newFilters: DataNoteFilters = {
            ...filters,
            search: value,
        }

        onChange(newFilters)
        dispatch(setSearch(NoteActionTypes.SEARCH_NOTE, value))
    }

    const debounceSearch = useCallback(
        debounce((value: string) => handleSearchNote(value), 1000),
        []
    )

    const handleDeleteAll = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete all?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // dispatch note list empty
                dispatch(setNoteList(NoteActionTypes.SET_NOTE_FILTERS_LIST, []))
                dispatch(setNoteList(NoteActionTypes.SET_NOTE_LIST, []))

                // set localstorage note list empty
                LS.removeLS(NOTE_LIST)
                Swal.fire('Deleted', 'Your note has been deleted.', 'success')
            }
        })
    }

    return (
        <div className={styles.noteFilters}>
            <div className={styles.noteFiltersSearch}>
                <input
                    type="text"
                    placeholder="Enter title..."
                    onChange={(e) => debounceSearch(e.target.value)}
                />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <button
                className={`${styles.noteFiltersBtn} ${styles.noteFiltersBtnSave} ${
                    filters.isShowSave ? styles.active : ''
                } ${noteList.length === 0 ? styles.disabled : ''}`}
                onClick={handleSaveFilterClick}
                disabled={noteList.length === 0}
            >
                <>
                    {!filters.isShowSave && <i className="fa-regular fa-bookmark"></i>}
                    {filters.isShowSave && <i className="fa-solid fa-bookmark"></i>}
                </>
                Save
            </button>
            <button
                className={`${styles.noteFiltersBtn} ${styles.noteFiltersBtnDeleteAll} ${
                    noteList.length === 0 ? styles.disabled : ''
                }`}
                onClick={handleDeleteAll}
                disabled={noteList.length === 0}
            >
                <i className="fa-solid fa-trash"></i>
                Delete All
            </button>
        </div>
    )
}
