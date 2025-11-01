import { getCourseData } from "@/lib/data/mock";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const data = await getCourseData(params.id);

  if (!data) {
    notFound();
  }

  const { course, enrolledStudents } = data;

  return (
    <div className="space-y-6">
      <PageHeader title={course.courseName} description={`Course Code: ${course.courseCode}`} />
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Course Name</span>
                        <span className="text-right">{course.courseName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Code</span>
                        <Badge variant="secondary">{course.courseCode}</Badge>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Credits</span>
                        <span>{course.credits}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Course Roster</CardTitle>
                    <CardDescription>Students enrolled in this course.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Marks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {enrolledStudents.map(enrollment => (
                                <TableRow key={enrollment.id}>
                                    <TableCell className="font-medium">{enrollment.studentName}</TableCell>
                                    <TableCell>{enrollment.studentEmail}</TableCell>
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
                            {enrolledStudents.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center h-24">
                                        No students enrolled.
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
