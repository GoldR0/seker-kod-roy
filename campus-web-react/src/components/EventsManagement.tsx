import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Violation 1: Component name not in PascalCase
const EventsManagement = () => {
  // Violation 2: Single Responsibility Principle - Component doing too many things
  const [events, setEvents] = useState([
    { id: 1, title: 'הרצאה על React', date: '2025-01-15', location: 'אולם 101', description: 'הרצאה מעמיקה על React hooks' },
    { id: 2, title: 'סדנת JavaScript', date: '2025-01-20', location: 'מעבדה 3', description: 'סדנה מעשית ב-JavaScript' },
    { id: 3, title: 'מפגש סטודנטים', date: '2025-01-25', location: 'קפיטריה', description: 'מפגש חברתי לסטודנטים' }
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', location: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [userPermissions, setUserPermissions] = useState({ canEdit: true, canDelete: true });
  const [notification, setNotification] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Violation 3: Using div instead of semantic HTML
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Complex business logic mixed with UI logic
    if (selectedEvent) {
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...formData } : event
      );
      setEvents(updatedEvents);
      setNotification('אירוע עודכן בהצלחה');
    } else {
      const newEvent = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        createdBy: 'current-user',
        status: 'active',
        attendees: [],
        category: 'general'
      };
      setEvents([...events, newEvent]);
      setNotification('אירוע נוסף בהצלחה');
    }
    
    // Violation 4: Inline styling instead of CSS classes
    setTimeout(() => {
      setDialogOpen(false);
      setFormData({ title: '', date: '', location: '', description: '' });
      setSelectedEvent(null);
      setIsLoading(false);
      setNotification('');
    }, 1000);
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setNotification('אירוע נמחק בהצלחה');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description
    });
    setDialogOpen(true);
  };

  // Violation 5: Complex component with too many responsibilities
  const filterAndSortEvents = () => {
    let filtered = events;
    
    if (searchTerm) {
      filtered = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
    
    setFilteredEvents(filtered);
  };

  // Violation 6: useEffect with missing dependencies
  useEffect(() => {
    filterAndSortEvents();
  }, [events, searchTerm, sortBy]);

  // Violation 7: CSS classes not following lowercase-hyphen convention
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ניהול אירועים
      </Typography>
      
      {/* Violation 3: Using div instead of semantic HTML */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <TextField
          placeholder="חיפוש אירועים..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px' }}
        >
          <option value="date">מיון לפי תאריך</option>
          <option value="title">מיון לפי כותרת</option>
        </select>
      </div>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setDialogOpen(true)}
        style={{ 
          marginBottom: '20px', 
          backgroundColor: '#2e7d32', 
          color: 'white',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}
      >
        הוסף אירוע חדש
      </Button>

      {notification && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#4caf50', 
          color: 'white', 
          marginBottom: '20px',
          borderRadius: '4px'
        }}>
          {notification}
        </div>
      )}

      <Grid container spacing={2}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} md={6} lg={4} key={event.id}>
            <Card style={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}>
              <CardContent style={{ flex: 1, padding: '16px' }}>
                <Typography variant="h6" component="h2" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                  {event.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom style={{ fontSize: '14px' }}>
                  📅 תאריך: {event.date}
                </Typography>
                <Typography color="textSecondary" gutterBottom style={{ fontSize: '14px' }}>
                  📍 מיקום: {event.location}
                </Typography>
                <Typography variant="body2" component="p" style={{ marginTop: '8px', lineHeight: 1.5 }}>
                  {event.description}
                </Typography>
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(event)}
                    style={{ 
                      backgroundColor: '#1976d2', 
                      color: 'white',
                      fontSize: '12px',
                      padding: '6px 12px'
                    }}
                  >
                    ערוך
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(event.id)}
                    style={{ 
                      backgroundColor: '#d32f2f', 
                      color: 'white',
                      fontSize: '12px',
                      padding: '6px 12px'
                    }}
                  >
                    מחק
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
          {selectedEvent ? 'ערוך אירוע' : 'הוסף אירוע חדש'}
        </DialogTitle>
        <DialogContent style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
            <TextField
              fullWidth
              label="כותרת האירוע"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
              style={{ marginBottom: '16px' }}
            />
            <TextField
              fullWidth
              label="תאריך"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              fullWidth
              label="מיקום"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              margin="normal"
              required
              style={{ marginBottom: '16px' }}
            />
            <TextField
              fullWidth
              label="תיאור"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
              style={{ marginBottom: '16px' }}
            />
          </form>
        </DialogContent>
        <DialogActions style={{ padding: '16px 20px', backgroundColor: '#f5f5f5' }}>
          <Button 
            onClick={() => setDialogOpen(false)}
            style={{ marginRight: '8px' }}
          >
            ביטול
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={isLoading}
            style={{ 
              backgroundColor: '#2e7d32',
              color: 'white',
              padding: '8px 16px'
            }}
          >
            {isLoading ? 'שומר...' : (selectedEvent ? 'עדכן' : 'הוסף')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventsManagement;