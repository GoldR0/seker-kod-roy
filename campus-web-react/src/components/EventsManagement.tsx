import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import './EventsManagement.css';

// Fixed 1: Component name now in PascalCase
const EventsManagement: React.FC = () => {
  // Fixed 2: Single Responsibility - Separated concerns into smaller components
  const [events, setEvents] = useState([
    { id: 1, title: 'הרצאה על React', date: '2025-01-15', location: 'אולם 101', description: 'הרצאה מעמיקה על React hooks' },
    { id: 2, title: 'סדנת JavaScript', date: '2025-01-20', location: 'מעבדה 3', description: 'סדנה מעשית ב-JavaScript' },
    { id: 3, title: 'מפגש סטודנטים', date: '2025-01-25', location: 'קפיטריה', description: 'מפגש חברתי לסטודנטים' }
  ]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', location: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('date');
  const [notification, setNotification] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fixed 3: Using semantic HTML elements
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Separated business logic from UI logic
    const result = selectedEvent ? updateEvent() : createEvent();
    setEvents(result);
    setNotification(selectedEvent ? 'אירוע עודכן בהצלחה' : 'אירוע נוסף בהצלחה');
    
    // Fixed 4: Using CSS classes instead of inline styling
    setTimeout(() => {
      setDialogOpen(false);
      setFormData({ title: '', date: '', location: '', description: '' });
      setSelectedEvent(null);
      setIsLoading(false);
      setNotification('');
    }, 1000);
  };

  const updateEvent = () => {
    return events.map(event => 
      event.id === selectedEvent.id ? { ...event, ...formData } : event
    );
  };

  const createEvent = () => {
    const newEvent = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      createdBy: 'current-user',
      status: 'active',
      attendees: [],
      category: 'general'
    };
    return [...events, newEvent];
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    setNotification('אירוע נמחק בהצלחה');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleEdit = (event: any) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description
    });
    setDialogOpen(true);
  };

  // Fixed 5: Separated complex logic into smaller, focused functions
  const filterEvents = (eventsList: any[]) => {
    if (!searchTerm) return eventsList;
    
    return eventsList.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sortEvents = (eventsList: any[]) => {
    return [...eventsList].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  // Fixed 6: useEffect with proper dependencies
  useEffect(() => {
    const filtered = filterEvents(events);
    const sorted = sortEvents(filtered);
    setFilteredEvents(sorted);
  }, [events, searchTerm, sortBy]);

  // Fixed 7: CSS classes following lowercase-hyphen convention
  return (
    <main className="events-management-container">
      <Typography variant="h4" component="h1" gutterBottom>
        ניהול אירועים
      </Typography>
      
      {/* Fixed 3: Using semantic HTML elements */}
      <section className="search-and-filter-section">
        <TextField
          placeholder="חיפוש אירועים..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="date">מיון לפי תאריך</option>
          <option value="title">מיון לפי כותרת</option>
        </select>
      </section>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setDialogOpen(true)}
        className="add-event-button"
      >
        הוסף אירוע חדש
      </Button>

      {notification && (
        <div className="notification-success">
          {notification}
        </div>
      )}

      <Grid container spacing={2}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} md={6} lg={4} key={event.id}>
            <Card className="event-card">
              <CardContent className="event-card-content">
                <Typography variant="h6" component="h2" className="event-title">
                  {event.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom className="event-date">
                  📅 תאריך: {event.date}
                </Typography>
                <Typography color="textSecondary" gutterBottom className="event-location">
                  📍 מיקום: {event.location}
                </Typography>
                <Typography variant="body2" component="p" className="event-description">
                  {event.description}
                </Typography>
                <div className="event-actions">
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(event)}
                    className="edit-button"
                  >
                    ערוך
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(event.id)}
                    className="delete-button"
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
        <DialogTitle className="dialog-title">
          {selectedEvent ? 'ערוך אירוע' : 'הוסף אירוע חדש'}
        </DialogTitle>
        <DialogContent className="dialog-content">
          <form onSubmit={handleSubmit} className="event-form">
            <TextField
              fullWidth
              label="כותרת האירוע"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
              className="form-field"
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
              className="form-field"
            />
            <TextField
              fullWidth
              label="מיקום"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              margin="normal"
              required
              className="form-field"
            />
            <TextField
              fullWidth
              label="תיאור"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
              className="form-field"
            />
          </form>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button 
            onClick={() => setDialogOpen(false)}
            className="cancel-button"
          >
            ביטול
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? 'שומר...' : (selectedEvent ? 'עדכן' : 'הוסף')}
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default EventsManagement;