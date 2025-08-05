// Global variables
let currentUser = null;
let isLoggedIn = false;

// Demo users data
const demoUsers = {
    'student@campus.ac.il': {
        password: '123456',
        name: 'ישראל ישראלי',
        role: 'student',
        id: '123456789',
        email: 'student@campus.ac.il',
        phone: '050-1234567',
        age: 22,
        city: 'תל אביב',
        gender: 'male'
    },
    'lecturer@campus.ac.il': {
        password: '123456',
        name: 'ד"ר כהן',
        role: 'lecturer',
        id: '987654321',
        email: 'lecturer@campus.ac.il',
        phone: '050-9876543',
        age: 45,
        city: 'ירושלים',
        gender: 'male'
    }
};

// Courses data
const coursesData = {
    student: [
        {
            id: 'MATH101',
            title: 'מתמטיקה 1',
            lecturer: 'ד"ר כהן',
            credits: 6,
            semester: 'א',
            year: 2025,
            status: 'active',
            progress: 75,
            schedule: 'ימי ב, ד 10:00-12:00',
            room: 'אולם 101',
            assignments: 3,
            exams: 1
        },
        {
            id: 'PHYS101',
            title: 'פיזיקה 1',
            lecturer: 'פרופ\' לוי',
            credits: 6,
            semester: 'א',
            year: 2025,
            status: 'active',
            progress: 60,
            schedule: 'ימי א, ג 14:00-16:00',
            room: 'אולם 203',
            assignments: 2,
            exams: 1
        },
        {
            id: 'PROG101',
            title: 'תכנות בסיסי',
            lecturer: 'ד"ר גולדברג',
            credits: 4,
            semester: 'א',
            year: 2025,
            status: 'active',
            progress: 90,
            schedule: 'ימי ה 16:00-18:00',
            room: 'מעבדה 5',
            assignments: 5,
            exams: 0
        },
        {
            id: 'MATH201',
            title: 'מתמטיקה 2',
            lecturer: 'ד"ר כהן',
            credits: 6,
            semester: 'ב',
            year: 2025,
            status: 'upcoming',
            progress: 0,
            schedule: 'ימי ב, ד 10:00-12:00',
            room: 'אולם 101',
            assignments: 0,
            exams: 0
        }
    ],
    lecturer: [
        {
            id: 'MATH101',
            title: 'מתמטיקה 1',
            students: 45,
            credits: 6,
            semester: 'א',
            year: 2025,
            status: 'active',
            avgGrade: 85,
            schedule: 'ימי ב, ד 10:00-12:00',
            room: 'אולם 101',
            assignments: 3,
            exams: 1
        },
        {
            id: 'MATH201',
            title: 'מתמטיקה 2',
            students: 38,
            credits: 6,
            semester: 'ב',
            year: 2025,
            status: 'upcoming',
            avgGrade: 0,
            schedule: 'ימי ב, ד 10:00-12:00',
            room: 'אולם 101',
            assignments: 0,
            exams: 0
        },
        {
            id: 'ALG101',
            title: 'אלגוריתמים',
            students: 52,
            credits: 5,
            semester: 'א',
            year: 2025,
            status: 'active',
            avgGrade: 78,
            schedule: 'ימי ה 14:00-16:00',
            room: 'אולם 305',
            assignments: 4,
            exams: 1
        }
    ]
};

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content');

    // Login modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const userInfo = document.getElementById('userInfo');

    // Show login modal
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });

    // Close login modal
    closeBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const userType = document.getElementById('userType').value;

        // Check if user exists and credentials are correct
        if (demoUsers[email] && demoUsers[email].password === password && demoUsers[email].role === userType) {
            currentUser = demoUsers[email];
            isLoggedIn = true;
            
            // Update UI
            loginModal.style.display = 'none';
            loginBtn.style.display = 'none';
            userInfo.style.display = 'flex';
            
            document.getElementById('userName').textContent = currentUser.name;
            document.getElementById('userRole').textContent = currentUser.role === 'student' ? 'סטודנט' : 'מרצה';
            
            // Show admin button for lecturers
            if (currentUser.role === 'lecturer') {
                document.querySelector('.admin-only').style.display = 'inline-block';
                showNotification('ברוך הבא! התחברת כמרצה. כעת תוכל לגשת לאזור הניהול ולנהל סטודנטים.');
            } else {
                showNotification('התחברת בהצלחה!');
            }
            
            updateUserData();
        } else {
            showNotification('פרטי התחברות שגויים!', 'error');
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', function() {
        currentUser = null;
        isLoggedIn = false;
        
        // Update UI
        loginBtn.style.display = 'inline-block';
        userInfo.style.display = 'none';
        document.querySelector('.admin-only').style.display = 'none';
        
        // Reset forms
        loginForm.reset();
        
        // Go to home section
        showSection('home');
        
        showNotification('התנתקת בהצלחה!');
    });

    // Add click event listeners to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    // Function to show selected section
    function showSection(sectionId) {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav buttons
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Add active class to clicked button
        event.target.classList.add('active');
        
        // Update courses display when learning center is shown
        if (sectionId === 'learning' && currentUser) {
            updateCoursesDisplay();
        }
    }

    // Form handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if user is logged in for admin forms
            const formClass = form.className;
            if ((formClass.includes('student-form') || formClass.includes('admin-task-form') || 
                 formClass.includes('grade-form') || formClass.includes('course-form')) && 
                (!isLoggedIn || currentUser.role !== 'lecturer')) {
                showNotification('עליך להתחבר כמרצה כדי לבצע פעולה זו!', 'error');
                return;
            }
            
            // Get form type for specific handling
            let message = 'הטופס נשלח בהצלחה!';
            
            if (formClass.includes('task-form')) {
                message = 'המטלה נוספה בהצלחה!';
            } else if (formClass.includes('order-form')) {
                message = 'ההזמנה נשלחה בהצלחה!';
            } else if (formClass.includes('report-form')) {
                message = 'הדיווח נשלח בהצלחה!';
            } else if (formClass.includes('item-form')) {
                message = 'הפריט פורסם בהצלחה!';
            } else if (formClass.includes('room-booking-form')) {
                message = 'החדר הוזמן בהצלחה!';
            } else if (formClass.includes('transport-form')) {
                message = 'ההסעה הוזמנה בהצלחה!';
            } else if (formClass.includes('print-form')) {
                message = 'הקובץ נשלח להדפסה!';
            } else if (formClass.includes('issue-form')) {
                message = 'התקלה דווחה בהצלחה!';
            } else if (formClass.includes('suggestion-form')) {
                message = 'ההצעה נשלחה בהצלחה!';
            } else if (formClass.includes('profile-form')) {
                message = 'הפרטים עודכנו בהצלחה!';
            } else if (formClass.includes('chat-form')) {
                message = 'ההודעה נשלחה!';
                // Clear the input field for chat
                const input = form.querySelector('input');
                if (input) {
                    input.value = '';
                }
            } else if (formClass.includes('student-form')) {
                message = 'הסטודנט נוסף בהצלחה!';
                // Add student to table
                addStudentToTable(form);
            } else if (formClass.includes('admin-task-form')) {
                message = 'המטלה נוספה למערכת!';
                // Add task to student view
                addTaskToStudentView(form);
            } else if (formClass.includes('grade-form')) {
                message = 'הציון עודכן בהצלחה!';
                // Update grade in student view
                updateStudentGrade(form);
            } else if (formClass.includes('course-form')) {
                message = 'הקורס נוסף בהצלחה!';
            }
            
            showNotification(message);
            form.reset();
        });
    });

    // Handle contact buttons in marketplace
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('פרטי קשר נשלחו למוכר!');
        });
    });

    // Handle delete buttons in admin section
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            // Check if this is a student table delete button
            const studentRow = e.target.closest('#studentsTable tr');
            if (studentRow) {
                const studentName = studentRow.cells[1].textContent; // Name is in second column
                if (confirm(`האם אתה בטוח שברצונך למחוק את הסטודנט ${studentName}?`)) {
                    studentRow.remove();
                    showNotification(`הסטודנט ${studentName} נמחק בהצלחה!`);
                }
            } else {
                // Handle other delete buttons (tasks, etc.)
                if (confirm('האם אתה בטוח שברצונך למחוק פריט זה?')) {
                    e.target.closest('tr').remove();
                    showNotification('הפריט נמחק בהצלחה!');
                }
            }
        }
    });

    // Admin functions
    function addStudentToTable(form) {
        const formData = new FormData(form);
        const studentId = form.querySelector('input[placeholder="תעודת זהות"]').value;
        const firstName = form.querySelector('input[placeholder="שם פרטי"]').value;
        const lastName = form.querySelector('input[placeholder="שם משפחה"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const year = form.querySelector('input[type="number"]').value;
        
        const tbody = document.querySelector('#studentsTable tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${studentId}</td>
            <td>${firstName} ${lastName}</td>
            <td>${email}</td>
            <td>${year}</td>
            <td>
                <button class="btn small-btn">ערוך</button>
                <button class="btn small-btn delete-btn">מחק</button>
            </td>
        `;
        tbody.appendChild(newRow);
    }

    function addTaskToStudentView(form) {
        const formData = {
            type: form.querySelector('select').value,
            course: form.querySelector('select:nth-of-type(2)').value,
            title: form.querySelector('input[placeholder="הכנס כותרת מטלה"]').value,
            date: form.querySelector('input[type="date"]').value
        };
        
        // Add to daily reminders
        const remindersList = document.getElementById('dailyReminders');
        if (remindersList) {
            const newReminder = document.createElement('li');
            newReminder.textContent = `${formData.title} - ${formData.date}`;
            remindersList.appendChild(newReminder);
        }
        
        // Calculate priority
        const taskDate = new Date(formData.date);
        const today = new Date();
        const daysDiff = Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24));
        
        const priorityMap = {
            urgent: { class: 'urgent', text: 'דחוף מאוד', rowClass: 'task-urgent' },
            medium: { class: 'medium', text: 'בינוני', rowClass: 'task-medium' },
            low: { class: 'low', text: 'נמוך', rowClass: 'task-low' }
        };
        
        let priority = 'low';
        if (daysDiff <= 3) priority = 'urgent';
        else if (daysDiff <= 7) priority = 'medium';
        
        const priorityData = priorityMap[priority];
        
        // Add to tasks table
        const tasksTable = document.getElementById('tasksTable').querySelector('tbody');
        const newRow = document.createElement('tr');
        newRow.className = priorityData.rowClass;
        
        newRow.innerHTML = `
            <td><span class="task-type ${formData.type}">${getTaskTypeText(formData.type)}</span></td>
            <td>${formData.course}</td>
            <td>${formData.title}</td>
            <td>${formData.date}</td>
            <td><span class="priority ${priorityData.class}">${priorityData.text}</span></td>
            <td><span class="status pending">ממתין</span></td>
            <td>
                <button class="btn small-btn edit-btn">ערוך</button>
                <button class="btn small-btn delete-btn">מחק</button>
            </td>
        `;
        tasksTable.appendChild(newRow);
    }

    // Helper function to get Hebrew task type text
    function getTaskTypeText(type) {
        const typeMap = {
            'exam': 'מבחן',
            'assignment': 'עבודת הגשה',
            'homework': 'שיעורי בית',
            'quiz': 'בוחן',
            'task': 'מטלה',
            'presentation': 'הצגה'
        };
        return typeMap[type] || 'מטלה';
    }

    function updateStudentGrade(form) {
        const student = form.querySelector('select').value;
        const course = form.querySelector('select:nth-of-type(2)').value;
        const grade = form.querySelector('input[placeholder="ציון"]').value;
        const credits = form.querySelector('input[placeholder="נקודות זכות"]').value;
        
        // Update academic table in learning center
        const academicTable = document.getElementById('academicTable');
        if (academicTable) {
            const tbody = academicTable.querySelector('tbody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${course}</td>
                <td>${credits}</td>
                <td>${grade}</td>
                <td><span class="status completed">הושלם</span></td>
            `;
            tbody.appendChild(newRow);
        }
        
        // Update summary values
        updateAcademicSummary();
    }

    // Function to update academic summary values
    function updateAcademicSummary() {
        const academicTable = document.getElementById('academicTable');
        if (!academicTable) return;
        
        const rows = academicTable.querySelectorAll('tbody tr');
        let totalCredits = 0;
        let totalGrades = 0;
        let completedCourses = 0;
        
        rows.forEach(row => {
            const credits = parseInt(row.cells[1].textContent) || 0;
            const grade = parseInt(row.cells[2].textContent) || 0;
            
            totalCredits += credits;
            if (grade > 0) {
                totalGrades += grade;
                completedCourses++;
            }
        });
        
        const avgGrade = completedCourses > 0 ? (totalGrades / completedCourses).toFixed(1) : '0';
        
        // Update summary elements
        const totalCreditsElement = document.getElementById('totalCredits');
        const gradeAverageElement = document.getElementById('gradeAverage');
        const activeCoursesElement = document.getElementById('activeCourses');
        
        if (totalCreditsElement) totalCreditsElement.textContent = totalCredits;
        if (gradeAverageElement) gradeAverageElement.textContent = avgGrade;
        if (activeCoursesElement) activeCoursesElement.textContent = completedCourses;
    }

    // Chat widget functionality
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget) {
        chatWidget.addEventListener('click', function() {
            showNotification('צ\'אט עזרה - זמין 24/7');
        });
    }

    // Function to show notifications
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.zIndex = '1000';
        notification.style.animation = 'slideIn 0.3s ease-out';
        
        // Add error styling
        if (type === 'error') {
            notification.style.background = '#ff6b6b';
        }

        // Add to page
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Unified function to update all UI elements
    function updateUserData() {
        if (!currentUser) return;
        
        // Update role-specific data
        const userData = {
            student: {
                activeCourses: '6',
                creditPoints: '45', 
                gradeAverage: '85',
                totalCredits: '16',
                gradeAverageSummary: '88.3',
                activeCoursesSummary: '3'
            },
            lecturer: {
                activeCourses: '3',
                creditPoints: '18',
                gradeAverage: '87',
                totalCredits: '18',
                gradeAverageSummary: '87',
                activeCoursesSummary: '3'
            }
        };
        
        const data = userData[currentUser.role];
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                const element = document.getElementById(key);
                if (element) element.textContent = value;
            });
        }
        
        // Update courses display
        updateCoursesDisplay();
        
        // Update profile form
        updateProfileForm();
    }

    // Function to update profile form with user data
    function updateProfileForm() {
        if (!currentUser) return;
        
        const profileForm = document.querySelector('.profile-form');
        if (!profileForm) return;
        
        const formData = {
            email: currentUser.email || 'israel@campus.ac.il',
            phone: currentUser.phone || '050-1234567',
            age: currentUser.age || '22',
            city: currentUser.city || 'תל אביב',
            degree: currentUser.role === 'lecturer' ? 'phd' : 'bachelor',
            gender: currentUser.gender || 'male'
        };
        
        // Update form fields
        const emailInput = profileForm.querySelector('input[type="email"]');
        const phoneInput = profileForm.querySelector('input[type="tel"]');
        const ageInput = profileForm.querySelector('input[type="number"]');
        const cityInput = profileForm.querySelector('input[type="text"]:not([readonly])');
        const degreeSelect = profileForm.querySelector('select');
        const genderSelect = profileForm.querySelectorAll('select')[1];
        
        if (emailInput) emailInput.value = formData.email;
        if (phoneInput) phoneInput.value = formData.phone;
        if (ageInput) ageInput.value = formData.age;
        if (cityInput) cityInput.value = formData.city;
        if (degreeSelect) degreeSelect.value = formData.degree;
        if (genderSelect) genderSelect.value = formData.gender;
    }

    // Function to update courses display
    function updateCoursesDisplay() {
        if (!currentUser) return;
        
        const containers = {
            userCourses: document.getElementById('userCourses'),
            courseProgress: document.getElementById('courseProgress')
        };
        
        const courses = coursesData[currentUser.role] || [];
        
        Object.entries(containers).forEach(([key, container]) => {
            if (!container) return;
            
            container.innerHTML = '';
            
            if (courses.length === 0) {
                const message = key === 'userCourses' ? 'אין קורסים זמינים' : 'אין התקדמות להצגה';
                container.innerHTML = `<p style="text-align: center; color: #666;">${message}</p>`;
            } else {
                courses.forEach(course => {
                    const element = key === 'userCourses' ? createCourseElement(course) : createProgressElement(course);
                    container.appendChild(element);
                });
            }
        });
    }

    // Function to create course element
    function createCourseElement(course) {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course-item';
        
        const statusText = { 'active': 'פעיל', 'completed': 'הושלם', 'upcoming': 'קרוב' };
        const statusClass = { 'active': 'active', 'completed': 'completed', 'upcoming': 'upcoming' };
        
        const detailKey = currentUser.role === 'student' ? 'מרצה' : 'סטודנטים';
        const detailValue = currentUser.role === 'student' ? course.lecturer : course.students;
        
        courseDiv.innerHTML = `
            <div class="course-header">
                <span class="course-title">${course.title}</span>
                <span class="course-code">${course.id}</span>
            </div>
            <div class="course-details">
                <div class="course-detail"><strong>${detailKey}:</strong> ${detailValue}</div>
                <div class="course-detail"><strong>נקודות זכות:</strong> ${course.credits}</div>
                <div class="course-detail"><strong>מערכת:</strong> ${course.schedule}</div>
                <div class="course-detail"><strong>חדר:</strong> ${course.room}</div>
            </div>
            <div class="course-detail">
                <strong>מטלות:</strong> ${course.assignments} | <strong>מבחנים:</strong> ${course.exams}
            </div>
            <span class="course-status ${statusClass[course.status]}">${statusText[course.status]}</span>
        `;
        
        return courseDiv;
    }

    // Function to create progress element
    function createProgressElement(course) {
        const progressDiv = document.createElement('div');
        progressDiv.className = 'progress-item';
        
        const percentage = currentUser.role === 'student' ? course.progress : course.avgGrade;
        const detailKey = currentUser.role === 'student' ? 'מטלות שהושלמו' : 'סטודנטים';
        const detailValue = currentUser.role === 'student' ? course.assignments : course.students;
        const secondDetail = currentUser.role === 'student' ? 'מבחנים' : 'מטלות';
        const secondValue = currentUser.role === 'student' ? course.exams : course.assignments;
        
        progressDiv.innerHTML = `
            <div class="progress-header">
                <span class="progress-title">${course.title}</span>
                <span class="progress-percentage">${percentage}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="progress-details">
                <div class="progress-detail"><strong>${detailKey}:</strong> ${detailValue}</div>
                <div class="progress-detail"><strong>${secondDetail}:</strong> ${secondValue}</div>
            </div>
        `;
        
        return progressDiv;
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize task table functionality
    initializeTaskTable();
    updateTaskStats();
    
             // Initialize rating system
    initializeRatingSystem();
    
    // Initialize submit rating functionality
    initializeSubmitRating();
    
    // Initialize course forum
    initializeCourseForum();
}); 

// Add click functionality to task status cells
function initializeTaskTable() {
    const tasksTable = document.getElementById('tasksTable');
    if (!tasksTable) return;
    
    tasksTable.addEventListener('click', function(e) {
        const target = e.target;
        
        // Handle status changes
        if (target.classList.contains('status')) {
            const currentStatus = target.textContent;
            let newStatus, newClass;
            
            switch(currentStatus) {
                case 'ממתין':
                    newStatus = 'בביצוע';
                    newClass = 'in-progress';
                    break;
                case 'בביצוע':
                    newStatus = 'הושלם';
                    newClass = 'completed';
                    break;
                case 'הושלם':
                    newStatus = 'ממתין';
                    newClass = 'pending';
                    break;
                default:
                    return;
            }
            
            target.textContent = newStatus;
            target.className = `status ${newClass}`;
            updateTaskStats();
        }
        
        // Handle edit button
        if (target.classList.contains('edit-btn')) {
            const row = target.closest('tr');
            const titleCell = row.cells[2];
            const currentTitle = titleCell.textContent;
            
            const newTitle = prompt('ערוך כותרת מטלה:', currentTitle);
            if (newTitle && newTitle.trim() !== '') {
                titleCell.textContent = newTitle.trim();
                updateTaskStats();
            }
        }
        
        // Handle delete button
        if (target.classList.contains('delete-btn')) {
            const row = target.closest('tr');
            if (confirm('האם אתה בטוח שברצונך למחוק מטלה זו?')) {
                row.remove();
                updateTaskStats();
            }
        }
    });
    
    // Initialize filter buttons
    initializeTaskFilters();
}

// Initialize task filtering functionality
function initializeTaskFilters() {
    const filterButtons = document.querySelectorAll('.task-filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply filter
            filterTasks(filter);
        });
    });
}

// Filter tasks based on selected filter
function filterTasks(filter) {
    const tasksTable = document.getElementById('tasksTable');
    if (!tasksTable) return;
    
    const rows = tasksTable.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        let show = true;
        
        switch(filter) {
            case 'all':
                show = true;
                break;
            case 'urgent':
                show = row.classList.contains('task-urgent');
                break;
            case 'medium':
                show = row.classList.contains('task-medium');
                break;
            case 'low':
                show = row.classList.contains('task-low');
                break;
            case 'pending':
                const status = row.querySelector('.status').textContent;
                show = status === 'ממתין';
                break;
            case 'in-progress':
                const status2 = row.querySelector('.status').textContent;
                show = status2 === 'בביצוע';
                break;
            case 'completed':
                const status3 = row.querySelector('.status').textContent;
                show = status3 === 'הושלם';
                break;
        }
        
        row.style.display = show ? '' : 'none';
    });
}

// Update task statistics
function updateTaskStats() {
    const tasksTable = document.getElementById('tasksTable');
    if (!tasksTable) return;
    
    const rows = tasksTable.querySelectorAll('tbody tr');
    let total = 0;
    let pending = 0;
    let inProgress = 0;
    let completed = 0;
    let urgent = 0;
    
    rows.forEach(row => {
        if (row.style.display !== 'none') {
            total++;
            
            const status = row.querySelector('.status').textContent;
            switch(status) {
                case 'ממתין':
                    pending++;
                    break;
                case 'בביצוע':
                    inProgress++;
                    break;
                case 'הושלם':
                    completed++;
                    break;
            }
            
            if (row.classList.contains('task-urgent')) {
                urgent++;
            }
        }
    });
    
    // Update statistics display
    const statsElements = document.querySelectorAll('.task-stat');
    statsElements.forEach(element => {
        const statType = element.getAttribute('data-stat');
        switch(statType) {
            case 'total':
                element.textContent = total;
                break;
            case 'pending':
                element.textContent = pending;
                break;
            case 'in-progress':
                element.textContent = inProgress;
                break;
            case 'completed':
                element.textContent = completed;
                break;
            case 'urgent':
                element.textContent = urgent;
                break;
        }
    });
}

// Rating System Functionality - Optimized
function initializeRatingSystem() {
    const ratingStars = document.querySelectorAll('.rating-stars');
    const facilityNames = {
        'cafeteria': 'קפיטריה',
        'library': 'ספרייה',
        'gym': 'חדר כושר',
        'parking': 'חניה'
    };
    
    ratingStars.forEach(starContainer => {
        const stars = starContainer.querySelectorAll('.star');
        const facility = starContainer.getAttribute('data-facility');
        const currentRatingElement = starContainer.parentElement.querySelector('.current-rating');
        const currentRating = parseInt(currentRatingElement.textContent);
        
        // Set initial display
        updateStarDisplay(stars, currentRating);
        
        // Add event listeners
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                currentRatingElement.textContent = rating;
                updateStarDisplay(stars, rating);
                
                const facilityName = facilityNames[facility] || facility;
                showNotification(`דירוג ${facilityName} עודכן ל-${rating} כוכבים`, 'success');
                
                // Save to localStorage
                const ratings = JSON.parse(localStorage.getItem('facilityRatings') || '{}');
                ratings[facility] = rating;
                localStorage.setItem('facilityRatings', JSON.stringify(ratings));
            });
            
            star.addEventListener('mouseenter', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                stars.forEach((s, index) => {
                    if (index + 1 <= rating) s.classList.add('hover');
                    else s.classList.remove('hover');
                });
            });
            
            star.addEventListener('mouseleave', function() {
                updateStarDisplay(stars, currentRating);
            });
        });
    });
}

function updateStarDisplay(stars, rating) {
    stars.forEach((star, index) => {
        const starRating = index + 1;
        if (starRating <= rating) {
            star.classList.add('active');
            star.classList.remove('hover');
        } else {
            star.classList.remove('active', 'hover');
        }
    });
}

// Submit Rating Functionality
function initializeSubmitRating() {
    const submitBtn = document.querySelector('.submit-rating-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const ratingItems = document.querySelectorAll('.rating-item');
            const submittedRatings = {};
            
            ratingItems.forEach(item => {
                const facility = item.querySelector('.rating-stars').getAttribute('data-facility');
                const rating = parseInt(item.querySelector('.current-rating').textContent);
                submittedRatings[facility] = rating;
            });
            
            showNotification('הדירוגים נשלחו בהצלחה!', 'success');
            localStorage.setItem('submittedRatings', JSON.stringify(submittedRatings));
        });
    }
}

// Course Forum Data - Simplified
const courseForumData = {
    math101: {
        name: 'מתמטיקה 101',
        lecturer: 'ד"ר כהן',
        students: 45,
        messages: [
            { sender: 'דוד לוי', content: 'מישהו יכול לעזור לי עם שאלה 3?', time: '14:30', type: 'received' },
            { sender: 'שרה כהן', content: 'אני יכול לעזור!', time: '14:32', type: 'received' },
            { sender: 'דוד לוי', content: 'תודה!', time: '14:33', type: 'sent' }
        ]
    },
    physics101: {
        name: 'פיזיקה 101',
        lecturer: 'פרופ\' גולדברג',
        students: 38,
        messages: [
            { sender: 'מיכאל דוד', content: 'האם יש שיעור מחר?', time: '15:20', type: 'received' },
            { sender: 'פרופ\' גולדברג', content: 'כן, שיעור רגיל מחר', time: '15:25', type: 'received' }
        ]
    },
    programming101: {
        name: 'תכנות 101',
        lecturer: 'ד"ר לוי',
        students: 52,
        messages: [
            { sender: 'יוסי כהן', content: 'מישהו הצליח לפתור את התרגיל?', time: '16:15', type: 'received' },
            { sender: 'דנה לוי', content: 'כן, זה לא כל כך קשה', time: '16:18', type: 'received' }
        ]
    }
};

let currentCourse = null;
let allRecentMessages = [];

// Initialize Course Forum
function initializeCourseForum() {
    // Load recent messages from localStorage
    const savedMessages = localStorage.getItem('courseForumMessages');
    if (savedMessages) {
        allRecentMessages = JSON.parse(savedMessages);
        updateRecentMessages();
    }
}

// Switch Course Chat
function switchCourseChat() {
    const courseSelect = document.getElementById('courseSelect');
    const courseInfo = document.getElementById('courseInfo');
    const courseChatContainer = document.getElementById('courseChatContainer');
    const courseChatForm = document.getElementById('courseChatForm');
    
    currentCourse = courseSelect.value;
    
    if (!currentCourse) {
        courseInfo.style.display = 'none';
        courseChatContainer.innerHTML = `
            <div class="chat-placeholder">
                <p>בחר קורס כדי להתחיל לצ'אט</p>
                <span class="chat-icon">💬</span>
            </div>
        `;
        courseChatForm.style.display = 'none';
        return;
    }
    
    const courseData = courseForumData[currentCourse];
    if (!courseData) return;
    
    // Update course info
    document.getElementById('courseLecturer').textContent = courseData.lecturer;
    document.getElementById('courseStudents').textContent = courseData.students;
    document.getElementById('courseMessages').textContent = courseData.messages.length;
    courseInfo.style.display = 'block';
    
    // Load course messages
    loadCourseMessages(currentCourse);
    
    // Show chat form
    courseChatForm.style.display = 'flex';
}

// Load Course Messages
function loadCourseMessages(courseId) {
    const courseChatContainer = document.getElementById('courseChatContainer');
    const courseData = courseForumData[courseId];
    
    if (!courseData) return;
    
    const messagesHtml = courseData.messages.map(message => `
        <div class="course-message ${message.type}">
            <div class="course-message-header">
                <span>${message.sender}</span>
                <span>${message.time}</span>
            </div>
            <div class="course-message-content">${message.content}</div>
        </div>
    `).join('');
    
    courseChatContainer.innerHTML = `<div class="course-chat-messages">${messagesHtml}</div>`;
    
    // Scroll to bottom
    const chatMessages = courseChatContainer.querySelector('.course-chat-messages');
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send Course Message
function sendCourseMessage() {
    const courseInput = document.getElementById('courseChatInput');
    const message = courseInput.value.trim();
    
    if (!message || !currentCourse) return;
    
    const courseData = courseForumData[currentCourse];
    if (!courseData) return;
    
    const currentTime = new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
    
    const newMessage = {
        sender: currentUser?.role === 'lecturer' ? 'מרצה' : 'סטודנט',
        content: message,
        time: currentTime,
        type: 'sent'
    };
    
    courseData.messages.push(newMessage);
    
    // Add to recent messages
    allRecentMessages.unshift({
        ...newMessage,
        course: courseData.name,
        courseId: currentCourse,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 50 messages
    if (allRecentMessages.length > 50) allRecentMessages = allRecentMessages.slice(0, 50);
    
    localStorage.setItem('courseForumMessages', JSON.stringify(allRecentMessages));
    
    loadCourseMessages(currentCourse);
    updateRecentMessages();
    courseInput.value = '';
    showNotification('ההודעה נשלחה בהצלחה!', 'success');
}

// Update Recent Messages
function updateRecentMessages() {
    const recentMessagesContainer = document.getElementById('recentMessages');
    
    if (allRecentMessages.length === 0) {
        recentMessagesContainer.innerHTML = '<p>אין הודעות להצגה</p>';
        return;
    }
    
    const messagesHtml = allRecentMessages.slice(0, 10).map(message => `
        <div class="recent-message-item">
            <div class="recent-message-header">
                <span class="recent-message-sender">${message.sender}</span>
                <span class="recent-message-time">${message.time}</span>
            </div>
            <div class="recent-message-content">
                <span class="recent-message-course">${message.course}</span>
                ${message.content}
            </div>
        </div>
    `).join('');
    
    recentMessagesContainer.innerHTML = messagesHtml;
}

// Handle Enter key in course chat
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.id === 'courseChatInput') {
        sendCourseMessage();
    }
});