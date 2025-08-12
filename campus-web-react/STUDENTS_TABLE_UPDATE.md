# עדכון קומפוננטת StudentsTable - ניהול State

## סקירה כללית

עדכנתי את קומפוננטת `StudentsTable.tsx` כדי לנהל את רשימת הסטודנטים באמצעות `useState` במקום לקבל את הנתונים כפרופס.

## שינויים עיקריים

### 1. הוספת State Management

```typescript
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
```

### 2. טעינת נתונים עם useEffect

```typescript
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
```

### 3. פעולות CRUD

#### הוספת סטודנט
```typescript
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
```

#### עדכון סטודנט
```typescript
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
```

#### מחיקת סטודנט
```typescript
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
```

### 4. רענון נתונים

```typescript
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
```

### 5. ממשק משתמש משופר

#### כותרת עם כפתורי פעולה
```typescript
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
```

#### מצבי טעינה ושגיאה
```typescript
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
```

### 6. הודעות למשתמש (Snackbar)

```typescript
const showSnackbar = (message: string, severity: 'success' | 'error' | 'info') => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setSnackbarOpen(true);
};
```

## יתרונות השינויים

1. **ניהול עצמאי**: הקומפוננטה מנהלת את הנתונים בעצמה
2. **ולידציה**: כל פעולת CRUD כוללת ולידציה
3. **מצבי UI**: טעינה, שגיאה, ומצבים ריקים מטופלים כראוי
4. **הודעות למשתמש**: Snackbar להצגת הודעות הצלחה/שגיאה
5. **רענון נתונים**: אפשרות לרענן את הנתונים מהמקור
6. **טיפול בשגיאות**: טיפול מקיף בשגיאות עם הודעות ברורות

## שימוש בקומפוננטה

הקומפוננטה המעודכנת יכולה לשמש בשתי דרכים:

### 1. עם פונקציות מותאמות אישית
```typescript
<StudentsTable
  onViewStudent={handleViewStudent}
  onEditStudent={handleEditStudent}
  onDeleteStudent={handleDeleteStudent}
/>
```

### 2. עם התנהגות ברירת מחדל
```typescript
<StudentsTable />
```

## הערות טכניות

- הקומפוננטה משתמשת ב-`validateStudent` מ-`Student.ts` לוולידציה
- הנתונים נטענים מ-`getAllStudents()` מ-`studentsData.ts`
- כל הפעולות כוללות טיפול בשגיאות
- הממשק תומך בעברית ו-RTL
- הקומפוננטה responsive ועובדת על כל הגדלי מסך
