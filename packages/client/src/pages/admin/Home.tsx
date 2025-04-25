import { useState } from 'react';
import { 
  Users, Book, FileText, Settings, Clock, 
  Bell, Search, User, BarChart2, 
  Calendar, Shield, LogOut, Menu, 
  ChevronDown, Grid, List, PlusCircle
} from 'lucide-react';

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [viewMode, setViewMode] = useState('grid');

  // Static data for admin dashboard
  const stats = [
    { title: "Total Students", value: "2,845", change: "+12%", icon: <Users size={20} className="text-blue-500" /> },
    { title: "Active Courses", value: "186", change: "+5%", icon: <Book size={20} className="text-green-500" /> },
    { title: "Faculty Members", value: "142", change: "+3%", icon: <User size={20} className="text-purple-500" /> },
    { title: "Pending Requests", value: "28", change: "-8%", icon: <FileText size={20} className="text-orange-500" /> }
  ];

  const recentStudents = [
    { id: "ST2023001", name: "Emma Wilson", program: "Computer Science", year: "2nd Year", status: "Active" },
    { id: "ST2023042", name: "James Brown", program: "Mechanical Engineering", year: "4th Year", status: "Active" },
    { id: "ST2023103", name: "Sophie Chen", program: "Business Administration", year: "3rd Year", status: "On Leave" },
    { id: "ST2023185", name: "Michael Johnson", program: "Biology", year: "1st Year", status: "Active" },
    { id: "ST2023209", name: "Olivia Garcia", program: "Psychology", year: "2nd Year", status: "Academic Probation" }
  ];

  const upcomingEvents = [
    { title: "Faculty Senate Meeting", date: "April 28, 2025", time: "2:00 PM", location: "Admin Building, Room 302" },
    { title: "End of Spring Semester", date: "May 15, 2025", time: "All Day", location: "University-wide" },
    { title: "Summer Registration Deadline", date: "May 5, 2025", time: "11:59 PM", location: "Online" },
    { title: "Graduation Ceremony", date: "May 20, 2025", time: "10:00 AM", location: "University Stadium" }
  ];

  const departments = [
    { name: "Computer Science", students: 420, faculty: 28, courses: 46 },
    { name: "Business", students: 610, faculty: 32, courses: 38 },
    { name: "Engineering", students: 580, faculty: 35, courses: 52 },
    { name: "Liberal Arts", students: 425, faculty: 27, courses: 34 },
    { name: "Medicine", students: 310, faculty: 20, courses: 16 }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium text-gray-500">{stat.title}</div>
                    <div>{stat.icon}</div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change} <span className="text-xs text-gray-500">from last month</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Departments Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-bold">Departments Overview</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {departments.map((dept, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{dept.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{dept.students}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{dept.faculty}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{dept.courses}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                          <button className="text-gray-600 hover:text-gray-800">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Students */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-lg font-bold">Recent Students</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setViewMode('grid')} 
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                    >
                      <Grid size={16} />
                    </button>
                    <button 
                      onClick={() => setViewMode('list')} 
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                    {recentStudents.map((student, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                            <User size={16} />
                          </div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.id}</p>
                          </div>
                        </div>
                        <div className="mt-3 text-sm">
                          <p>{student.program}, {student.year}</p>
                          <p className={`font-medium ${
                            student.status === 'Active' ? 'text-green-600' : 
                            student.status === 'On Leave' ? 'text-yellow-600' : 'text-red-600'
                          }`}>{student.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="divide-y">
                    {recentStudents.map((student, index) => (
                      <div key={index} className="p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                            <User size={14} />
                          </div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-gray-500">{student.program}, {student.year}</p>
                          </div>
                        </div>
                        <div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            student.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            student.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>{student.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="p-4 border-t text-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">View All Students</button>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-bold">Upcoming Events</h2>
                </div>
                <div className="divide-y">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.location}</p>
                        </div>
                        <div className="bg-blue-50 px-3 py-1 rounded text-blue-700 text-sm">
                          {event.date}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {event.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">View All Events</button>
                  <button className="flex items-center text-green-600 hover:text-green-800 font-medium">
                    <PlusCircle size={16} className="mr-1" />
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'students':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Student Management</h2>
            <p>Manage all student records, enrollment, and academic status.</p>
            <p className="mt-4 text-gray-500">This section would contain student search, filters, and a complete student database.</p>
          </div>
        );
      case 'courses':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Course Management</h2>
            <p>Manage course offerings, schedules, and instructor assignments.</p>
            <p className="mt-4 text-gray-500">This section would contain course creation forms, schedule management, and enrollment statistics.</p>
          </div>
        );
      case 'faculty':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Faculty Management</h2>
            <p>Manage faculty information, teaching assignments, and departmental affiliations.</p>
            <p className="mt-4 text-gray-500">This section would contain faculty directory, performance metrics, and course assignment tools.</p>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Reports & Analytics</h2>
            <p>Generate and view reports on enrollment, academic performance, and institutional metrics.</p>
            <p className="mt-4 text-gray-500">This section would contain various reports, charts, and data export functionality.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">System Settings</h2>
            <p>Configure system preferences, user permissions, and notification settings.</p>
            <p className="mt-4 text-gray-500">This section would contain various configuration options for the admin portal.</p>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Select a Menu Option</h2>
            <p>Please select a menu option from the sidebar to view the corresponding content.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
              >
                <Menu size={24} />
              </button>
              <div className="ml-4 font-bold text-xl text-blue-700">University Admin Portal</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button className="p-2 rounded-md text-gray-500 hover:text-gray-900 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="font-medium text-gray-700">Admin User</div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User size={20} />
                  </div>
                  <ChevronDown size={16} className="ml-1 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white shadow transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-64 transition duration-300 ease-in-out md:relative md:translate-x-0`}>
          <div className="h-0 md:h-16"></div> {/* Spacer to align with header on desktop */}
          <div className="p-6">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg ${
                  activeSection === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BarChart2 size={18} className="mr-3" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveSection('students')}
                className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg ${
                  activeSection === 'students' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users size={18} className="mr-3" />
                Student Management
              </button>
              <button
                onClick={() => setActiveSection('courses')}
                className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg ${
                  activeSection === 'courses' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Book size={18} className="mr-3" />
                Course Management
              </button>
              <button
                onClick={() => setActiveSection('faculty')}
                className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg ${
                  activeSection === 'faculty' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User size={18} className="mr-3" />
                Faculty Management
              </button>
              <button
                onClick={() => setActiveSection('reports')}
                className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg ${
                  activeSection === 'reports' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText size={18} className="mr-3" />
                Reports & Analytics
              </button>
              <button
                onClick={() => setActiveSection('calendar')}
                className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg ${
                  activeSection === 'calendar' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Calendar size={18} className="mr-3" />
                Academic Calendar
              </button>
              <button
                onClick={() => setActiveSection('settings')}
                className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg ${
                  activeSection === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings size={18} className="mr-3" />
                System Settings
              </button>
            </nav>

            <div className="mt-10 pt-6 border-t">
              <div className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                <Shield size={18} className="mr-3" />
                Security Settings
              </div>
              <div className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                <LogOut size={18} className="mr-3" />
                Logout
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${!sidebarOpen ? 'md:ml-0' : ''}`}>
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <div>
                      <button onClick={() => setActiveSection('dashboard')} className="text-gray-500 hover:text-gray-700">Dashboard</button>
                    </div>
                  </li>
                  {activeSection !== 'dashboard' && (
                    <>
                      <li>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-2 text-gray-700 font-medium capitalize">{activeSection}</span>
                        </div>
                      </li>
                    </>
                  )}
                </ol>
              </nav>
            </div>
            
            {/* Page Content */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;