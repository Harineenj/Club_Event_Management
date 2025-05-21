import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";

const StudentDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Remove the authentication token from localStorage
        localStorage.removeItem("token");
        
        // Optional: Remove any other user-related data
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        
        // Redirect to login page
        navigate("/login");
    };
    
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className={`fixed md:static inset-y-0 left-0 w-64 bg-gray-900 text-white p-5 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-50`}>
                <button className="absolute top-4 right-4 md:hidden" onClick={() => setIsSidebarOpen(false)}>
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-6">🎓 Dashboard</h2>
                <nav className="space-y-4">
                    <Link to="/view_events" className="block px-4 py-2 test-black rounded-lg bg-gray-700 hover:bg-gray-600">
                        📅 View Events
                    </Link>
                    
                    {/* Logout button at the bottom of sidebar */}
                    <div className="absolute bottom-8 left-0 w-full px-5">
                        <button 
                            onClick={handleLogout}
                            className="flex items-center justify-center w-full px-4 py-2 mt-6 text-sm font-medium text-black transition-colors duration-200 rounded-lg bg-red-600 hover:bg-red-700"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Logout
                        </button>
                    </div>
                </nav>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-6 md:p-8">
                <button className="md:hidden absolute top-4 left-4" onClick={() => setIsSidebarOpen(true)}>
                    <Menu className="w-6 h-6" />
                </button>
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl text-center max-w-md transform transition-all duration-300 hover:scale-105">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">🎓 Student Dashboard</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                        Explore and register for exciting events happening in the college.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;