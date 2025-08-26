import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Avatar
} from '@mui/material';
import {
  Person as PersonIcon,
  Save as SaveIcon,
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

interface ProfilePageProps {
  currentUser: any;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  year: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser }) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: currentUser?.name?.split(' ')[0] || '',
    lastName: currentUser?.name?.split(' ')[1] || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: '',
    department: '',
    year: ''
  });
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const customColors = {
    primary: 'rgb(179, 209, 53)',
    primaryDark: 'rgb(159, 189, 33)',
    primaryLight: 'rgb(199, 229, 73)',
    textOnPrimary: 'white'
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = () => {
    setNotification({
      message: 'הפרופיל עודכן בהצלחה!',
      type: 'success'
    });
    
    // כאן אפשר להוסיף לוגיקה לשמירת הנתונים
    console.log('Profile data saved:', formData);
  };

  const handleClearForm = () => {
    setFormData({
      firstName: currentUser?.name?.split(' ')[0] || '',
      lastName: currentUser?.name?.split(' ')[1] || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: '',
      department: '',
      year: ''
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: customColors.primary }}>
          <PersonIcon sx={{ mr: 2, verticalAlign: 'middle', fontSize: 40 }} />
          פרופיל אישי
        </Typography>
        <Typography variant="h6" color="text.secondary">
          עדכון פרטי המשתמש האישיים
        </Typography>
      </Box>

      {/* Profile Form Card */}
      <Card sx={{ 
        maxWidth: 800, 
        mx: 'auto',
        boxShadow: 3,
        border: `2px solid ${customColors.primary}`
      }}>
        <CardContent sx={{ p: 4 }}>
          {/* User Avatar and Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 3, borderBottom: '1px solid #e0e0e0' }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: customColors.primary,
                mr: 3,
                fontSize: '2rem'
              }}
            >
              {currentUser?.name?.charAt(0) || 'U'}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: customColors.primary }}>
                {currentUser?.name || 'משתמש'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {currentUser?.role === 'student' ? 'סטודנט' : 
                 currentUser?.role === 'lecturer' ? 'מרצה' : 'משתמש'}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
            עדכון פרטי הפרופיל
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            <TextField
              fullWidth
              label="שם פרטי"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: customColors.primary
                  }
                }
              }}
            />
            
            <TextField
              fullWidth
              label="שם משפחה"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: customColors.primary
                  }
                }
              }}
            />
            
            <TextField
              fullWidth
              type="email"
              label="אימייל"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              sx={{ 
                gridColumn: { xs: '1', md: '1 / -1' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: customColors.primary
                  }
                }
              }}
            />
            
            <TextField
              fullWidth
              label="טלפון"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: customColors.primary
                  }
                }
              }}
            />
            
            <TextField
              fullWidth
              label="כתובת"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: customColors.primary
                  }
                }
              }}
            />
            
            <FormControl fullWidth>
              <InputLabel>חוג</InputLabel>
              <Select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: customColors.primary
                    }
                  }
                }}
              >
                <MenuItem value="computer-science">מדעי המחשב</MenuItem>
                <MenuItem value="engineering">הנדסה</MenuItem>
                <MenuItem value="business">ניהול</MenuItem>
                <MenuItem value="arts">אמנויות</MenuItem>
                <MenuItem value="medicine">רפואה</MenuItem>
                <MenuItem value="law">משפטים</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>שנה</InputLabel>
              <Select
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: customColors.primary
                    }
                  }
                }}
              >
                <MenuItem value="1">שנה א</MenuItem>
                <MenuItem value="2">שנה ב</MenuItem>
                <MenuItem value="3">שנה ג</MenuItem>
                <MenuItem value="4">שנה ד</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClearForm}
              sx={{
                borderColor: customColors.primary,
                color: customColors.primary,
                '&:hover': {
                  borderColor: customColors.primaryDark,
                  backgroundColor: customColors.primaryLight + '20'
                }
              }}
            >
              נקה טופס
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleFormSubmit}
              sx={{
                backgroundColor: customColors.primary,
                '&:hover': { backgroundColor: customColors.primaryDark }
              }}
            >
              שמור שינויים
            </Button>
          </Box>
        </CardContent>
      </Card>

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

export default ProfilePage;
