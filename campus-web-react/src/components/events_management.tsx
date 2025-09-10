import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Violation 1: Component name not in PascalCase (should be EventsManagement)
const events_management = () => {
  // Violation 2: Function name not in camelCase (should be getEvents)
  const get_events = () => {
    return [
      { id: 1, title: 'הרצאה על React', date: '2025-01-15', location: 'אולם 101', description: 'הרצאה מעמיקה על React hooks' },
      { id: 2, title: 'סדנת JavaScript', date: '2025-01-20', location: 'מעבדה 3', description: 'סדנה מעשית ב-JavaScript' },
      { id: 3, title: 'מפגש סטודנטים', date: '2025-01-25', location: 'קפיטריה', description: 'מפגש חברתי לסטודנטים' }
    ];
  };

  // Violation 3: Variable name not in camelCase (should be eventsList)
  const [events_list, setEventsList] = useState(get_events());
  const [selected_event, setSelectedEvent] = useState(null);
  const [dialog_open, setDialogOpen] = useState(false);
  const [form_data, setFormData] = useState({ title: '', date: '', location: '', description: '' });

  // Violation 4: Function name not in camelCase (should be handleSubmit)
  const handle_submit = (e) => {
    e.preventDefault();
    if (selected_event) {
      // Violation 5: Inline styling instead of CSS classes
      const updatedEvents = events_list.map(event => 
        event.id === selected_event.id ? { ...event, ...form_data } : event
      );
      setEventsList(updatedEvents);
    } else {
      const newEvent = {
        id: Date.now(),
        ...form_data
      };
      setEventsList([...events_list, newEvent]);
    }
    setDialogOpen(false);
    setFormData({ title: '', date: '', location: '', description: '' });
    setSelectedEvent(null);
  };

  // Violation 6: Function name not in camelCase (should be handleDelete)
  const handle_delete = (id) => {
    setEventsList(events_list.filter(event => event.id !== id));
  };

  // Violation 7: Function name not in camelCase (should be handleEdit)
  const handle_edit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description
    });
    setDialogOpen(true);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ניהול אירועים
      </Typography>
      
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setDialogOpen(true)}
        // Violation 5: Inline styling
        style={{ marginBottom: '20px', backgroundColor: '#2e7d32', color: 'white' }}
      >
        הוסף אירוע חדש
      </Button>

      <Grid container spacing={2}>
        {events_list.map((event) => (
          <Grid item xs={12} md={6} lg={4} key={event.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {event.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  תאריך: {event.date}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  מיקום: {event.location}
                </Typography>
                <Typography variant="body2" component="p">
                  {event.description}
                </Typography>
                <Box sx={{ marginTop: '10px' }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handle_edit(event)}
                    // Violation 5: Inline styling
                    style={{ marginRight: '8px', backgroundColor: '#1976d2', color: 'white' }}
                  >
                    ערוך
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handle_delete(event.id)}
                    // Violation 5: Inline styling
                    style={{ backgroundColor: '#d32f2f', color: 'white' }}
                  >
                    מחק
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialog_open} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selected_event ? 'ערוך אירוע' : 'הוסף אירוע חדש'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handle_submit} sx={{ marginTop: '10px' }}>
            <TextField
              fullWidth
              label="כותרת האירוע"
              value={form_data.title}
              onChange={(e) => setFormData({ ...form_data, title: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="תאריך"
              type="date"
              value={form_data.date}
              onChange={(e) => setFormData({ ...form_data, date: e.target.value })}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="מיקום"
              value={form_data.location}
              onChange={(e) => setFormData({ ...form_data, location: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="תיאור"
              value={form_data.description}
              onChange={(e) => setFormData({ ...form_data, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>ביטול</Button>
          <Button onClick={handle_submit} variant="contained">
            {selected_event ? 'עדכן' : 'הוסף'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default events_management;
