import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Avatar, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import { VideoCall, LocalHospital } from '@mui/icons-material';
import { LocationOn, Phone, AccessTime } from '@mui/icons-material';

const DoctorList = ({ doctors = [] }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleVisitClinic = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseDialog = () => {
    setSelectedDoctor(null);
  };

  if (!doctors.length) {
    return (
      <Box sx={{ 
        p: 4, 
        textAlign: 'center',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1
      }}>
        <Typography variant="h6" color="text.secondary">
          No doctors found matching your criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {doctors.map((doctor, index) => (
        <Grid item xs={12} md={6} key={doctor.id || index}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: 'primary.main',
                    fontSize: '1.5rem',
                    mr: 2
                  }}
                >
                  {(doctor.name || 'DR')[0].toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: 'primary.main', mb: 0.5 }}>
                    Dr. {doctor.name || 'Unknown Doctor'}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {doctor.specialties?.map(specialty => (
                      <Chip
                        key={specialty}
                        label={specialty}
                        size="small"
                        sx={{
                          bgcolor: 'secondary.light',
                          color: 'secondary.dark',
                          fontWeight: 500
                        }}
                      />
                    )) || (
                      <Chip
                        label="No specialties listed"
                        size="small"
                        sx={{ bgcolor: 'grey.100' }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'grey.50',
                p: 1.5,
                borderRadius: 1,
                mb: 2
              }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {doctor.experience || 0} Years Experience
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                  ₹{doctor.fees || 'N/A'}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={doctor.consultType !== 'clinic'}
                  onClick={() => handleVisitClinic(doctor)}
                  startIcon={<LocalHospital />}
                >
                  Visit Clinic
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  disabled={doctor.consultType !== 'video'}
                  href={`tel:${doctor.phone}`}
                  startIcon={<VideoCall />}
                >
                  Video Consult
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        ))}
      </Grid>

      <Dialog open={!!selectedDoctor} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      {selectedDoctor && (
        <>
          <DialogTitle sx={{ 
            bgcolor: 'primary.main', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <LocalHospital />
            Clinic Details - Dr. {selectedDoctor.name}
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <Box sx={{ 
                bgcolor: 'primary.light', 
                color: 'primary.contrastText',
                p: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <LocationOn />
                <Box>
                  <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>Clinic Address</Typography>
                  <Typography>123 Medical Center, City Hospital Road</Typography>
                </Box>
              </Box>
              
              <Box sx={{ 
                bgcolor: 'secondary.light', 
                color: 'secondary.contrastText',
                p: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Phone />
                <Box>
                  <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>Contact Number</Typography>
                  <Typography>{selectedDoctor.phone || '+1 234-567-8900'}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                    Available for appointments and queries
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                bgcolor: 'grey.100',
                p: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <AccessTime color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="primary">Working Hours</Typography>
                  <Typography>Monday - Saturday</Typography>
                  <Typography variant="body2" color="text.secondary">9:00 AM - 6:00 PM</Typography>
                  <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
                    Closed on Sundays & Public Holidays
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ bgcolor: 'grey.50', p: 2 }}>
            <Button 
              onClick={handleCloseDialog} 
              color="inherit"
              startIcon={<AccessTime />}
            >
              Book Later
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              href={`https://maps.google.com/?q=city+hospital`}
              target="_blank"
              startIcon={<LocationOn />}
            >
              Get Directions
            </Button>
            <Button
              variant="contained"
              color="secondary"
              href={`tel:${selectedDoctor.phone}`}
              startIcon={<Phone />}
            >
              Call Now
            </Button>
          </DialogActions>
        </>
      )}
      </Dialog>
    </Box>
  );
};

export default DoctorList;
