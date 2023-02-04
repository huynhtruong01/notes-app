import { DataNote } from '../../../../types'
import { NoteItem } from '../NoteItem'
import styles from './NoteList.module.css'

export interface INoteListProps {
    noteList: DataNote[]
}

export function NoteList({ noteList }: INoteListProps) {
    return (
        <>
            {noteList.length === 0 && <div>Note empty...</div>}
            {noteList.length > 0 && (
                <div className={styles.noteList}>
                    {noteList.map((note: DataNote) => (
                        <NoteItem key={note.id} note={note} />
                    ))}
                </div>
            )}
        </>
    )
}
