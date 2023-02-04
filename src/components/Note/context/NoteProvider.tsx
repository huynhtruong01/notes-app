import { createContext, ReactNode, useReducer } from 'react'
import reducers, { DataInitValues, initValues } from './reducers'

export interface INoteProviderProps {
    children: ReactNode
}

export const NoteContext = createContext<{
    state: DataInitValues
    dispatch: any
}>({
    state: initValues,
    dispatch: () => undefined,
})

export function NoteProvider({ children }: INoteProviderProps) {
    const [state, dispatch] = useReducer(reducers, initValues)

    return (
        <NoteContext.Provider value={{ state, dispatch }}>
            {children}
        </NoteContext.Provider>
    )
}
