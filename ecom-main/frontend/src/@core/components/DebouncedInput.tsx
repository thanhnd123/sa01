import React, { useState, useEffect, useCallback, useRef } from 'react';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

interface DebouncedInputProps extends Omit<TextFieldProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
  className?: string;
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value,
  onChange,
  debounceMs = 300,
  className,
  ...textFieldProps
}) => {
  const [inputValue, setInputValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const debouncedOnChange = useCallback((newValue: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
          onChange(newValue);
        }, debounceMs);
  }, [onChange, debounceMs]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <TextField
      {...textFieldProps}
      value={inputValue}
      onChange={handleChange}
      className={className}
    />
  );
};

export default DebouncedInput; 