import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { DataNote, DataNoteForm } from '../../../types'
import { InputField } from '../../FormFields'
import {
    NoteActionTypes,
    NoteContext,
    resetNoteDetail,
    showModal,
} from '../../Note/context'
import styles from './ModalNoteForm.module.css'

export interface IModalNoteFormProps {
    onEditOrAddNote: (title: string, note?: DataNote) => void
}

export function ModalNoteForm({ onEditOrAddNote }: IModalNoteFormProps) {
    const { state, dispatch } = useContext(NoteContext)
    const { showModalNote, noteDetail } = state

    const schema = yup.object().shape({
        title: yup
            .string()
            .required('Please enter title.')
            .test(
                'at-least-one-word',
                'Please enter at least one word.',
                (value: string | undefined) => {
                    if (!value) return false
                    return (
                        value.split(' ').filter((x: string) => !!x && x.length > 1)
                            .length > 0
                    )
                }
            ),
    })

    useEffect(() => {
        if (noteDetail.id) {
            form.setValue('title', noteDetail.title)
        }

        if (showModalNote) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [noteDetail, showModalNote])

    const form = useForm<DataNoteForm>({
        defaultValues: {
            title: noteDetail.title,
        },
        resolver: yupResolver(schema),
    })

    const handleNoteSubmit = (values: DataNoteForm) => {
        if (noteDetail.id) {
            onEditOrAddNote(values.title, noteDetail)
        } else {
            onEditOrAddNote(values.title)
        }
        form.reset()
    }

    const handleCloseModalNote = () => {
        dispatch(resetNoteDetail())
        dispatch(showModal(NoteActionTypes.SHOW_MODAL_NOTE, false))
        form.reset()
    }

    return (
        <>
            {showModalNote && (
                <div
                    className={styles.modalNote}
                    onSubmit={form.handleSubmit(handleNoteSubmit)}
                >
                    <form className={styles.modalNoteForm}>
                        <h2>
                            {!noteDetail.id && 'Add Note'}
                            {noteDetail.id && 'Update Note'}
                        </h2>
                        <button
                            type="button"
                            className={styles.modalNoteFormBtnClose}
                            onClick={handleCloseModalNote}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div>
                            <InputField
                                form={form}
                                name="title"
                                label="Title"
                                placeholder="Enter title..."
                            />
                        </div>
                        <div>
                            {!noteDetail.id && (
                                <button
                                    type="submit"
                                    className={`${styles.modalNoteBtn} ${styles.modalNoteFormBtnAdd}`}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                    Add
                                </button>
                            )}
                            {noteDetail.id && (
                                <button
                                    type="submit"
                                    className={`${styles.modalNoteBtn} ${styles.modalNoteFormBtnUpdate}`}
                                >
                                    <i className="fa-solid fa-pen"></i>
                                    Update
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}
