import { getCourses } from "@/lib/data/mock";
import { PageHeader } from "@/components/page-header";
import { CoursesTable } from "./_components/courses-table";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Courses"
        description="Add and view available courses."
      />
      <CoursesTable data={courses} />
    </div>
  );
}
