import { getCourses, getStudentData } from "@/lib/data/mock";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default async function StudentDetailPage({ params }: { params: { id: string } }) {
  const data = await getStudentData(params.id);
  const allCourses = await getCourses();

  if (!data) {
    notFound();
  }

  const { student, enrolledCourses } = data;
  const unrolledCourses = allCourses.filter(course => !enrolledCourses.some(e => e.courseId === course.id));


  return (
    <div className="space-y-6">
      <PageHeader title={`${student.firstName} ${student.lastName}`} description={`Details for ${student.email}`} />
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Student Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">First Name</span>
                        <span>{student.firstName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Name</span>
                        <span>{student.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span>{student.email}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Department</span>
                        <Badge variant="secondary">{student.department}</Badge>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Enroll in Course</CardTitle>
                    <CardDescription>Assign a new course to this student.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                            {unrolledCourses.map(course => (
                                <SelectItem key={course.id} value={course.id}>{course.courseName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Enroll Student
                    </Button>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Enrolled Courses</CardTitle>
                    <CardDescription>Manage courses and marks for this student.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead className="text-right">Marks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {enrolledCourses.map(enrollment => (
                                <TableRow key={enrollment.id}>
                                    <TableCell className="font-medium">{enrollment.courseName}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{enrollment.courseCode}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end">
                                            <Input 
                                                type="number" 
                                                defaultValue={enrollment.marks ?? ""} 
                                                placeholder="N/A"
                                                className="w-20 h-8 text-right"
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                             {enrolledCourses.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center h-24">
                                        Not enrolled in any courses.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
