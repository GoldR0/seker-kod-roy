import React, { useState } from 'react';
import { Box, Container, Alert, Snackbar } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/dashboard/Dashboard';
import PlaceholderContent from './components/PlaceholderContent';
import StudentsPage from './pages/StudentsPage';
import CommunityPage from './components/CommunityPage';
import { useAuth } from './hooks/useAuth';
import { useNotifications } from './hooks/useNotifications';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const { currentUser, handleLogin, handleLogout } = useAuth();
  const { notification, showNotification, hideNotification } = useNotifications();

  const onLogin = (email: string, password: string) => {
    const result = handleLogin(email, password);
    showNotification(result.message, result.success ? 'success' : 'error');
  };

  const onLogout = () => {
    const result = handleLogout();
    showNotification(result.message, 'success');
  };

  // Custom color theme
  const customColors = {
    primary: 'rgb(179, 209, 53)',
    primaryDark: 'rgb(159, 189, 33)',
    primaryLight: 'rgb(199, 229, 73)',
    textOnPrimary: 'white'
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header Component */}
      <Header
        currentUser={currentUser}
        onLogin={onLogin}
        onLogout={onLogout}
        onNavigate={setActiveSection}
        currentSection={activeSection}
      />

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
        {activeSection === 'home' && (
          <Dashboard currentUser={currentUser} />
        )}

        {/* Students Page */}
        {activeSection === 'students' && (
          <StudentsPage />
        )}

        {/* Community Page */}
        {activeSection === 'community' && (
          <CommunityPage currentUser={currentUser} />
        )}
        
        {/* Other sections */}
        {activeSection !== 'home' && activeSection !== 'students' && activeSection !== 'community' && (
          <PlaceholderContent activeSection={activeSection} customColors={customColors} />
        )}
      </Container>

      {/* Footer Component */}
      <Footer />

      {/* Notification Snackbar */}
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={hideNotification}
      >
        <Alert 
          onClose={hideNotification} 
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
