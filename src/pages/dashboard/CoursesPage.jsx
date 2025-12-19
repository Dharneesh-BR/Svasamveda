import { useEffect, useState } from 'react';
import { FiBookOpen } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const CourseCard = ({ course }) => {
  const progress = Math.min(100, Math.max(0, course.progress || 0));
  
  return (
    <div className="svasam-card svasam-card-hover overflow-hidden">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-main"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-white mt-1">
            {progress}% Complete
          </p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12">
          {course.title}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FiBookOpen className="h-4 w-4" />
            <span>{course.lessons} Lessons</span>
          </div>
          <Link
            to={`/programs/${course.slug}`}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-main hover:bg-main/90"
          >
            {progress > 0 ? 'Continue' : 'Start'}
          </Link>
        </div>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!user?.uid) {
        setCourses([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const enrollmentsRef = collection(db, 'users', user.uid, 'enrollments');
        const enrollmentsSnap = await getDocs(query(enrollmentsRef, orderBy('createdAt', 'desc')));
        if (cancelled) return;

        const mapped = enrollmentsSnap.docs.map((d) => {
          const data = d.data() || {};
          return {
            id: d.id,
            title: data.title || data.programTitle || 'Program',
            image: data.imageUrl || data.image || '/placeholder-program.jpg',
            lessons: data.lessons || data.totalLessons || 0,
            progress: data.progress || 0,
            slug: data.slug || data.programSlug || d.id,
          };
        });

        setCourses(mapped);
      } catch (e) {
        if (!cancelled) setCourses([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading your courses...</div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiBookOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No courses yet</h3>
          <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet.</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-main hover:bg-main/90"
          >
            Browse Programs
          </Link>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
