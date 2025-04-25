import React, { useState, useCallback } from 'react';
import { TextField, Autocomplete } from '@mui/material';

const SearchBar = ({ doctors, onSearch }) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const getFilteredOptions = useCallback(() => {
        if (!inputValue) return [];
        return doctors
            .filter(doctor =>
                doctor.name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .slice(0, 3)
            .map(doctor => doctor.name);
    }, [doctors, inputValue]);

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        if (!newInputValue) {
            onSearch('');
            setOpen(false);
        }
    };

    const handleChange = (event, newValue) => {
        if (newValue) {
            onSearch(newValue);
            setOpen(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && inputValue) {
            onSearch(inputValue);
            setOpen(false);
        }
    };

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            freeSolo
            options={getFilteredOptions()}
            value={inputValue}
            onChange={handleChange}
            onInputChange={handleInputChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search by doctor name"
                    placeholder="Type doctor name..."
                    variant="outlined"
                    fullWidth
                    onKeyPress={handleKeyPress}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white',
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                            '&::placeholder': {
                                color: 'rgba(255, 255, 255, 0.5)',
                                opacity: 1,
                            },
                        },
                    }}
                />
            )}
            renderOption={(props, option, state) => (
                <li {...props} key={option}>
                    {option}
                </li>
            )}
            noOptionsText="No doctors found"
        />
    );
};

export default SearchBar;
