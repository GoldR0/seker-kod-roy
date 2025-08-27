import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Group as GroupIcon,
  Send as SendIcon
} from '@mui/icons-material';
import FacilitiesCard from './dashboard/FacilitiesCard';

interface CommunityPageProps {
  currentUser: any;
}

interface InquiryFormData {
  inquiryId: string;
  category: string;
  description: string;
  date: string;
  location: string;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ currentUser }) => {
  // Custom color theme
  const customColors = {
    primary: 'rgb(179, 209, 53)',
    primaryDark: 'rgb(159, 189, 33)',
    primaryLight: 'rgb(199, 229, 73)',
    textOnPrimary: 'white'
  };

  // Inquiry form state
  const [inquiryCounter, setInquiryCounter] = useState(1);
  const [inquiryFormData, setInquiryFormData] = useState<InquiryFormData>({
    inquiryId: `INQUIRY-${String(inquiryCounter).padStart(3, '0')}`,
    category: '',
    description: '',
    date: '',
    location: ''
  });
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);



  // Inquiry form handlers
  const handleInquiryInputChange = (field: string, value: any) => {
    setInquiryFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInquirySubmit = () => {
    setNotification({
      message: `פנייה חדשה נוצרה בהצלחה! מזהה: ${inquiryFormData.inquiryId}`,
      type: 'success'
    });
    
    setInquiryCounter(prev => prev + 1);
    setInquiryFormData({
      inquiryId: `INQUIRY-${String(inquiryCounter + 1).padStart(3, '0')}`,
      category: '',
      description: '',
      date: '',
      location: ''
    });
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 4, 
        p: 3, 
        backgroundColor: customColors.primaryLight + '20',
        borderRadius: 2,
        border: `2px solid ${customColors.primary}`
      }}>
        <GroupIcon sx={{ fontSize: 40, mr: 2, color: customColors.primary }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: customColors.primary }}>
            קהילת הקמפוס
          </Typography>
          <Typography variant="body1" color="text.secondary">
            מידע על מתקנים בקמפוס
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center'
      }}>
        {/* Facilities Card */}
        <Box sx={{ maxWidth: 800, width: '100%' }}>
          <FacilitiesCard customColors={customColors} />
        </Box>
      </Box>

      {/* Inquiry Form Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: customColors.primary, mb: 3 }}>
          <SendIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          פנייה חדשה
        </Typography>
        
        <Card sx={{ border: '2px solid rgb(179, 209, 53)' }}>
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
              <TextField
                fullWidth
                label="מזהה פנייה"
                value={inquiryFormData.inquiryId}
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
                sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}
              />
              <FormControl fullWidth required>
                <InputLabel>קטגוריה</InputLabel>
                <Select
                  value={inquiryFormData.category}
                  onChange={(e) => handleInquiryInputChange('category', e.target.value)}
                >
                  <MenuItem value="complaint">תלונה</MenuItem>
                  <MenuItem value="improvement">עצת שיפור</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="תיאור הפנייה"
                value={inquiryFormData.description}
                onChange={(e) => handleInquiryInputChange('description', e.target.value)}
                required
                sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}
              />
              <TextField
                fullWidth
                type="date"
                label="תאריך"
                value={inquiryFormData.date}
                onChange={(e) => handleInquiryInputChange('date', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="מיקום"
                value={inquiryFormData.location}
                onChange={(e) => handleInquiryInputChange('location', e.target.value)}
                required
                placeholder="למשל: בניין A, קומה 2, חדר 205"
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleInquirySubmit}
                sx={{
                  backgroundColor: 'rgb(179, 209, 53)',
                  '&:hover': { backgroundColor: 'rgb(159, 189, 33)' }
                }}
              >
                שליחת פנייה
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

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
    </Container>
  );
};

export default CommunityPage;
