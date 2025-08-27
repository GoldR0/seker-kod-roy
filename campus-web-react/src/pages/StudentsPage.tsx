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
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material';
import {
  Add as AddIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { StudentsTable } from '../components/tables';
import { Student } from '../types/Student';
import { 
  getAllStudents, 
  getStudentsStatistics,
  getStudentsByStatus,
  getHighGPAStudents
} from '../data/studentsData';

interface TaskFormData {
  taskId: string;
  title: string;
  type: string;
  date: string;
  course: string;
}

interface CourseFormData {
  courseId: string;
  courseName: string;
  lecturer: string;
  semester: string;
  year: string;
  students: string;
  credits: string;
  selectedStudents: string[];
}

interface Task extends TaskFormData {
  createdAt: string;
}

interface Course extends CourseFormData {
  createdAt: string;
  selectedStudents: string[];
}

const StudentsPage: React.FC<{ currentUser: any }> = ({ currentUser }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [statistics, setStatistics] = useState<any>(null);
  
  // Form states
  const [taskCounter, setTaskCounter] = useState(1);
  const [courseCounter, setCourseCounter] = useState(1);
  const [taskFormData, setTaskFormData] = useState<TaskFormData>({
    taskId: `TASK-${String(taskCounter).padStart(3, '0')}`,
    title: '',
    type: '',
    date: '',
    course: ''
  });
  const [courseFormData, setCourseFormData] = useState<CourseFormData>({
    courseId: `COURSE-${String(courseCounter).padStart(3, '0')}`,
    courseName: '',
    lecturer: '',
    semester: '',
    year: '2025',
    students: '',
    credits: '',
    selectedStudents: []
  });

  // Tables data
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  // Delete dialogs state
  const [deleteTaskDialogOpen, setDeleteTaskDialogOpen] = useState(false);
  const [deleteCourseDialogOpen, setDeleteCourseDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  // Student selection dialog state
  const [studentSelectionDialogOpen, setStudentSelectionDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editMode, setEditMode] = useState(false);

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

  // Task form handlers
  const handleTaskInputChange = (field: string, value: any) => {
    setTaskFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTaskSubmit = () => {
    // בדיקה שהקורס קיים בטבלת הקורסים
    const courseExists = courses.some(course => course.courseId === taskFormData.course);
    
    if (!courseExists) {
      setNotification({
        message: 'לא ניתן ליצור מטלה עבור קורס שלא קיים. אנא בחר קורס מהרשימה.',
        type: 'error'
      });
      return;
    }

    // Create new task with creation date
    const newTask: Task = {
      ...taskFormData,
      createdAt: new Date().toLocaleString('he-IL')
    };

    // Add to tasks array
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    // Save to localStorage
    try {
      localStorage.setItem('campus-tasks-data', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }

    setNotification({
      message: `מטלה חדשה נוצרה בהצלחה! מזהה: ${taskFormData.taskId}`,
      type: 'success'
    });
    
    setTaskCounter(prev => prev + 1);
    setTaskFormData({
      taskId: `TASK-${String(taskCounter + 1).padStart(3, '0')}`,
      title: '',
      type: '',
      date: '',
      course: ''
    });
  };

  // Course form handlers
  const handleCourseInputChange = (field: string, value: any) => {
    setCourseFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCourseSubmit = () => {
    // Create new course with creation date
    const newCourse: Course = {
      ...courseFormData,
      createdAt: new Date().toLocaleString('he-IL'),
      selectedStudents: courseFormData.selectedStudents
    };

    // Add to courses array
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);

    // Save to localStorage
    try {
      localStorage.setItem('campus-courses-data', JSON.stringify(updatedCourses));
    } catch (error) {
      console.error('Error saving courses to localStorage:', error);
    }

    setNotification({
      message: `קורס חדש נוצר בהצלחה! מזהה: ${courseFormData.courseId}`,
      type: 'success'
    });
    
    setCourseCounter(prev => prev + 1);
    setCourseFormData({
      courseId: `COURSE-${String(courseCounter + 1).padStart(3, '0')}`,
      courseName: '',
      lecturer: '',
      semester: '',
      year: '2025',
      students: '',
      credits: '',
      selectedStudents: []
    });
  };

  // Student selection functions
  const handleOpenStudentSelection = () => {
    setStudentSelectionDialogOpen(true);
  };

  const handleStudentToggle = (studentId: string) => {
    setCourseFormData(prev => ({
      ...prev,
      selectedStudents: prev.selectedStudents.includes(studentId)
        ? prev.selectedStudents.filter(id => id !== studentId)
        : [...prev.selectedStudents, studentId]
    }));
  };

  const handleConfirmStudentSelection = () => {
    const selectedCount = courseFormData.selectedStudents.length;
    setCourseFormData(prev => ({
      ...prev,
      students: selectedCount.toString()
    }));
    setStudentSelectionDialogOpen(false);
    setNotification({
      message: `נבחרו ${selectedCount} סטודנטים לקורס`,
      type: 'success'
    });
  };

  const getSelectedStudentNames = () => {
    return courseFormData.selectedStudents
      .map(studentId => students.find(s => s.id === studentId)?.fullName)
      .filter(Boolean)
      .join(', ');
  };

  // Edit course students functions
  const handleEditCourseStudents = (course: Course) => {
    setEditingCourse(course);
    setCourseFormData(prev => ({
      ...prev,
      selectedStudents: course.selectedStudents || []
    }));
    setEditMode(true);
    setStudentSelectionDialogOpen(true);
  };

  const handleConfirmEditStudentSelection = () => {
    if (editingCourse) {
      const selectedCount = courseFormData.selectedStudents.length;
      
      // Update the course in the courses array
      const updatedCourses = courses.map(course => {
        if (course.courseId === editingCourse.courseId) {
          return {
            ...course,
            students: selectedCount.toString(),
            selectedStudents: courseFormData.selectedStudents
          };
        }
        return course;
      });
      
      setCourses(updatedCourses);
      
      // Save to localStorage
      try {
        localStorage.setItem('campus-courses-data', JSON.stringify(updatedCourses));
      } catch (error) {
        console.error('Error saving courses to localStorage:', error);
      }

      setNotification({
        message: `עודכנו ${selectedCount} סטודנטים בקורס ${editingCourse.courseName}`,
        type: 'success'
      });
    }
    
    setStudentSelectionDialogOpen(false);
    setEditMode(false);
    setEditingCourse(null);
    setCourseFormData(prev => ({
      ...prev,
      selectedStudents: []
    }));
  };

  const getCourseStudentNames = (course: Course) => {
    return (course.selectedStudents || [])
      .map(studentId => students.find(s => s.id === studentId)?.fullName)
      .filter(Boolean)
      .join(', ');
  };

  // Delete functions
  const handleDeleteTask = (task: Task) => {
    setTaskToDelete(task);
    setDeleteTaskDialogOpen(true);
  };

  const handleDeleteCourse = (course: Course) => {
    // בדיקה אם יש מטלות שמשתמשות בקורס זה
    const tasksUsingCourse = tasks.filter(task => task.course === course.courseId);
    
    if (tasksUsingCourse.length > 0) {
      setNotification({
        message: `לא ניתן למחוק קורס זה כי יש ${tasksUsingCourse.length} מטלות שמשתמשות בו. מחק תחילה את המטלות.`,
        type: 'error'
      });
      return;
    }

    setCourseToDelete(course);
    setDeleteCourseDialogOpen(true);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      const updatedTasks = tasks.filter(task => task.taskId !== taskToDelete.taskId);
      setTasks(updatedTasks);
      
      // Save to localStorage
      try {
        localStorage.setItem('campus-tasks-data', JSON.stringify(updatedTasks));
      } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
      }
      
      setNotification({
        message: `המטלה "${taskToDelete.title}" נמחקה בהצלחה`,
        type: 'success'
      });
      setDeleteTaskDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  const confirmDeleteCourse = () => {
    if (courseToDelete) {
      const updatedCourses = courses.filter(course => course.courseId !== courseToDelete.courseId);
      setCourses(updatedCourses);
      
      // Save to localStorage
      try {
        localStorage.setItem('campus-courses-data', JSON.stringify(updatedCourses));
      } catch (error) {
        console.error('Error saving courses to localStorage:', error);
      }
      
      setNotification({
        message: `הקורס "${courseToDelete.courseName}" נמחק בהצלחה`,
        type: 'success'
      });
      setDeleteCourseDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'rgb(179, 209, 53)' }}>
          <SchoolIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          ניהול לימודים
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
          variant="contained"
          onClick={saveStudentsToLocalStorage}
          sx={{ 
            backgroundColor: 'rgb(179, 209, 53)',
            '&:hover': { backgroundColor: 'rgb(159, 189, 33)' }
          }}
        >
          שמירה
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
        <Button
          variant="outlined"
          onClick={() => {
            // Clear localStorage and reload students
            localStorage.removeItem('campus-students-data');
            const allStudents = getAllStudents();
            
            // Ensure Israel Israeli is in the students list
            const israelExists = allStudents.some(student => student.id === '123456789');
            if (!israelExists) {
              const israelStudent: Student = {
                id: '123456789',
                studentNumber: '2024001',
                firstName: 'ישראל',
                lastName: 'ישראלי',
                fullName: 'ישראל ישראלי',
                email: 'student@campus.ac.il',
                phone: '050-1234567',
                address: 'רחוב הרצל 15, תל אביב',
                department: 'מדעי המחשב',
                year: 2,
                semester: 'א',
                creditsCompleted: 45,
                gpa: 3.8,
                birthDate: '2002-05-15',
                age: 22,
                gender: 'male',
                city: 'תל אביב',
                status: 'active',
                enrollmentDate: '2022-10-01',
                lastActive: '2024-12-01',
                emergencyContact: 'שרה ישראלי',
                emergencyPhone: '050-9876543',
                notes: 'סטודנט מצטיין'
              };
              allStudents.unshift(israelStudent);
            }
            
            setStudents(allStudents);
            setStatistics(getStudentsStatistics());
            setNotification({
              message: 'נתוני הסטודנטים אופסו והוטענו מחדש',
              type: 'success'
            });
          }}
          sx={{ 
            borderColor: '#FF5722',
            color: '#FF5722',
            '&:hover': { 
              borderColor: '#D84315',
              backgroundColor: 'rgba(255, 87, 34, 0.1)'
            }
          }}
        >
          אופס נתונים
        </Button>
      </Box>

      {/* Students Table */}
      <StudentsTable
        students={students}
        onViewStudent={handleViewStudent}
        onEditStudent={handleEditStudent}
        onDeleteStudent={handleDeleteStudent}
      />

      {/* Forms Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'rgb(179, 209, 53)', mb: 3 }}>
          <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          ניהול קורסים ומטלות
        </Typography>
        
        {/* Task Form */}
        <Card sx={{ mb: 4, border: '2px solid rgb(179, 209, 53)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AssignmentIcon sx={{ mr: 1, color: 'rgb(179, 209, 53)' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(179, 209, 53)' }}>
                יצירת מטלה חדשה
              </Typography>
            </Box>
            
            {courses.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  אין קורסים זמינים. יש ליצור קורס תחילה לפני יצירת מטלה.
                </Typography>
                <Chip 
                  label="צור קורס חדש" 
                  color="primary" 
                  variant="outlined"
                  onClick={() => {
                    // Scroll to course form
                    const courseForm = document.querySelector('[data-course-form]');
                    if (courseForm) {
                      courseForm.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                  <TextField
                    fullWidth
                    label="מזהה מטלה"
                    value={taskFormData.taskId}
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
                    helperText="נוצר אוטומטית"
                    sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}
                  />
                  <TextField
                    fullWidth
                    label="כותרת"
                    value={taskFormData.title}
                    onChange={(e) => handleTaskInputChange('title', e.target.value)}
                    required
                  />
                  <FormControl fullWidth required>
                    <InputLabel>סוג</InputLabel>
                    <Select
                      value={taskFormData.type}
                      onChange={(e) => handleTaskInputChange('type', e.target.value)}
                    >
                      <MenuItem value="assignment">מטלה</MenuItem>
                      <MenuItem value="exam">מבחן</MenuItem>
                      <MenuItem value="quiz">בוחן</MenuItem>
                      <MenuItem value="presentation">הצגה</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    type="date"
                    label="תאריך"
                    value={taskFormData.date}
                    onChange={(e) => handleTaskInputChange('date', e.target.value)}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                  <FormControl fullWidth required>
                    <InputLabel>קורס</InputLabel>
                    <Select
                      value={taskFormData.course}
                      onChange={(e) => handleTaskInputChange('course', e.target.value)}
                    >
                      <MenuItem value="">בחר קורס</MenuItem>
                      {courses.map(course => (
                        <MenuItem key={course.courseId} value={course.courseId}>
                          {course.courseName} ({course.courseId})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={handleTaskSubmit}
                    sx={{
                      backgroundColor: 'rgb(179, 209, 53)',
                      '&:hover': { backgroundColor: 'rgb(159, 189, 33)' }
                    }}
                  >
                    יצירת מטלה
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>

        {/* Course Form */}
        <Card sx={{ border: '2px solid rgb(179, 209, 53)' }} data-course-form>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <BookIcon sx={{ mr: 1, color: 'rgb(179, 209, 53)' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(179, 209, 53)' }}>
                יצירת קורס חדש
              </Typography>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
              <TextField
                fullWidth
                label="מזהה קורס"
                value={courseFormData.courseId}
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
                helperText="נוצר אוטומטית"
                sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}
              />
              <TextField
                fullWidth
                label="שם קורס"
                value={courseFormData.courseName}
                onChange={(e) => handleCourseInputChange('courseName', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="מרצה אחראי"
                value={courseFormData.lecturer}
                onChange={(e) => handleCourseInputChange('lecturer', e.target.value)}
                required
              />
              <FormControl fullWidth required>
                <InputLabel>סמסטר</InputLabel>
                <Select
                  value={courseFormData.semester}
                  onChange={(e) => handleCourseInputChange('semester', e.target.value)}
                >
                  <MenuItem value="a">סמסטר א</MenuItem>
                  <MenuItem value="b">סמסטר ב</MenuItem>
                  <MenuItem value="summer">סמסטר קיץ</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="שנה"
                value={courseFormData.year}
                onChange={(e) => handleCourseInputChange('year', e.target.value)}
                required
                inputProps={{ min: '2025' }}
              />
              <TextField
                fullWidth
                label="סטודנטים רשומים"
                value={courseFormData.students}
                onChange={(e) => handleCourseInputChange('students', e.target.value)}
                type="number"
                inputProps={{ min: 0 }}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <Button
                      size="small"
                      onClick={handleOpenStudentSelection}
                      sx={{ mr: -1 }}
                    >
                      בחר סטודנטים
                    </Button>
                  )
                }}
              />
              {courseFormData.selectedStudents.length > 0 && (
                <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' }, mt: -2, mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    סטודנטים נבחרים: {getSelectedStudentNames()}
                  </Typography>
                </Box>
              )}
              <TextField
                fullWidth
                label="נקודות זכות"
                value={courseFormData.credits}
                onChange={(e) => handleCourseInputChange('credits', e.target.value)}
                type="number"
                inputProps={{ min: 0, max: 10 }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleCourseSubmit}
                sx={{
                  backgroundColor: 'rgb(179, 209, 53)',
                  '&:hover': { backgroundColor: 'rgb(159, 189, 33)' }
                }}
              >
                יצירת קורס
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Tables Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'rgb(179, 209, 53)', mb: 3 }}>
          <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          רשימת מטלות וקורסים
        </Typography>

        {/* Tasks Table */}
        <Card sx={{ mb: 4, border: '2px solid rgb(179, 209, 53)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AssignmentIcon sx={{ mr: 1, color: 'rgb(179, 209, 53)' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(179, 209, 53)' }}>
                מטלות שנוצרו ({tasks.length})
              </Typography>
            </Box>
            
            {tasks.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                אין מטלות עדיין. צור מטלה חדשה באמצעות הטופס למעלה.
              </Typography>
            ) : (
              <Box sx={{ overflowX: 'auto' }}>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'auto 1fr 1fr 1fr auto auto',
                  gap: 2,
                  p: 2,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1,
                  mb: 2,
                  fontWeight: 'bold',
                  fontSize: '0.875rem'
                }}>
                  <Box>מזהה</Box>
                  <Box>כותרת</Box>
                  <Box>סוג</Box>
                  <Box>תאריך</Box>
                  <Box>קורס</Box>
                  <Box>פעולות</Box>
                </Box>
                
                {tasks.map((task, index) => (
                  <Box key={task.taskId} sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'auto 1fr 1fr 1fr auto auto',
                    gap: 2,
                    p: 2,
                    borderBottom: '1px solid #e0e0e0',
                    '&:hover': { backgroundColor: '#f9f9f9' },
                    '&:last-child': { borderBottom: 'none' }
                  }}>
                    <Box sx={{ fontWeight: 'bold', color: 'rgb(179, 209, 53)' }}>{task.taskId}</Box>
                    <Box>{task.title}</Box>
                    <Box>
                      <Chip 
                        label={task.type === 'assignment' ? 'מטלה' : 
                               task.type === 'exam' ? 'מבחן' : 
                               task.type === 'quiz' ? 'בוחן' : 'הצגה'} 
                        size="small" 
                        color="primary"
                      />
                    </Box>
                    <Box>{task.date}</Box>
                    <Box>{task.course}</Box>
                    <Box>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteTask(task)}
                        sx={{ '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' } }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Courses Table */}
        <Card sx={{ border: '2px solid rgb(179, 209, 53)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <BookIcon sx={{ mr: 1, color: 'rgb(179, 209, 53)' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(179, 209, 53)' }}>
                קורסים שנוצרו ({courses.length})
              </Typography>
            </Box>
            
            {courses.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                אין קורסים עדיין. צור קורס חדש באמצעות הטופס למעלה.
              </Typography>
            ) : (
              <Box sx={{ overflowX: 'auto' }}>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr 1fr auto auto auto',
                  gap: 2,
                  p: 2,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1,
                  mb: 2,
                  fontWeight: 'bold',
                  fontSize: '0.875rem'
                }}>
                  <Box>מזהה</Box>
                  <Box>שם קורס</Box>
                  <Box>מרצה</Box>
                  <Box>סמסטר</Box>
                  <Box>שנה</Box>
                  <Box>סטודנטים</Box>
                  <Box>נקודות</Box>
                  <Box>פעולות</Box>
                </Box>
                
                {courses.map((course, index) => (
                  <Box key={course.courseId} sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr 1fr auto auto auto',
                    gap: 2,
                    p: 2,
                    borderBottom: '1px solid #e0e0e0',
                    '&:hover': { backgroundColor: '#f9f9f9' },
                    '&:last-child': { borderBottom: 'none' }
                  }}>
                    <Box sx={{ fontWeight: 'bold', color: 'rgb(179, 209, 53)' }}>{course.courseId}</Box>
                    <Box>{course.courseName}</Box>
                    <Box>{course.lecturer}</Box>
                    <Box>
                      <Chip 
                        label={course.semester === 'a' ? 'סמסטר א' : 
                               course.semester === 'b' ? 'סמסטר ב' : 'סמסטר קיץ'} 
                        size="small" 
                        color="secondary"
                      />
                    </Box>
                    <Box>{course.year}</Box>
                    <Box>
                      <Typography variant="body2">
                        {course.students || '-'}
                      </Typography>
                    </Box>
                    <Box>{course.credits || '-'}</Box>
                    <Box>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditCourseStudents(course)}
                        sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' } }}
                      >
                        <PeopleIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteCourse(course)}
                        sx={{ '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' } }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

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

      {/* Delete Task Confirmation Dialog */}
      <Dialog open={deleteTaskDialogOpen} onClose={() => setDeleteTaskDialogOpen(false)}>
        <DialogTitle>אישור מחיקת מטלה</DialogTitle>
        <DialogContent>
          <Typography>
            האם אתה בטוח שברצונך למחוק את המטלה "{taskToDelete?.title}"?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            פעולה זו אינה הפיכה.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTaskDialogOpen(false)}>ביטול</Button>
          <Button 
            onClick={confirmDeleteTask} 
            color="error" 
            variant="contained"
          >
            מחיקה
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Course Confirmation Dialog */}
      <Dialog open={deleteCourseDialogOpen} onClose={() => setDeleteCourseDialogOpen(false)}>
        <DialogTitle>אישור מחיקת קורס</DialogTitle>
        <DialogContent>
          <Typography>
            האם אתה בטוח שברצונך למחוק את הקורס {courseToDelete?.courseName}?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            פעולה זו אינה הפיכה.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteCourseDialogOpen(false)}>ביטול</Button>
          <Button 
            onClick={confirmDeleteCourse} 
            color="error" 
            variant="contained"
          >
            מחיקה
          </Button>
        </DialogActions>
      </Dialog>

      {/* Student Selection Dialog */}
      <Dialog 
        open={studentSelectionDialogOpen} 
        onClose={() => {
          setStudentSelectionDialogOpen(false);
          setEditMode(false);
          setEditingCourse(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editMode ? `עריכת סטודנטים בקורס ${editingCourse?.courseName}` : 'בחירת סטודנטים לקורס'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {editMode ? 'עדכן את הסטודנטים בקורס:' : 'סמן את הסטודנטים שברצונך לצרף לקורס:'}
          </Typography>
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {students.map((student) => (
              <ListItem key={student.id} disablePadding>
                <ListItemButton 
                  dense
                  onClick={() => handleStudentToggle(student.id)}
                >
                  <Checkbox
                    edge="start"
                    checked={courseFormData.selectedStudents.includes(student.id)}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText
                    primary={student.fullName}
                    secondary={`${student.studentNumber} - ${student.department}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {courseFormData.selectedStudents.length > 0 && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                נבחרו {courseFormData.selectedStudents.length} סטודנטים
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setStudentSelectionDialogOpen(false);
            setEditMode(false);
            setEditingCourse(null);
          }}>
            ביטול
          </Button>
          <Button 
            onClick={editMode ? handleConfirmEditStudentSelection : handleConfirmStudentSelection}
            variant="contained"
            sx={{ 
              backgroundColor: 'rgb(179, 209, 53)',
              '&:hover': { backgroundColor: 'rgb(159, 189, 33)' }
            }}
          >
            {editMode ? 'עדכן בחירה' : 'אישור בחירה'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentsPage;
