import { useContext, useState } from 'react'
import styles from './App.module.css'
import { ModalNoteForm, Note, Sidebar } from './components'
import {
    addNote,
    initValues,
    NoteActionTypes,
    NoteContext,
    resetNoteDetail,
    showModal,
    updateNote,
} from './components/Note/context'
import { DataNote } from './types'

function App() {
    const [color, setColor] = useState<string | null>(null)
    const { state, dispatch } = useContext(NoteContext)
    const { noteDetail } = state

    const handleAddNote = (title: string) => {
        if (color) {
            const newNote: DataNote = {
                id: Date.now(),
                title,
                description: '',
                dateTime: new Date(),
                isSave: false,
                color,
            }

            dispatch(addNote(newNote))
        }
    }

    const handleUpdateNote = (title: string, note: DataNote) => {
        const newNote: DataNote = {
            ...note,
            title,
        }

        dispatch(updateNote(newNote))
    }

    const handleEditOrAddNote = (
        title: string,
        note: DataNote = initValues.noteDetail
    ) => {
        if (!noteDetail.id) {
            handleAddNote(title)
        } else {
            handleUpdateNote(title, note)
        }

        dispatch(showModal(NoteActionTypes.SHOW_MODAL_NOTE, false))
        dispatch(resetNoteDetail())
        setColor(null)
    }

    return (
        <main>
            <div className={styles.container}>
                <div className={styles.containerSidebar}>
                    <Sidebar setColor={setColor} />
                </div>
                <Note />
            </div>
            <ModalNoteForm onEditOrAddNote={handleEditOrAddNote} />
        </main>
    )
}

export default App
