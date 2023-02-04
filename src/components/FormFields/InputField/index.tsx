import { Controller } from 'react-hook-form'
import styles from './InputField.module.css'

export interface IInputFieldProps {
    form: any
    name: string
    label: string
    placeholder?: string
}

export function InputField({ form, name, label, placeholder = '' }: IInputFieldProps) {
    const { control, formState } = form
    const { errors } = formState

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <div
                    className={`${styles.inputField} ${errors[name] ? styles.error : ''}`}
                >
                    <label htmlFor={name}>{label}</label>
                    <input
                        type="text"
                        id={name}
                        onChange={onChange}
                        value={value}
                        placeholder={placeholder}
                    />
                    <small>{errors[name] && errors?.[name].message}</small>
                </div>
            )}
        />
    )
}
