import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { CalendarToday as CalendarIcon, AccessTime as TimeIcon, LocationOn as LocationIcon } from '@mui/icons-material';
import { Event } from '../../types';
import { demoEvents } from '../../data/demoData';

interface EventsCardProps {
  customColors: {
    primary: string;
  };
}

const EventsCard: React.FC<EventsCardProps> = ({ customColors }) => {
  return (
    <Card sx={{ border: `2px solid ${customColors.primary}` }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CalendarIcon sx={{ mr: 1 }} />
          <Typography variant="h6">לוח אירועים</Typography>
        </Box>
        <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
          {demoEvents.map((event) => (
            <Box 
              key={event.id} 
              sx={{ 
                p: 2, 
                mb: 1, 
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                backgroundColor: event.urgent ? '#ffebee' : 'transparent'
              }}
            >
              <Typography variant="subtitle2" color={event.urgent ? 'error' : 'primary'}>
                {event.title} - {event.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption">{event.time}</Typography>
                <LocationIcon sx={{ fontSize: 16, ml: 2, mr: 0.5 }} />
                <Typography variant="caption">{event.location}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
