import React from 'react';
import { Paper, Typography } from '@mui/material';

interface PlaceholderContentProps {
  activeSection: string;
  customColors: {
    primary: string;
    primaryLight: string;
  };
}

const PlaceholderContent: React.FC<PlaceholderContentProps> = ({ activeSection, customColors }) => {
  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'profile': return 'פרופיל אישי';
      case 'learning': return 'מרכז הלימודים';
      case 'cafeteria': return 'קפיטריה';
      case 'lost-found': return 'מציאות ואבדות';
      case 'marketplace': return 'שוק יד שנייה';
      case 'services': return 'שירותים בקמפוס';
      case 'community': return 'קהילה';
      case 'forum': return 'פורום קורס';
      case 'help': return 'עזרה';
      default: return 'דף לא נמצא';
    }
  };

  return (
    <Paper sx={{ 
      p: 3, 
      textAlign: 'center',
      border: `2px solid ${customColors.primary}`,
      backgroundColor: customColors.primaryLight + '10'
    }}>
      <Typography variant="h5">
        {getSectionTitle(activeSection)}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        תוכן זה יפותח בהמשך...
      </Typography>
    </Paper>
  );
};

export default PlaceholderContent;
