import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  IconButton
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Event as EventIcon,
  Send as SendIcon,
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

interface FormsPageProps {
  currentUser: any;
}

interface FormData {
  event: {
    eventId: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    maxParticipants: number;
  };
}

interface Event {
  eventId: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  createdAt: string;
}

const FormsPage: React.FC<FormsPageProps> = ({ currentUser }) => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [eventCounter, setEventCounter] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteEventDialogOpen, setDeleteEventDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [formData, setFormData] = useState<FormData>({
    event: {
      eventId: `EVENT-${String(eventCounter).padStart(3, '0')}`,
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxParticipants: 10
    }
  });
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const customColors = {
    primary: 'rgb(179, 209, 53)',
    primaryDark: 'rgb(159, 189, 33)',
    primaryLight: 'rgb(199, 229, 73)',
    textOnPrimary: 'white'
  };

  // Load events from localStorage on component mount
  useEffect(() => {
    const loadEventsFromLocalStorage = () => {
      try {
        const savedEvents = localStorage.getItem('campus-events-data');
        if (savedEvents) {
          const parsedEvents = JSON.parse(savedEvents);
          setEvents(parsedEvents);
          
          // Set counter to next available number
          if (parsedEvents.length > 0) {
            const maxId = Math.max(...parsedEvents.map((event: Event) => 
              parseInt(event.eventId.split('-')[1])
            ));
            setEventCounter(maxId + 1);
          }
        }
      } catch (error) {
        console.error('Error loading events from localStorage:', error);
      }
    };

    loadEventsFromLocalStorage();
  }, []);

  const forms = [
    {
      id: 'event',
      title: 'יצירת אירוע',
      description: 'יצירת אירוע חדש',
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      color: '#FF9800'
    }
  ];

  const handleFormSubmit = (formType: string) => {
    if (formType === 'event') {
      const newEvent: Event = {
        ...formData.event,
        createdAt: new Date().toLocaleString('he-IL')
      };

      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);

      // Save to localStorage
      try {
        localStorage.setItem('campus-events-data', JSON.stringify(updatedEvents));
      } catch (error) {
        console.error('Error saving events to localStorage:', error);
      }

      setNotification({
        message: `אירוע "${formData.event.title}" נוצר בהצלחה! מזהה: ${formData.event.eventId}`,
        type: 'success'
      });

      // Reset form and increment counter
      setEventCounter(prev => prev + 1);
      setFormData({
        event: {
          eventId: `EVENT-${String(eventCounter + 1).padStart(3, '0')}`,
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          maxParticipants: 10
        }
      });
    }
    
    setActiveForm(null);
  };

  const handleInputChange = (formType: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [formType]: {
        ...prev[formType as keyof FormData],
        [field]: value
      } as any
    }));
  };

  // פונקציה ליצירת מזהה חדש בעת פתיחת טופס
  const handleOpenForm = (formId: string) => {
    setActiveForm(formId);
  };

  // Event management functions
  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      event: {
        eventId: event.eventId,
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        maxParticipants: event.maxParticipants
      }
    });
    setActiveForm('event');
  };

  const handleDeleteEvent = (event: Event) => {
    setEventToDelete(event);
    setDeleteEventDialogOpen(true);
  };

  const confirmDeleteEvent = () => {
    if (eventToDelete) {
      const updatedEvents = events.filter(event => event.eventId !== eventToDelete.eventId);
      setEvents(updatedEvents);
      
      // Save to localStorage
      try {
        localStorage.setItem('campus-events-data', JSON.stringify(updatedEvents));
      } catch (error) {
        console.error('Error saving events to localStorage:', error);
      }
      
      setNotification({
        message: `האירוע "${eventToDelete.title}" נמחק בהצלחה`,
        type: 'success'
      });
      setDeleteEventDialogOpen(false);
      setEventToDelete(null);
    }
  };

  const handleUpdateEvent = () => {
    if (editingEvent) {
      const updatedEvents = events.map(event => 
        event.eventId === editingEvent.eventId 
          ? { ...formData.event, createdAt: editingEvent.createdAt }
          : event
      );
      setEvents(updatedEvents);
      
      // Save to localStorage
      try {
        localStorage.setItem('campus-events-data', JSON.stringify(updatedEvents));
      } catch (error) {
        console.error('Error saving events to localStorage:', error);
      }
      
      setNotification({
        message: `האירוע "${formData.event.title}" עודכן בהצלחה`,
        type: 'success'
      });
      
      setEditingEvent(null);
      setActiveForm(null);
      
      // Reset form
      setEventCounter(prev => prev + 1);
      setFormData({
        event: {
          eventId: `EVENT-${String(eventCounter + 1).padStart(3, '0')}`,
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          maxParticipants: 10
        }
      });
    }
  };

  const renderForm = (formType: string) => {
    switch (formType) {
      case 'event':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {editingEvent ? 'עריכת אירוע' : 'יצירת אירוע'}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
              <TextField
                fullWidth
                label="מזהה אירוע"
                value={formData.event.eventId}
                InputProps={{ 
                  readOnly: true,
                  sx: { 
                    backgroundColor: '#f5f5f5',
                    '& .MuiInputBase-input': {
                      color: '#666',
                      fontWeight: 'bold'
                    }
                  }
                }}
                helperText="נוצר אוטומטית"
                sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}
              />
              <TextField
                fullWidth
                label="כותרת האירוע"
                value={formData.event.title}
                onChange={(e) => handleInputChange('event', 'title', e.target.value)}
                required
                sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="תיאור האירוע"
                value={formData.event.description}
                onChange={(e) => handleInputChange('event', 'description', e.target.value)}
                required
                sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}
              />
              <TextField
                fullWidth
                type="date"
                label="תאריך"
                value={formData.event.date}
                onChange={(e) => handleInputChange('event', 'date', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                type="time"
                label="שעה"
                value={formData.event.time}
                onChange={(e) => handleInputChange('event', 'time', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="מיקום"
                value={formData.event.location}
                onChange={(e) => handleInputChange('event', 'location', e.target.value)}
                required
              />
              <TextField
                fullWidth
                type="number"
                label="מספר משתתפים מקסימלי"
                value={formData.event.maxParticipants}
                onChange={(e) => handleInputChange('event', 'maxParticipants', parseInt(e.target.value))}
                required
              />
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: customColors.primary }}>
          <DescriptionIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          ניהול
        </Typography>
        <Typography variant="body1" color="text.secondary">
          טפסים בסיסיים לניהול פעילויות בקמפוס
        </Typography>
      </Box>

      {/* Forms Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {forms.map((form) => (
          <Card 
            key={form.id}
            sx={{ 
              height: '100%',
              border: `2px solid ${form.color}`,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 25px ${form.color}40`
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Box sx={{ color: form.color, mb: 2 }}>
                {form.icon}
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {form.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {form.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                onClick={() => handleOpenForm(form.id)}
                sx={{
                  backgroundColor: form.color,
                  '&:hover': { backgroundColor: form.color + 'dd' }
                }}
              >
                פתח טופס
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Form Dialog */}
      <Dialog 
        open={!!activeForm} 
        onClose={() => setActiveForm(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          backgroundColor: customColors.primary, 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          {activeForm && forms.find(f => f.id === activeForm)?.icon}
          {activeForm && forms.find(f => f.id === activeForm)?.title}
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {activeForm && renderForm(activeForm)}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setActiveForm(null)}
            startIcon={<ClearIcon />}
          >
            ביטול
          </Button>
          <Button 
            variant="contained"
            startIcon={<SendIcon />}
            onClick={() => {
              if (editingEvent) {
                handleUpdateEvent();
              } else if (activeForm) {
                handleFormSubmit(activeForm);
              }
            }}
            sx={{
              backgroundColor: customColors.primary,
              '&:hover': { backgroundColor: customColors.primaryDark }
            }}
          >
            {editingEvent ? 'עדכן אירוע' : 'שלח טופס'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Events Management Table */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: customColors.primary, mb: 3 }}>
          <EventIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          ניהול אירועים ({events.length})
        </Typography>
        
        {events.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            אין אירועים עדיין. צור אירוע חדש באמצעות הטופס למעלה.
          </Typography>
        ) : (
          <Box sx={{ overflowX: 'auto' }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr auto auto',
              gap: 2,
              p: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 1,
              mb: 2,
              fontWeight: 'bold',
              fontSize: '0.875rem'
            }}>
              <Box>מזהה</Box>
              <Box>כותרת</Box>
              <Box>תאריך</Box>
              <Box>שעה</Box>
              <Box>מיקום</Box>
              <Box>משתתפים</Box>
              <Box>פעולות</Box>
            </Box>
            
            {events.map((event) => (
              <Box key={event.eventId} sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr auto auto',
                gap: 2,
                p: 2,
                borderBottom: '1px solid #e0e0e0',
                '&:hover': { backgroundColor: '#f9f9f9' },
                '&:last-child': { borderBottom: 'none' }
              }}>
                <Box sx={{ fontWeight: 'bold', color: customColors.primary }}>{event.eventId}</Box>
                <Box>{event.title}</Box>
                <Box>{event.date}</Box>
                <Box>{event.time}</Box>
                <Box>{event.location}</Box>
                <Box>{event.maxParticipants}</Box>
                <Box>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEditEvent(event)}
                    sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' } }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteEvent(event)}
                    sx={{ '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' } }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Delete Event Confirmation Dialog */}
      <Dialog open={deleteEventDialogOpen} onClose={() => setDeleteEventDialogOpen(false)}>
        <DialogTitle>אישור מחיקת אירוע</DialogTitle>
        <DialogContent>
          <Typography>
            האם אתה בטוח שברצונך למחוק את האירוע "{eventToDelete?.title}"?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            פעולה זו אינה הפיכה.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteEventDialogOpen(false)}>ביטול</Button>
          <Button 
            onClick={confirmDeleteEvent} 
            color="error" 
            variant="contained"
          >
            מחיקה
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
      >
        <Alert 
          onClose={() => setNotification(null)} 
          severity={notification?.type} 
          sx={{ width: '100%' }}
          icon={notification?.type === 'success' ? <CheckCircleIcon /> : undefined}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FormsPage;
