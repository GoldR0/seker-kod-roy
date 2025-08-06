import React, { useState } from 'react';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Grid,
  Paper,
  Chip,
  Avatar,
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
  Home as HomeIcon,
  School as SchoolIcon,
  Event as EventIcon,
  Restaurant as RestaurantIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Build as BuildIcon,
  Group as GroupIcon,
  Forum as ForumIcon,
  Help as HelpIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { User, Task, Event, Facility } from './types';

// Demo data
const demoUsers: Record<string, User> = {
  'student@campus.ac.il': {
    id: '123456789',
    name: 'ישראל ישראלי',
    email: 'student@campus.ac.il',
    role: 'student',
    phone: '050-1234567',
    age: 22,
    city: 'תל אביב',
    gender: 'male'
  },
  'lecturer@campus.ac.il': {
    id: '987654321',
    name: 'ד"ר כהן',
    email: 'lecturer@campus.ac.il',
    role: 'lecturer',
    phone: '050-9876543',
    age: 45,
    city: 'ירושלים',
    gender: 'male'
  }
};

const demoEvents: Event[] = [
  {
    id: '1',
    title: 'מיטאפ יזמות',
    description: 'מפגש עם יזמים מובילים בתעשייה',
    date: '15/12',
    time: '18:00',
    location: 'אודיטוריום',
    urgent: true
  },
  {
    id: '2',
    title: 'הרצאת אורח - AI',
    description: 'ד"ר כהן על בינה מלאכותית',
    date: '20/12',
    time: '14:00',
    location: 'חדר 301',
    urgent: false
  },
  {
    id: '3',
    title: 'סדנת פיתוח',
    description: 'סדנה מעשית בפיתוח אפליקציות',
    date: '25/12',
    time: '10:00',
    location: 'מעבדת מחשבים',
    urgent: false
  },
  {
    id: '4',
    title: 'יום אטרקציות',
    description: 'יום כיף עם פעילויות מגוונות',
    date: '30/12',
    time: '09:00',
    location: 'קמפוס',
    urgent: false
  }
];

const demoFacilities: Facility[] = [
  { id: '1', name: 'ספרייה', status: 'open', hours: '6:30-22:30' },
  { id: '2', name: 'קפיטריה', status: 'busy', hours: '7:00-22:00' },
  { id: '3', name: 'חדר כושר', status: 'open', hours: '6:30-8:00' },
  { id: '4', name: 'חניה', status: 'busy', hours: '24/7' }
];

const demoTasks: Task[] = [
  {
    id: '1',
    title: 'מבחן מתמטיקה',
    type: 'exam',
    course: 'מתמטיקה 1',
    dueDate: '2024-12-15',
    priority: 'urgent',
    status: 'pending'
  },
  {
    id: '2',
    title: 'מבחן פיזיקה',
    type: 'exam',
    course: 'פיזיקה 1',
    dueDate: '2024-12-15',
    priority: 'urgent',
    status: 'pending'
  },
  {
    id: '3',
    title: 'הגשת עבודה',
    type: 'assignment',
    course: 'תכנות מתקדם',
    dueDate: '2024-12-16',
    priority: 'medium',
    status: 'pending'
  }
];

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleLogin = (email: string, password: string) => {
    const user = demoUsers[email];
    if (user && password === '123456') {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setLoginDialogOpen(false);
      showNotification('התחברת בהצלחה!', 'success');
    } else {
      showNotification('שם משתמש או סיסמה שגויים', 'error');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    showNotification('התנתקת בהצלחה', 'success');
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const navigationItems = [
    { id: 'home', label: 'עמוד בית', icon: <HomeIcon /> },
    { id: 'profile', label: 'פרופיל אישי', icon: <PersonIcon /> },
    { id: 'learning', label: 'מרכז הלימודים', icon: <SchoolIcon /> },
    { id: 'cafeteria', label: 'קפיטריה', icon: <RestaurantIcon /> },
    { id: 'lost-found', label: 'מציאות ואבדות', icon: <SearchIcon /> },
    { id: 'marketplace', label: 'שוק יד שנייה', icon: <ShoppingCartIcon /> },
    { id: 'services', label: 'שירותים בקמפוס', icon: <BuildIcon /> },
    { id: 'community', label: 'קהילה', icon: <GroupIcon /> },
    { id: 'forum', label: 'פורום-קורס', icon: <ForumIcon /> },
    { id: 'help', label: 'עזרה', icon: <HelpIcon /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'success';
      case 'busy': return 'warning';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ONO - מערכת ניהול קמפוס
          </Typography>
          
          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2">
                שלום, {currentUser?.name}
              </Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          ) : (
            <Button 
              color="inherit" 
              startIcon={<LoginIcon />}
              onClick={() => setLoginDialogOpen(true)}
            >
              התחברות
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            {navigationItems.map((item) => (
              <ListItem 
                button 
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setDrawerOpen(false);
                }}
                selected={activeSection === item.id}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
        {activeSection === 'home' && (
          <Box>
            {/* Welcome Banner */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                mb: 3, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                color: 'white'
              }}
            >
              <Typography variant="h4" gutterBottom>
                ברוכים הבאים למערכת המקיפה לניהול חיי הסטודנטים בקמפוס
              </Typography>
              {isLoggedIn && (
                <Typography variant="h6">
                  שלום {currentUser?.name}! היום יש לך {demoTasks.filter(t => t.priority === 'urgent').length} מבחנים ו-{demoTasks.filter(t => t.type === 'assignment').length} מטלות להגשה
                </Typography>
              )}
            </Paper>

            {/* Navigation Grid */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {navigationItems.slice(1, 7).map((item) => (
                <Grid item xs={6} sm={4} md={2} key={item.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      cursor: 'pointer',
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
                    }}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 2 }}>
                      {item.icon}
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {item.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Content Cards */}
            <Grid container spacing={3}>
              {/* Events Card */}
              <Grid item xs={12} md={4}>
                <Card>
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
              </Grid>

              {/* Facilities Card */}
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationIcon sx={{ mr: 1 }} />
                      <Typography variant="h6">מצב מתקנים</Typography>
                    </Box>
                    {demoFacilities.map((facility) => (
                      <Box key={facility.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="body2">{facility.name}:</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={facility.status === 'open' ? 'פתוח' : facility.status === 'busy' ? 'עמוס' : 'סגור'}
                            color={getStatusColor(facility.status) as any}
                            size="small"
                          />
                          <Typography variant="caption">{facility.hours}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>

              {/* Tasks Card */}
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      <Typography variant="h6">תזכורות יומיות</Typography>
                    </Box>
                    {demoTasks.map((task) => (
                      <Box 
                        key={task.id} 
                        sx={{ 
                          p: 2, 
                          mb: 1, 
                          border: '1px solid #e0e0e0',
                          borderRadius: 1,
                          backgroundColor: task.priority === 'urgent' ? '#ffebee' : '#e3f2fd'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          {task.priority === 'urgent' ? <WarningIcon color="error" /> : <TimeIcon color="primary" />}
                          <Typography variant="body2" fontWeight="bold">
                            {task.title}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {task.course} - {task.dueDate}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Other sections can be added here */}
        {activeSection !== 'home' && (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5">
              {navigationItems.find(item => item.id === activeSection)?.label}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              תוכן זה יפותח בהמשך...
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)}>
        <DialogTitle>התחברות למערכת</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              חשבונות דמו זמינים:
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>סטודנט:</strong> student@campus.ac.il / 123456
              </Typography>
              <Typography variant="body2">
                <strong>מרצה:</strong> lecturer@campus.ac.il / 123456
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="אימייל"
              variant="outlined"
              margin="normal"
              id="login-email"
            />
            <TextField
              fullWidth
              label="סיסמה"
              type="password"
              variant="outlined"
              margin="normal"
              id="login-password"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialogOpen(false)}>ביטול</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              const email = (document.getElementById('login-email') as HTMLInputElement)?.value;
              const password = (document.getElementById('login-password') as HTMLInputElement)?.value;
              if (email && password) {
                handleLogin(email, password);
              }
            }}
          >
            התחבר
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
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
