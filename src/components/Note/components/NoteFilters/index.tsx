import debounce from 'lodash.debounce'
import { useCallback, useContext } from 'react'
import { DataNoteFilters } from '../../../../types'
import { NoteActionTypes, NoteContext, setSearch } from '../../context'
import styles from './NoteFilters.module.css'

export interface INoteFiltersProps {
    filters: DataNoteFilters
    onChange: (filters: DataNoteFilters) => void
}

export function NoteFilters({ filters, onChange }: INoteFiltersProps) {
    const { dispatch } = useContext(NoteContext)

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
                className={`${styles.noteFiltersBtnSave} ${
                    filters.isShowSave ? styles.active : ''
                }`}
                onClick={handleSaveFilterClick}
            >
                <>
                    {!filters.isShowSave && <i className="fa-regular fa-bookmark"></i>}
                    {filters.isShowSave && <i className="fa-solid fa-bookmark"></i>}
                </>
                Save
            </button>
        </div>
    )
}
