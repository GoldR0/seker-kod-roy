// Students Page Component
// Manages student data and displays it using the StudentsTable component
// Handles data fetching, filtering, and actions

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Chip,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { StudentsTable } from '../components/tables';
import { Student } from '../types/Student';
import { 
  getAllStudents, 
  getStudentsStatistics,
  getStudentsByStatus,
  getHighGPAStudents
} from '../data/studentsData';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [statistics, setStatistics] = useState<any>(null);

  // Load statistics on component mount
  useEffect(() => {
    setStatistics(getStudentsStatistics());
  }, []);

  // Handle view student
  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setViewDialogOpen(true);
  };

  // Handle edit student (placeholder for future implementation)
  const handleEditStudent = (student: Student) => {
    setNotification({
      message: `עריכת סטודנט: ${student.fullName} - פונקציונליות תתווסף בהמשך`,
      type: 'success'
    });
  };

  // Handle delete student
  const handleDeleteStudent = (student: Student) => {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedStudent) {
      // Update students state
      setStudents(prev => {
        const updatedStudents = prev.filter(s => s.id !== selectedStudent.id);
        
        // Save updated data to localStorage
        try {
          const studentsJson = JSON.stringify(updatedStudents);
          localStorage.setItem('campus-students-data', studentsJson);
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
        
        return updatedStudents;
      });
      
      setNotification({
        message: `הסטודנט ${selectedStudent.fullName} נמחק בהצלחה`,
        type: 'success'
      });
      setDeleteDialogOpen(false);
      setSelectedStudent(null);
    }
  };

  // Get statistics
  const getActiveStudents = () => getStudentsByStatus('active');
  const getHighGPAStudentsList = () => getHighGPAStudents();

  // Add new student and save to localStorage
  const addNewStudent = () => {
    try {
      // Generate unique ID and student number
      const newId = Date.now().toString();
      const newStudentNumber = `2024${String(students.length + 1).padStart(3, '0')}`;
      
      // Create new student object
      const newStudent: Student = {
        id: newId,
        studentNumber: newStudentNumber,
        firstName: 'סטודנט',
        lastName: 'חדש',
        fullName: 'סטודנט חדש',
        email: `student${students.length + 1}@campus.ac.il`,
        phone: `050-${String(Math.floor(Math.random() * 9000000) + 1000000)}`,
        address: 'כתובת לדוגמה',
        department: 'מדעי המחשב',
        year: 1,
        semester: 'א',
        creditsCompleted: 0,
        gpa: 0.0,
        birthDate: new Date().toISOString().split('T')[0],
        age: 18,
        gender: 'male',
        city: 'תל אביב',
        status: 'active',
        enrollmentDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0],
        emergencyContact: 'הורה',
        emergencyPhone: '050-1234567',
        notes: 'סטודנט חדש שנוסף למערכת'
      };

      // Add to students array
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);

      // Save to localStorage
      const studentsJson = JSON.stringify(updatedStudents);
      localStorage.setItem('campus-students-data', studentsJson);

      setNotification({
        message: `סטודנט חדש נוסף בהצלחה! מספר סטודנט: ${newStudentNumber}`,
        type: 'success'
      });
      
      console.log('New student added:', newStudent);
      console.log('Updated students list:', updatedStudents);
    } catch (error) {
      console.error('Error adding new student:', error);
      setNotification({
        message: 'שגיאה בהוספת סטודנט חדש',
        type: 'error'
      });
    }
  };

  // Save students data to localStorage (legacy function)
  const saveStudentsToLocalStorage = () => {
    try {
      const studentsJson = JSON.stringify(students);
      localStorage.setItem('campus-students-data', studentsJson);
      setNotification({
        message: `נשמרו ${students.length} סטודנטים ב-localStorage בהצלחה`,
        type: 'success'
      });
      console.log('Students saved to localStorage:', students);
    } catch (error) {
      console.error('Error saving students to localStorage:', error);
      setNotification({
        message: 'שגיאה בשמירת הנתונים ב-localStorage',
        type: 'error'
      });
    }
  };

  // Load students from localStorage on component mount
  useEffect(() => {
    const loadStudentsFromLocalStorage = () => {
      try {
        const savedStudents = localStorage.getItem('campus-students-data');
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          setStudents(parsedStudents);
          setStatistics(getStudentsStatistics());
          console.log('Students loaded from localStorage:', parsedStudents);
        } else {
          // If no data in localStorage, load from demo data
          const allStudents = getAllStudents();
          setStudents(allStudents);
          setStatistics(getStudentsStatistics());
          console.log('Students loaded from demo data:', allStudents);
        }
      } catch (error) {
        console.error('Error loading students from localStorage:', error);
        // Fallback to demo data
        const allStudents = getAllStudents();
        setStudents(allStudents);
        setStatistics(getStudentsStatistics());
      }
    };

    loadStudentsFromLocalStorage();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'rgb(179, 209, 53)' }}>
          <SchoolIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          ניהול סטודנטים
        </Typography>
        <Typography variant="body1" color="text.secondary">
          מערכת ניהול מקיפה לסטודנטים במכללה
        </Typography>
      </Box>

      {/* Statistics Cards */}
      {statistics && (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4 
        }}>
          <Card sx={{ 
            border: '2px solid rgb(179, 209, 53)',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 40, color: 'rgb(179, 209, 53)', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {statistics.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                סה"כ סטודנטים
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ 
            border: '2px solid rgb(179, 209, 53)',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <SchoolIcon sx={{ fontSize: 40, color: 'rgb(179, 209, 53)', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {statistics.active}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                סטודנטים פעילים
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ 
            border: '2px solid rgb(179, 209, 53)',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: 'rgb(179, 209, 53)', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {statistics.averageGPA}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ממוצע ציונים
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ 
            border: '2px solid rgb(179, 209, 53)',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <WarningIcon sx={{ fontSize: 40, color: 'rgb(179, 209, 53)', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {getHighGPAStudentsList().length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                סטודנטים מצטיינים
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Action Buttons */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addNewStudent}
          sx={{ 
            backgroundColor: 'rgb(179, 209, 53)',
            '&:hover': { backgroundColor: 'rgb(159, 189, 33)' }
          }}
        >
          הוספת סטודנט חדש
        </Button>
        <Button
          variant="outlined"
          sx={{ 
            borderColor: 'rgb(179, 209, 53)',
            color: 'rgb(179, 209, 53)',
            '&:hover': { 
              borderColor: 'rgb(159, 189, 33)',
              backgroundColor: 'rgba(179, 209, 53, 0.1)'
            }
          }}
        >
          ייצוא לאקסל
        </Button>
        <Button
          variant="outlined"
          sx={{ 
            borderColor: 'rgb(179, 209, 53)',
            color: 'rgb(179, 209, 53)',
            '&:hover': { 
              borderColor: 'rgb(159, 189, 33)',
              backgroundColor: 'rgba(179, 209, 53, 0.1)'
            }
          }}
        >
          סינון מתקדם
        </Button>
      </Box>

      {/* Students Table */}
      <StudentsTable
        students={students}
        onViewStudent={handleViewStudent}
        onEditStudent={handleEditStudent}
        onDeleteStudent={handleDeleteStudent}
      />

      {/* View Student Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: 'rgb(179, 209, 53)', color: 'white' }}>
          פרטי סטודנט
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedStudent && (
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 3 
            }}>
              <Box>
                <Typography variant="h6" gutterBottom>מידע בסיסי</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">שם מלא:</Typography>
                  <Typography variant="body1" fontWeight="medium">{selectedStudent.fullName}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">מספר סטודנט:</Typography>
                  <Typography variant="body1">{selectedStudent.studentNumber}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">חוג:</Typography>
                  <Chip label={selectedStudent.department} color="primary" size="small" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">שנה:</Typography>
                  <Typography variant="body1">שנה {selectedStudent.year}</Typography>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="h6" gutterBottom>מידע אקדמי</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">ממוצע ציונים:</Typography>
                  <Chip 
                    label={selectedStudent.gpa.toFixed(2)} 
                    color={selectedStudent.gpa >= 3.5 ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">נקודות זכות:</Typography>
                  <Typography variant="body1">{selectedStudent.creditsCompleted}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">סטטוס:</Typography>
                  <Chip 
                    label={selectedStudent.status === 'active' ? 'פעיל' : 'לא פעיל'} 
                    color={selectedStudent.status === 'active' ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">סמסטר:</Typography>
                  <Typography variant="body1">{selectedStudent.semester}</Typography>
                </Box>
              </Box>
              
              <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>פרטי קשר</Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 2 
                }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">אימייל:</Typography>
                    <Typography variant="body1">{selectedStudent.email}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">טלפון:</Typography>
                    <Typography variant="body1">{selectedStudent.phone}</Typography>
                  </Box>
                  <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
                    <Typography variant="body2" color="text.secondary">כתובת:</Typography>
                    <Typography variant="body1">{selectedStudent.address}</Typography>
                  </Box>
                </Box>
              </Box>
              
              {selectedStudent.notes && (
                <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>הערות</Typography>
                  <Typography variant="body1">{selectedStudent.notes}</Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>סגור</Button>
          <Button 
            variant="contained"
            sx={{ 
              backgroundColor: 'rgb(179, 209, 53)',
              '&:hover': { backgroundColor: 'rgb(159, 189, 33)' }
            }}
          >
            עריכה
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>אישור מחיקה</DialogTitle>
        <DialogContent>
          <Typography>
            האם אתה בטוח שברצונך למחוק את הסטודנט {selectedStudent?.fullName}?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            פעולה זו אינה הפיכה.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>ביטול</Button>
          <Button 
            onClick={confirmDelete} 
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
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StudentsPage;
