import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';
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
            מידע על מתקנים בקמפוס
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center'
      }}>
        {/* Facilities Card */}
        <Box sx={{ maxWidth: 800, width: '100%' }}>
          <FacilitiesCard customColors={customColors} />
        </Box>
      </Box>
    </Container>
  );
};

export default CommunityPage;
