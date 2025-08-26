import React, { useState } from 'react';
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
  Snackbar
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  Event as EventIcon,
  Search as SearchIcon,
  Assignment as AssignmentIcon,
  Send as SendIcon,
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

interface FormsPageProps {
  currentUser: any;
}

interface FormData {
  registration: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    userType: string;
  };
  login: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    department: string;
    year: string;
  };
  event: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    maxParticipants: number;
  };
  task: {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    course: string;
  };
}

const FormsPage: React.FC<FormsPageProps> = ({ currentUser }) => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    registration: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: ''
    },
    login: {
      email: '',
      password: '',
      rememberMe: false
    },
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      department: '',
      year: ''
    },
    event: {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxParticipants: 10
    },
    task: {
      title: '',
      description: '',
      dueDate: '',
      priority: '',
      course: ''
    }
  });
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const customColors = {
    primary: 'rgb(179, 209, 53)',
    primaryDark: 'rgb(159, 189, 33)',
    primaryLight: 'rgb(199, 229, 73)',
    textOnPrimary: 'white'
  };

  const forms = [
    {
      id: 'registration',
      title: 'הרשמה',
      description: 'הרשמה למערכת הקמפוס',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      color: '#2196F3'
    },
    {
      id: 'login',
      title: 'התחברות',
      description: 'התחברות למערכת',
      icon: <LoginIcon sx={{ fontSize: 40 }} />,
      color: '#4CAF50'
    },
    {
      id: 'profile',
      title: 'פרופיל משתמש',
      description: 'עדכון פרטי המשתמש',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      color: '#9C27B0'
    },
    {
      id: 'event',
      title: 'יצירת אירוע',
      description: 'יצירת אירוע חדש',
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      color: '#FF9800'
    },
    {
      id: 'task',
      title: 'מטלות ומבחנים',
      description: 'הוספת מטלה או מבחן',
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      color: '#607D8B'
    }
  ];

  const handleFormSubmit = (formType: string) => {
    setNotification({
      message: `הטופס "${forms.find(f => f.id === formType)?.title}" נשלח בהצלחה!`,
      type: 'success'
    });
    setActiveForm(null);
    // איפוס הטופס
    setFormData(prev => ({
      ...prev,
      [formType]: Object.keys(prev[formType as keyof FormData]).reduce((acc, key) => ({
        ...acc,
        [key]: typeof (prev[formType as keyof FormData] as any)[key] === 'boolean' ? false : ''
      }), {}) as any
    }));
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

  const renderForm = (formType: string) => {
    switch (formType) {
      case 'registration':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>הרשמה למערכת</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
              <TextField
                fullWidth
                label="שם פרטי"
                value={formData.registration.firstName}
                onChange={(e) => handleInputChange('registration', 'firstName', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="שם משפחה"
                value={formData.registration.lastName}
                onChange={(e) => handleInputChange('registration', 'lastName', e.target.value)}
                required
              />
              <TextField
                fullWidth
                type="email"
                label="אימייל"
                value={formData.registration.email}
                onChange={(e) => handleInputChange('registration', 'email', e.target.value)}
                required
                sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}
              />
              <TextField
                fullWidth
                type="password"
                label="סיסמה"
                value={formData.registration.password}
                onChange={(e) => handleInputChange('registration', 'password', e.target.value)}
                required
              />
              <TextField
                fullWidth
                type="password"
                label="אימות סיסמה"
                value={formData.registration.confirmPassword}
                onChange={(e) => handleInputChange('registration', 'confirmPassword', e.target.value)}
                required
              />
              <FormControl fullWidth required sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
                <InputLabel>סוג משתמש</InputLabel>
                <Select
                  value={formData.registration.userType}
                  onChange={(e) => handleInputChange('registration', 'userType', e.target.value)}
                >
                  <MenuItem value="student">סטודנט</MenuItem>
                  <MenuItem value="lecturer">מרצה</MenuItem>
                  <MenuItem value="staff">צוות</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        );

      case 'login':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>התחברות למערכת</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                type="email"
                label="אימייל"
                value={formData.login.email}
                onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                required
              />
              <TextField
                fullWidth
                type="password"
                label="סיסמה"
                value={formData.login.password}
                onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                required
              />
            </Box>
          </Box>
        );

      case 'profile':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>עדכון פרופיל</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
              <TextField
                fullWidth
                label="שם פרטי"
                value={formData.profile.firstName}
                onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="שם משפחה"
                value={formData.profile.lastName}
                onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
                required
              />
              <TextField
                fullWidth
                type="email"
                label="אימייל"
                value={formData.profile.email}
                onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                required
                sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}
              />
              <TextField
                fullWidth
                label="טלפון"
                value={formData.profile.phone}
                onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
              />
              <TextField
                fullWidth
                label="כתובת"
                value={formData.profile.address}
                onChange={(e) => handleInputChange('profile', 'address', e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel>חוג</InputLabel>
                <Select
                  value={formData.profile.department}
                  onChange={(e) => handleInputChange('profile', 'department', e.target.value)}
                >
                  <MenuItem value="computer-science">מדעי המחשב</MenuItem>
                  <MenuItem value="engineering">הנדסה</MenuItem>
                  <MenuItem value="business">ניהול</MenuItem>
                  <MenuItem value="arts">אמנויות</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>שנה</InputLabel>
                <Select
                  value={formData.profile.year}
                  onChange={(e) => handleInputChange('profile', 'year', e.target.value)}
                >
                  <MenuItem value="1">שנה א</MenuItem>
                  <MenuItem value="2">שנה ב</MenuItem>
                  <MenuItem value="3">שנה ג</MenuItem>
                  <MenuItem value="4">שנה ד</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        );

      case 'event':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>יצירת אירוע</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
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

      case 'task':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>מטלות ומבחנים</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
              <TextField
                fullWidth
                label="כותרת המטלה"
                value={formData.task.title}
                onChange={(e) => handleInputChange('task', 'title', e.target.value)}
                required
                sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="תיאור המטלה"
                value={formData.task.description}
                onChange={(e) => handleInputChange('task', 'description', e.target.value)}
                required
                sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}
              />
              <TextField
                fullWidth
                type="date"
                label="תאריך יעד"
                value={formData.task.dueDate}
                onChange={(e) => handleInputChange('task', 'dueDate', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth required>
                <InputLabel>עדיפות</InputLabel>
                <Select
                  value={formData.task.priority}
                  onChange={(e) => handleInputChange('task', 'priority', e.target.value)}
                >
                  <MenuItem value="low">נמוכה</MenuItem>
                  <MenuItem value="medium">בינונית</MenuItem>
                  <MenuItem value="high">גבוהה</MenuItem>
                  <MenuItem value="urgent">דחופה</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="קורס"
                value={formData.task.course}
                onChange={(e) => handleInputChange('task', 'course', e.target.value)}
                required
                sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}
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
          טפסים
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
                onClick={() => setActiveForm(form.id)}
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
            onClick={() => activeForm && handleFormSubmit(activeForm)}
            sx={{
              backgroundColor: customColors.primary,
              '&:hover': { backgroundColor: customColors.primaryDark }
            }}
          >
            שלח טופס
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
