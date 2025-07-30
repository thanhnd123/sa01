import React, { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'

interface DebouncedInputProps {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
}

export const DebouncedInput = React.memo(
  ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }: DebouncedInputProps & Omit<TextFieldProps, 'onChange'>) => {
    // States
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)

      return () => clearTimeout(timeout)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} />
  }
)

DebouncedInput.displayName = 'DebouncedInput'

export default DebouncedInput
