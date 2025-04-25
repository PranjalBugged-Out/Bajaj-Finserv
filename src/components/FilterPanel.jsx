import React from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Checkbox, FormGroup, Select, MenuItem, Typography, Divider, Paper } from '@mui/material';
import { LocalHospital, VideoCall, Sort } from '@mui/icons-material';

const FilterPanel = ({ filters, specialties, onFilterChange }) => {
    const handleConsultTypeChange = (event) => {
        onFilterChange('consultType', event.target.value);
    };

    const handleSpecialtyChange = (event) => {
        const specialty = event.target.name;
        const isChecked = event.target.checked;
        const updatedSpecialties = isChecked
            ? [...filters.specialties, specialty]
            : filters.specialties.filter(s => s !== specialty);
        onFilterChange('specialties', updatedSpecialties);
    };

    const handleSortChange = (event) => {
        onFilterChange('sortBy', event.target.value);
    };

    return (
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ 
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
                fontWeight: 600,
                mb: 2
            }}>
                <LocalHospital sx={{ mr: 1 }} />
                Consultation Type
            </Typography>
            <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup 
                    value={filters.consultType} 
                    onChange={handleConsultTypeChange}
                >
                    <FormControlLabel 
                        value="video" 
                        control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />} 
                        label={<Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <VideoCall sx={{ mr: 1, color: 'secondary.main' }} />
                            Video Consult
                        </Box>}
                    />
                    <FormControlLabel 
                        value="clinic" 
                        control={<Radio sx={{ color: 'primary.main', '&.Mui-checked': { color: 'primary.main' } }} />} 
                        label={<Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocalHospital sx={{ mr: 1, color: 'primary.main' }} />
                            In Clinic
                        </Box>}
                    />
                </RadioGroup>
            </FormControl>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom sx={{ 
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
                fontWeight: 600,
                mb: 2
            }}>
                Specialties
            </Typography>
            <FormControl component="fieldset" sx={{ width: '100%' }}>
                <FormGroup>
                    {specialties.map(specialty => (
                        <FormControlLabel
                            key={specialty}
                            control={
                                <Checkbox
                                    checked={filters.specialties.includes(specialty)}
                                    onChange={handleSpecialtyChange}
                                    name={specialty}
                                    sx={{ 
                                        color: 'secondary.main',
                                        '&.Mui-checked': { color: 'secondary.main' }
                                    }}
                                />
                            }
                            label={<Typography variant="body2" sx={{ fontWeight: 500 }}>{specialty}</Typography>}
                        />
                    ))}
                </FormGroup>
            </FormControl>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom sx={{ 
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
                fontWeight: 600,
                mb: 2
            }}>
                <Sort sx={{ mr: 1 }} />
                Sort By
            </Typography>
            <FormControl fullWidth>
                <Select
                    value={filters.sortBy}
                    onChange={handleSortChange}
                    displayEmpty
                    sx={{ 
                        bgcolor: 'background.paper',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'grey.300'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main'
                        }
                    }}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="fees">Fees (Low to High)</MenuItem>
                    <MenuItem value="experience">Experience (High to Low)</MenuItem>
                </Select>
            </FormControl>
        </Paper>
    );
};

export default FilterPanel;
