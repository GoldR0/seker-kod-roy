import React from 'react';
import { Box } from '@mui/material';
import { User } from '../../types';
import WelcomeBanner from './WelcomeBanner';
import EventsCard from './EventsCard';
import FacilitiesCard from './FacilitiesCard';
import TasksCard from './TasksCard';

interface DashboardProps {
  currentUser: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  // Custom color theme
  const customColors = {
    primary: 'rgb(179, 209, 53)',
    primaryDark: 'rgb(159, 189, 33)',
    primaryLight: 'rgb(199, 229, 73)',
    textOnPrimary: 'white'
  };

  return (
    <Box>
      {/* Welcome Banner */}
      <WelcomeBanner currentUser={currentUser} />

      {/* Content Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 3 
      }}>
        {/* Events Card */}
        <EventsCard customColors={customColors} />

        {/* Facilities Card */}
        <FacilitiesCard customColors={customColors} />

        {/* Tasks Card */}
        <TasksCard customColors={customColors} />
      </Box>
    </Box>
  );
};

export default Dashboard;
