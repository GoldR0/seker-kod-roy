import React from 'react';
import { Card, CardContent, Box, Typography, Chip } from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';
import { Facility } from '../../types';
import { demoFacilities } from '../../data/demoData';

interface FacilitiesCardProps {
  customColors: {
    primary: string;
  };
}

const FacilitiesCard: React.FC<FacilitiesCardProps> = ({ customColors }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'success';
      case 'busy': return 'warning';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ border: `2px solid ${customColors.primary}` }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationIcon sx={{ mr: 1 }} />
          <Typography variant="h6">מצב מתקנים</Typography>
        </Box>
        {demoFacilities.map((facility) => (
          <Box key={facility.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2">{facility.name}:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={facility.status === 'open' ? 'פתוח' : facility.status === 'busy' ? 'עמוס' : 'סגור'}
                color={getStatusColor(facility.status) as any}
                size="small"
              />
              <Typography variant="caption">{facility.hours}</Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default FacilitiesCard;
