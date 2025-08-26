import React, { useState } from 'react';
import { Card, CardContent, Box, Typography, Chip, Divider } from '@mui/material';
import { 
  LocationOn as LocationIcon,
  LocalLibrary as LibraryIcon,
  Restaurant as CafeteriaIcon,
  FitnessCenter as GymIcon,
  LocalParking as ParkingIcon
} from '@mui/icons-material';
import RatingStars from '../RatingStars';

import { demoFacilities } from '../../data/demoData';

interface FacilitiesCardProps {
  customColors: {
    primary: string;
  };
}

const FacilitiesCard: React.FC<FacilitiesCardProps> = ({ customColors }) => {
  const [facilities, setFacilities] = useState(demoFacilities);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'success';
      case 'busy': return 'warning';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  const getFacilityIcon = (facilityName: string) => {
    switch (facilityName) {
      case 'ספרייה':
        return <LibraryIcon sx={{ fontSize: 24, color: customColors.primary }} />;
      case 'קפיטריה':
        return <CafeteriaIcon sx={{ fontSize: 24, color: customColors.primary }} />;
      case 'חדר כושר':
        return <GymIcon sx={{ fontSize: 24, color: customColors.primary }} />;
      case 'חניה':
        return <ParkingIcon sx={{ fontSize: 24, color: customColors.primary }} />;
      default:
        return <LocationIcon sx={{ fontSize: 24, color: customColors.primary }} />;
    }
  };

  const handleRatingChange = (facilityId: string, rating: number) => {
    setFacilities(prevFacilities => 
      prevFacilities.map(facility => {
        if (facility.id === facilityId) {
          const newTotalRatings = (facility.totalRatings || 0) + 1;
          const newAverageRating = facility.averageRating 
            ? ((facility.averageRating * (facility.totalRatings || 0)) + rating) / newTotalRatings
            : rating;
          
          return {
            ...facility,
            rating,
            totalRatings: newTotalRatings,
            averageRating: newAverageRating
          };
        }
        return facility;
      })
    );
  };

  return (
    <Card sx={{ border: `2px solid ${customColors.primary}` }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationIcon sx={{ mr: 1 }} />
          <Typography variant="h6">מצב מתקנים</Typography>
        </Box>
        
        {facilities.map((facility, index) => (
          <Box key={facility.id}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 2,
              p: 2,
              backgroundColor: 'rgba(0,0,0,0.02)',
              borderRadius: 1,
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {getFacilityIcon(facility.name)}
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ml: 1 }}>
                    {facility.name}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip 
                    label={facility.status === 'open' ? 'פתוח' : facility.status === 'busy' ? 'עמוס' : 'סגור'}
                    color={getStatusColor(facility.status) as any}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {facility.hours}
                  </Typography>
                </Box>
                
                {/* Rating Section */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    דרג את המתקן:
                  </Typography>
                  <RatingStars
                    value={facility.rating || 0}
                    onChange={(rating) => handleRatingChange(facility.id, rating)}
                    size="small"
                    showLabel={true}
                    totalRatings={facility.totalRatings || 0}
                    averageRating={facility.averageRating || 0}
                  />
                </Box>
              </Box>
            </Box>
            
            {index < facilities.length - 1 && (
              <Divider sx={{ my: 1 }} />
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default FacilitiesCard;
