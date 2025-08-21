
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container, Alert, Snackbar } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/dashboard/Dashboard';
import PlaceholderContent from './components/PlaceholderContent';
import StudentsPage from './pages/StudentsPage';
import CommunityPage from './components/CommunityPage';
import FormsPage from './pages/FormsPage';
import CafeteriaPage from './components/CafeteriaPage';
import HelpPage from './components/HelpPage';
import { useAuth } from './hooks/useAuth';
import { useNotifications } from './hooks/useNotifications';

function App() {
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
      />

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Dashboard currentUser={currentUser} />} />
          
          {/* Students Page */}
          <Route path="/students" element={<StudentsPage />} />
          
          {/* Forms Page */}
          <Route path="/forms" element={<FormsPage currentUser={currentUser} />} />
          
          {/* Community Page */}
          <Route path="/community" element={<CommunityPage currentUser={currentUser} />} />
          
          {/* Profile Page */}
          <Route path="/profile" element={<PlaceholderContent activeSection="profile" customColors={customColors} />} />
          
          {/* Learning Center Page */}
          <Route path="/learning" element={<PlaceholderContent activeSection="learning" customColors={customColors} />} />
          
          {/* Cafeteria Page */}
          <Route path="/cafeteria" element={<CafeteriaPage />} />
          
          {/* Lost and Found Page */}
          <Route path="/lostfound" element={<PlaceholderContent activeSection="lostfound" customColors={customColors} />} />
          
          {/* Course Forum Page */}
          <Route path="/course-forum" element={<PlaceholderContent activeSection="course-forum" customColors={customColors} />} />
          
          {/* Help Page */}
          <Route path="/help" element={<HelpPage />} />
        </Routes>
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