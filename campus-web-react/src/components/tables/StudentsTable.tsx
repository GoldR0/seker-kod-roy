// Students Table Component
// Displays student data in a structured table format
// Manages its own state for students list

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Box,
  Typography,
  Tooltip,
  TablePagination,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Add as AddIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { Student, getStudentStatusInHebrew, getSemesterInHebrew, validateStudent } from '../../types/Student';
import { studentsData, getAllStudents } from '../../data/studentsData';

interface StudentsTableProps {
  onViewStudent?: (student: Student) => void;
  onEditStudent?: (student: Student) => void;
  onDeleteStudent?: (student: Student) => void;
}

interface Column {
  id: keyof Student | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any, student: Student) => React.ReactNode;
}

const StudentsTable: React.FC<StudentsTableProps> = ({
  onViewStudent,
  onEditStudent,
  onDeleteStudent
}) => {
  // State management for students list
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('info');

  // Initialize students data
  useEffect(() => {
    const loadStudents = () => {
      try {
        setLoading(true);
        const initialStudents = getAllStudents();
        setStudents(initialStudents);
        setError(null);
      } catch (err) {
        setError('שגיאה בטעינת נתוני סטודנטים');
        console.error('Error loading students:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  // CRUD Operations
  const addStudent = (newStudent: Student) => {
    try {
      const errors = validateStudent(newStudent);
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      setStudents(prevStudents => [...prevStudents, newStudent]);
      showSnackbar('סטודנט נוסף בהצלחה', 'success');
    } catch (err) {
      showSnackbar(`שגיאה בהוספת סטודנט: ${err instanceof Error ? err.message : 'שגיאה לא ידועה'}`, 'error');
    }
  };

  const updateStudent = (updatedStudent: Student) => {
    try {
      const errors = validateStudent(updatedStudent);
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      setStudents(prevStudents => 
        prevStudents.map(student => 
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
      showSnackbar('סטודנט עודכן בהצלחה', 'success');
    } catch (err) {
      showSnackbar(`שגיאה בעדכון סטודנט: ${err instanceof Error ? err.message : 'שגיאה לא ידועה'}`, 'error');
    }
  };

  const deleteStudent = (student: Student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(prevStudents => 
        prevStudents.filter(student => student.id !== studentToDelete.id)
      );
      showSnackbar('סטודנט נמחק בהצלחה', 'success');
    }
    setDeleteDialogOpen(false);
    setStudentToDelete(null);
  };

  const refreshStudents = () => {
    try {
      setLoading(true);
      const refreshedStudents = getAllStudents();
      setStudents(refreshedStudents);
      showSnackbar('רשימת סטודנטים רועננה', 'info');
    } catch (err) {
      showSnackbar('שגיאה ברענון נתונים', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleViewStudent = (student: Student) => {
    if (onViewStudent) {
      onViewStudent(student);
    } else {
      // Default view behavior
      showSnackbar(`צפייה בסטודנט: ${student.firstName} ${student.lastName}`, 'info');
    }
  };

  const handleEditStudent = (student: Student) => {
    if (onEditStudent) {
      onEditStudent(student);
    } else {
      // Default edit behavior
      showSnackbar(`עריכת סטודנט: ${student.firstName} ${student.lastName}`, 'info');
    }
  };

  const handleDeleteStudent = (student: Student) => {
    if (onDeleteStudent) {
      onDeleteStudent(student);
    } else {
      // Default delete behavior
      deleteStudent(student);
    }
  };

  // Define table columns
  const columns: Column[] = [
    {
      id: 'studentNumber',
      label: 'ת״ז',
      minWidth: 120,
      align: 'center'
    },
    {
      id: 'firstName',
      label: 'שם פרטי',
      minWidth: 120,
      align: 'right',
      format: (value) => (
        <Typography variant="body2" fontWeight="medium">
          {value}
        </Typography>
      )
    },
    {
      id: 'lastName',
      label: 'שם משפחה',
      minWidth: 120,
      align: 'right',
      format: (value) => (
        <Typography variant="body2" fontWeight="medium">
          {value}
        </Typography>
      )
    },
    {
      id: 'email',
      label: 'אימייל',
      minWidth: 200,
      align: 'right',
      format: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailIcon fontSize="small" color="action" />
          <Typography variant="body2" noWrap>
            {value}
          </Typography>
        </Box>
      )
    },
    {
      id: 'year',
      label: 'שנה',
      minWidth: 80,
      align: 'center',
      format: (value) => (
        <Chip 
          label={`שנה ${value}`} 
          size="small" 
          color="secondary"
        />
      )
    },
    {
      id: 'department',
      label: 'תואר (חוג)',
      minWidth: 140,
      align: 'right',
      format: (value) => (
        <Chip 
          label={value} 
          size="small" 
          color="primary" 
          variant="outlined"
          icon={<SchoolIcon />}
        />
      )
    },
    {
      id: 'gpa',
      label: 'ממוצע ציונים',
      minWidth: 120,
      align: 'center',
      format: (value) => (
        <Chip 
          label={value.toFixed(2)} 
          size="small" 
          color={value >= 3.5 ? 'success' : value >= 3.0 ? 'warning' : 'error'}
          variant="filled"
        />
      )
    },
    {
      id: 'phone',
      label: 'טלפון',
      minWidth: 120,
      align: 'right',
      format: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PhoneIcon fontSize="small" color="action" />
          <Typography variant="body2">
            {value}
          </Typography>
        </Box>
      )
    },
    {
      id: 'actions',
      label: 'פעולות',
      minWidth: 120,
      align: 'center',
      format: (value, student) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="צפייה בפרטים">
            <IconButton
              size="small"
              onClick={() => handleViewStudent(student)}
              sx={{ color: 'primary.main' }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="עריכה">
            <IconButton
              size="small"
              onClick={() => handleEditStudent(student)}
              sx={{ color: 'warning.main' }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="מחיקה">
            <IconButton
              size="small"
              onClick={() => handleDeleteStudent(student)}
              sx={{ color: 'error.main' }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentNumber.includes(searchTerm) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const paginatedStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Handle empty state
  if (!loading && students.length === 0) {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {/* Header with Actions */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            ניהול סטודנטים
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={refreshStudents}
              disabled={loading}
              size="small"
            >
              רענן
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => showSnackbar('פונקציונליות הוספת סטודנט תתווסף בקרוב', 'info')}
              size="small"
            >
              הוסף סטודנט
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            אין סטודנטים להצגה
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            לא נמצאו נתוני סטודנטים במערכת
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={refreshStudents}
            sx={{ mt: 2 }}
          >
            נסה שוב
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Header with Actions */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          ניהול סטודנטים
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={refreshStudents}
            disabled={loading}
            size="small"
          >
            רענן
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => showSnackbar('פונקציונליות הוספת סטודנט תתווסף בקרוב', 'info')}
            size="small"
          >
            הוסף סטודנט
          </Button>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="חיפוש סטודנטים..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </Box>

      {/* Loading State */}
      {loading && (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            טוען נתונים...
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Box sx={{ p: 2 }}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Box>
      )}

      {/* Table */}
      {!loading && (
        <>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="students table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{
                        backgroundColor: 'rgb(179, 209, 53)',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <TableRow
                      hover
                      key={student.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {column.format 
                            ? column.format(student[column.id as keyof Student], student)
                            : student[column.id as keyof Student]
                          }
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        {searchTerm ? 'לא נמצאו תוצאות לחיפוש' : 'אין סטודנטים להצגה'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {filteredStudents.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={filteredStudents.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="שורות בעמוד:"
              labelDisplayedRows={({ from, to, count }) => 
                `${from}-${to} מתוך ${count !== -1 ? count : `יותר מ-${to}`}`
              }
              sx={{
                '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                  direction: 'rtl'
                }
              }}
            />
          )}

          {/* Summary */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', backgroundColor: 'grey.50' }}>
            <Typography variant="body2" color="text.secondary">
              מציג {paginatedStudents.length} מתוך {filteredStudents.length} סטודנטים
              {searchTerm && ` (מסונן לפי: "${searchTerm}")`}
            </Typography>
          </Box>
        </>
      )}



             {/* Add Student Dialog - Placeholder for future implementation */}
       {/* This dialog will be implemented in the next phase */}
       
       {/* Edit Student Dialog - Placeholder for future implementation */}
       {/* This dialog will be implemented in the next phase */}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">אישור מחיקה</DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">
            האם אתה בטוח שברצונך למחוק את הסטודנט "{studentToDelete?.firstName} {studentToDelete?.lastName}"?
            פעולה זו לא תכופה.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            ביטול
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            מחק
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default StudentsTable;
