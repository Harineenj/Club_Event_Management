import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const ClubHeadDashboard = () => {
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
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">🎭 Club Head Dashboard</h2>
                
                <button 
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm font-medium text-black transition-colors duration-200 rounded-lg bg-red-600 hover:bg-red-700"
                >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                </button>
            </header>
            
            {/* Main Content */}
            <div className="flex-1 container mx-auto p-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Manage Your Club Activities</h3>
                    <p className="text-gray-600 mb-6">Create events, track registrations, and engage with students.</p>
                    
                    <div className="flex flex-wrap gap-4">
                        <Link to="/create_event">
                            <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-colors duration-200 flex items-center">
                                <span className="mr-2">➕</span>
                                Create Event
                            </button>
                        </Link>
                        
                        <Link to="/club_events">
                            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors duration-200 flex items-center">
                                <span className="mr-2">📋</span>
                                View My Events
                            </button>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ClubHeadDashboard;