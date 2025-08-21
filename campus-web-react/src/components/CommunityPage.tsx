import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';
import EventsCard from './dashboard/EventsCard';
import FacilitiesCard from './dashboard/FacilitiesCard';

interface CommunityPageProps {
  currentUser: any;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ currentUser }) => {
  // Custom color theme
  const customColors = {
    primary: 'rgb(179, 209, 53)',
    primaryDark: 'rgb(159, 189, 33)',
    primaryLight: 'rgb(199, 229, 73)',
    textOnPrimary: 'white'
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 4, 
        p: 3, 
        backgroundColor: customColors.primaryLight + '20',
        borderRadius: 2,
        border: `2px solid ${customColors.primary}`
      }}>
        <GroupIcon sx={{ fontSize: 40, mr: 2, color: customColors.primary }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: customColors.primary }}>
            קהילת הקמפוס
          </Typography>
          <Typography variant="body1" color="text.secondary">
            מידע על אירועים ומתקנים בקמפוס
          </Typography>
        </Box>
      </Box>

      {/* Content Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
        gap: 4,
        alignItems: 'start' // מיישר את הכרטיסים לחלק העליון
      }}>
        {/* Events Card */}
        <Box sx={{ height: 'fit-content' }}>
          <EventsCard customColors={customColors} />
        </Box>

        {/* Facilities Card */}
        <Box sx={{ height: 'fit-content' }}>
          <FacilitiesCard customColors={customColors} />
        </Box>
      </Box>
    </Container>
  );
};

export default CommunityPage;
