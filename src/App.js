import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import { useQueryParams } from './hooks/useQueryParams';
import { theme } from './theme';

const AppContent = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    consultType: '',
    specialties: [],
    sortBy: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const getSpecialties = () => {
    if (!doctors || !doctors.length) return [];
    const allSpecialties = doctors.reduce((acc, doctor) => {
      if (doctor.specialties) {
        doctor.specialties.forEach(specialty => acc.add(specialty));
      }
      return acc;
    }, new Set());
    return Array.from(allSpecialties);
  };

  useQueryParams(filters, setFilters, searchTerm, setSearchTerm);

  const applyFilters = () => {
    if (!doctors || !doctors.length) {
      setFilteredDoctors([]);
      return;
    }

    let result = [...doctors];
    const filterOrder = [];

    if (searchTerm) filterOrder.push('search');
    if (filters.consultType) filterOrder.push('consultType');
    if (filters.specialties.length > 0) filterOrder.push('specialties');
    if (filters.sortBy) filterOrder.push('sortBy');

    filterOrder.forEach(filterType => {
      switch (filterType) {
        case 'search':
          result = result.filter(doctor =>
            doctor.name?.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        case 'consultType':
          result = result.filter(doctor =>
            doctor.consultationType?.toLowerCase() === filters.consultType.toLowerCase()
          );
          break;
        case 'specialties':
          result = result.filter(doctor =>
            doctor.specialties?.some(specialty =>
              filters.specialties.includes(specialty)
            )
          );
          break;
        case 'sortBy':
          if (filters.sortBy === 'fees') {
            result.sort((a, b) => (a.fees || 0) - (b.fees || 0));
          } else if (filters.sortBy === 'experience') {
            result.sort((a, b) => (b.experience || 0) - (a.experience || 0));
          }
          break;
        default:
          break;
      }
    });

    setFilteredDoctors(result);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, doctors]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        py: 4,
        mb: 4,
        borderRadius: '0 0 20px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              mb: 3,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.9
              }
            }}
            onDoubleClick={() => {
              setFilters({
                consultType: '',
                specialties: [],
                sortBy: '',
                searchQuery: ''
              });
              setFilteredDoctors(doctors);
            }}
          >
            Find Your Doctor
          </Typography>
          <SearchBar doctors={doctors} onSearch={handleSearch} />
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <FilterPanel
              filters={filters}
              specialties={getSpecialties()}
              onFilterChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <DoctorList doctors={filteredDoctors} />
          </Grid>
        </Grid>
      </Container>
    </Box>

  );
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
