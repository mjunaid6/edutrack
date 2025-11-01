import type { Student, Course, Enrollment } from './types';

const students: Student[] = [
  { id: '1', firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@university.edu', department: 'Computer Science' },
  { id: '2', firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@university.edu', department: 'Physics' },
  { id: '3', firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@university.edu', department: 'Mathematics' },
  { id: '4', firstName: 'Diana', lastName: 'Prince', email: 'diana.prince@university.edu', department: 'History' },
  { id: '5', firstName: 'Ethan', lastName: 'Hunt', email: 'ethan.hunt@university.edu', department: 'Computer Science' },
];

const courses: Course[] = [
  { id: 'C101', courseName: 'Introduction to Programming', courseCode: 'CS101', credits: 3 },
  { id: 'C102', courseName: 'Calculus I', courseCode: 'MATH101', credits: 4 },
  { id: 'C103', courseName: 'Classical Mechanics', courseCode: 'PHY101', credits: 4 },
  { id: 'C104', courseName: 'World History', courseCode: 'HIST101', credits: 3 },
  { id: 'C105', courseName: 'Data Structures', courseCode: 'CS201', credits: 3 },
];

const enrollments: Enrollment[] = [
  { id: 'E1', studentId: '1', courseId: 'C101', marks: 92 },
  { id: 'E2', studentId: '1', courseId: 'C105', marks: 88 },
  { id: 'E3', studentId: '2', courseId: 'C103', marks: 76 },
  { id: 'E4', studentId: '3', courseId: 'C102', marks: 95 },
  { id: 'E5', studentId: '4', courseId: 'C104', marks: 81 },
  { id: 'E6', studentId: '5', courseId: 'C101', marks: 85 },
  { id: 'E7', studentId: '5', courseId: 'C105', marks: 90 },
  { id: 'E8', studentId: '2', courseId: 'C102', marks: 65 },
];

// Simulate API latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getStudents(): Promise<Student[]> {
  await delay(100);
  return students;
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  await delay(100);
  return students.find(s => s.id === id);
}

export async function getCourses(): Promise<Course[]> {
  await delay(100);
  return courses;
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  await delay(100);
  return courses.find(c => c.id === id);
}

export async function getEnrollments(): Promise<Enrollment[]> {
    await delay(100);
    return enrollments;
}

export async function getEnrollmentsForStudent(studentId: string): Promise<Enrollment[]> {
  await delay(100);
  return enrollments.filter(e => e.studentId === studentId);
}

export async function getEnrollmentsForCourse(courseId: string): Promise<Enrollment[]> {
  await delay(100);
  return enrollments.filter(e => e.courseId === courseId);
}

export async function getStudentData(id: string) {
    const [student, studentEnrollments] = await Promise.all([
        getStudentById(id),
        getEnrollmentsForStudent(id),
    ]);

    if (!student) {
        return null;
    }

    const enrolledCourses = await Promise.all(
        studentEnrollments.map(async (enrollment) => {
            const course = await getCourseById(enrollment.courseId);
            return {
                ...enrollment,
                courseName: course?.courseName ?? 'Unknown Course',
                courseCode: course?.courseCode ?? 'N/A',
            };
        })
    );

    return { student, enrolledCourses };
}


export async function getCourseData(id: string) {
    const [course, courseEnrollments] = await Promise.all([
        getCourseById(id),
        getEnrollmentsForCourse(id),
    ]);

    if (!course) {
        return null;
    }

    const enrolledStudents = await Promise.all(
        courseEnrollments.map(async (enrollment) => {
            const student = await getStudentById(enrollment.studentId);
            return {
                ...enrollment,
                studentName: student ? `${student.firstName} ${student.lastName}` : 'Unknown Student',
                studentEmail: student?.email ?? 'N/A',
            };
        })
    );

    return { course, enrolledStudents };
}
