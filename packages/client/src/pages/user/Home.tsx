import { useState } from 'react';
import { User, Book, Calendar, Award, Clock, Activity, BarChart2, FileText } from 'lucide-react';

function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Static student data
  const student = {
    name: "Alex Johnson",
    id: "SID2023451",
    email: "alex.johnson@university.edu",
    program: "Computer Science",
    year: "Junior (3rd Year)",
    gpa: "3.8",
    credits: "78/120",
    advisor: "Dr. Sarah Williams"
  };

  const courses = [
    { id: "CS301", name: "Data Structures & Algorithms", grade: "A", credits: 4 },
    { id: "CS350", name: "Web Development", grade: "A-", credits: 3 },
    { id: "MATH240", name: "Linear Algebra", grade: "B+", credits: 3 },
    { id: "ENG210", name: "Technical Writing", grade: "A", credits: 2 }
  ];

  const upcomingAssignments = [
    { course: "CS301", title: "Binary Tree Implementation", due: "May 2" },
    { course: "CS350", title: "React Project Submission", due: "May 5" },
    { course: "MATH240", title: "Matrix Operations Quiz", due: "May 3" }
  ];

  const announcements = [
    { title: "Registration for Fall Semester", date: "May 10", content: "Course registration for Fall 2025 opens on May 10th. Please meet with your advisor before this date." },
    { title: "Computer Science Dept Hackathon", date: "May 20-22", content: "Annual hackathon with prizes totaling $5,000. Register by May 15th." }
  ];

  // Render different content based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Welcome back, {student.name}!</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <div className="flex items-center mb-2">
                    <Book className="text-blue-500 mr-2" size={18} />
                    <span className="font-medium">Current Courses</span>
                  </div>
                  <p className="text-xl font-bold">{courses.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <div className="flex items-center mb-2">
                    <Award className="text-green-500 mr-2" size={18} />
                    <span className="font-medium">GPA</span>
                  </div>
                  <p className="text-xl font-bold">{student.gpa}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded">
                  <div className="flex items-center mb-2">
                    <Clock className="text-purple-500 mr-2" size={18} />
                    <span className="font-medium">Upcoming</span>
                  </div>
                  <p className="text-xl font-bold">{upcomingAssignments.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Upcoming Assignments</h2>
              <div className="divide-y">
                {upcomingAssignments.map((assignment, index) => (
                  <div key={index} className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-gray-600">{assignment.course}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-500">Due: {assignment.due}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Announcements</h2>
              <div className="divide-y">
                {announcements.map((announcement, index) => (
                  <div key={index} className="py-3">
                    <p className="font-medium">{announcement.title}</p>
                    <p className="text-sm text-gray-600 mb-1">{announcement.date}</p>
                    <p className="text-sm">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Student Profile</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="bg-gray-200 w-32 h-32 rounded-full flex items-center justify-center">
                  <User size={48} className="text-gray-600" />
                </div>
              </div>
              <div className="flex-grow space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{student.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="font-medium">{student.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{student.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Program</p>
                    <p className="font-medium">{student.program}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-medium">{student.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">GPA</p>
                    <p className="font-medium">{student.gpa}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Credits Completed</p>
                    <p className="font-medium">{student.credits}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Academic Advisor</p>
                    <p className="font-medium">{student.advisor}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'courses':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Current Courses</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Grade</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{course.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{course.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{course.credits}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{course.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">University Student Portal</h1>
            <div className="flex items-center space-x-2">
              <span>{student.name}</span>
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-blue-600">
                <User size={18} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'dashboard' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Activity className="mr-3 h-5 w-5" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'profile' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="mr-3 h-5 w-5" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'courses' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Book className="mr-3 h-5 w-5" />
                  Courses
                </button>
                <div className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-400">
                  <Calendar className="mr-3 h-5 w-5" />
                  Schedule
                </div>
                <div className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-400">
                  <BarChart2 className="mr-3 h-5 w-5" />
                  Grades
                </div>
                <div className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-400">
                  <FileText className="mr-3 h-5 w-5" />
                  Documents
                </div>
              </nav>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-grow">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;