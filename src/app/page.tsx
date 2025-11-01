import {
  Activity,
  ArrowUpRight,
  BookOpen,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCourses, getEnrollments, getStudents } from "@/lib/data/mock";

export default async function Dashboard() {
  const students = await getStudents();
  const courses = await getCourses();
  const enrollments = await getEnrollments();

  const studentsById = Object.fromEntries(students.map(s => [s.id, s]));
  const coursesById = Object.fromEntries(courses.map(c => [c.id, c]));

  const recentEnrollments = enrollments.slice(0, 5).map(e => ({
    ...e,
    student: studentsById[e.studentId],
    course: coursesById[e.courseId],
  }));

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">
              +5 this semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Enrollments
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrollments.length}</div>
            <p className="text-xs text-muted-foreground">
              +12 this month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Enrollments</CardTitle>
              <CardDescription>
                Recent student enrollments in courses.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/students">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Course
                  </TableHead>
                  <TableHead className="text-right">Marks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEnrollments.map(e => (
                  <TableRow key={e.id}>
                    <TableCell>
                      <div className="font-medium">{e.student.firstName} {e.student.lastName}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {e.student.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      {e.course.courseName}
                    </TableCell>
                    <TableCell className="text-right">{e.marks ?? 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>
              Latest news and updates for the faculty.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Final Grades Submission Deadline
                </p>
                <p className="text-sm text-muted-foreground">
                  All marks for the Fall semester must be submitted by Dec 15th.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                <AvatarFallback>CS</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  New Course Registration Open
                </p>
                <p className="text-sm text-muted-foreground">
                  Spring semester course registration is now available for all students.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
