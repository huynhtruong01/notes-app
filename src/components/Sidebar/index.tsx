import { useContext, useState } from 'react'
import { colorDataList } from '../../utils'
import { NoteActionTypes, NoteContext, showModal } from '../Note/context'
import styles from './Sidebar.module.css'

export interface ISidebarProps {
    setColor: React.Dispatch<React.SetStateAction<string | null>>
}

export function Sidebar({ setColor }: ISidebarProps) {
    const { dispatch } = useContext(NoteContext)
    const [show, setShow] = useState<boolean>(false)
    const colorList = colorDataList

    const handleToggleShow = () => {
        setShow((prev: boolean) => !prev)
    }

    const handleSetColor = (color: string) => {
        dispatch(showModal(NoteActionTypes.SHOW_MODAL_NOTE, true))
        setColor(color)
        setShow(false)
    }

    return (
        <div className={styles.sidebar}>
            <div
                className={`${styles.sidebarAddIcon} ${show ? styles.show : ''}`}
                onClick={handleToggleShow}
            >
                <i className="fa-solid fa-plus"></i>
            </div>
            <div className={styles.sidebarList}>
                {colorList.map((color: string, index: number) => (
                    <div
                        key={color}
                        className={`${styles.sidebarListItem} ${
                            show ? styles.active : ''
                        }`}
                        style={{
                            backgroundColor: `${color}`,
                        }}
                        onClick={() => handleSetColor(color)}
                    ></div>
                ))}
            </div>
        </div>
    )
}
