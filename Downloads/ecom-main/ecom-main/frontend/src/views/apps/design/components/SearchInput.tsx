import { useState, useEffect } from 'react'
import CustomTextField from '@core/components/mui/TextField'

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
}

export const SearchInput = ({
  value: initialValue,
  onChange,
  debounce = 500
}: SearchInputProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <CustomTextField
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder='search...'
      sx={{ width: 300 }}
    />
  )
} 