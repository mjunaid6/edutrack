public interface StudentRepository extends JpaRepository<Student, Long> {}
public interface CourseRepository extends JpaRepository<Course, Long> {}
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudentId(Long studentId);
    List<Enrollment> findByCourseId(Long courseId);
}
