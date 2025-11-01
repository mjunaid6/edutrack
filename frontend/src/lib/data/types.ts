export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

export interface Course {
  id: string;
  courseName: string;
  courseCode: string;
  credits: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  marks: number | null;
}
