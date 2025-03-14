import { Link } from "react-router-dom";

const StudentDashboard = () => {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className=" bg-white p-6 md:p-8 rounded-2xl shadow-xl text-center  max-w-md transform transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">🎓 Student Dashboard</h3>
                <p className="text-gray-600 text-sm md:text-base">
                    Explore and register for exciting events happening in the college.
                </p>
                <Link to="/view_events">
                    <button className="mt-5 px-6 py-3 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                        View Events 📅
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default StudentDashboard;
