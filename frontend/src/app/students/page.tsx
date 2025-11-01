import { getStudents } from "@/lib/data/mock";
import { PageHeader } from "@/components/page-header";
import { StudentsTable } from "./_components/students-table";

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description="Add, update, delete, and view student details."
      />
      <StudentsTable data={students} />
    </div>
  );
}
