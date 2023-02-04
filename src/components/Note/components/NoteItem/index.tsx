import { posToDOMRect } from '@tiptap/react'
import debounce from 'lodash.debounce'
import { ChangeEvent, useCallback, useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { DataNote, DataNoteForm } from '../../../../types'
import { convertDate } from '../../../../utils'
import { highlightText } from '../../../../utils/highlightText'
import { NoteActionTypes } from '../../context'
import {
    deleteNote,
    setNoteDetail,
    showModal,
    updateNote,
} from '../../context/actionCreators'
import { NoteContext } from '../../context/NoteProvider'
import styles from './NoteItem.module.css'

export interface INoteItemProps {
    note: DataNote
}

export function NoteItem({ note }: INoteItemProps) {
    const [value, setValue] = useState<string>(note.description)
    const [isSave, setIsSave] = useState<boolean>(note.isSave)
    const { state, dispatch } = useContext(NoteContext)
    const { search } = state

    const handleUpdateNote = (value: string) => {
        const newNote: DataNote = {
            ...note,
            description: value,
        }

        dispatch(updateNote(newNote))
    }

    // const debounce = (cb: any, time: number = 1000) => {
    //     let timer: null | number = null
    //     if (timer) clearTimeout(timer)
    //     timer = setTimeout(cb, time)
    // }

    const debounceUpdate = useCallback(
        debounce((value: string) => handleUpdateNote(value), 1000),
        []
    )

    const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value: string = e.target.value

        debounceUpdate(value)
        setValue(value)
    }

    const handleDeleteNote = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You delete note "${note.title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                if (note.id) {
                    dispatch(deleteNote(note.id))
                }
                Swal.fire(
                    'Deleted!',
                    `Note "${note.title}" delete successfully.`,
                    'success'
                )
            }
        })
    }

    const handleToggleSave = () => {
        const newNote: DataNote = {
            ...note,
            isSave: !isSave,
        }

        dispatch(updateNote(newNote))
        setIsSave((prev: boolean) => !prev)
    }

    const handleSetNoteDetail = () => {
        dispatch(setNoteDetail(NoteActionTypes.NOTE_DETAIL, note))
        dispatch(showModal(NoteActionTypes.SHOW_MODAL_NOTE, true))
    }

    return (
        <div className={styles.noteItem} style={{ backgroundColor: note.color }}>
            <div className={styles.noteItemHeader}>
                <h4
                    dangerouslySetInnerHTML={{
                        __html: highlightText(note.title, search),
                    }}
                ></h4>
                <button className={styles.noteItemBtnStar} onClick={handleToggleSave}>
                    {!isSave && <i className="fa-regular fa-star"></i>}
                    {isSave && (
                        <i className={`fa-solid fa-star ${styles.noteItemStarSave}`}></i>
                    )}
                </button>
            </div>
            <textarea
                cols={25}
                rows={14}
                className={styles.noteItemText}
                value={value}
                onChange={handleValueChange}
            />
            <div className={styles.noteItemFeatures}>
                <div>
                    <span className={styles.noteItemTime}>
                        {convertDate(note.dateTime)}
                    </span>
                </div>
                <div className={styles.noteButtons}>
                    <button
                        className={`${styles.noteButton} ${styles.noteButtonEdit}`}
                        onClick={handleSetNoteDetail}
                    >
                        <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                        className={`${styles.noteButton} ${styles.noteButtonDelete}`}
                        onClick={handleDeleteNote}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
