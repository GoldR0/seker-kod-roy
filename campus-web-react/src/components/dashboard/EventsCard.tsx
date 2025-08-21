import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { CalendarToday as CalendarIcon, AccessTime as TimeIcon, LocationOn as LocationIcon } from '@mui/icons-material';

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
        <Box sx={{ 
          maxHeight: { xs: 'none', lg: '500px' }, 
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: '3px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: '#555'
            }
          }
        }}>
          {demoEvents.map((event, index) => (
            <Box 
              key={event.id} 
              sx={{ 
                p: 2.5, 
                mb: 2, 
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                backgroundColor: event.urgent ? '#ffebee' : 'rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderColor: event.urgent ? '#ff5252' : '#c4c4c4'
                },
                '&:last-child': {
                  mb: 0
                }
              }}
            >
              <Typography 
                variant="subtitle1" 
                color={event.urgent ? 'error' : 'primary'}
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 1,
                  fontSize: '1.1rem'
                }}
              >
                {event.title}
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mb: 2,
                  lineHeight: 1.6
                }}
              >
                {event.description}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 2 },
                alignItems: { xs: 'flex-start', sm: 'center' }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
                    {event.date}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
                    {event.time}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
                    {event.location}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
