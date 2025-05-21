import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import StudentDashboard from "./StudentDashboard";
import ClubHeadDashboard from "./ClubHeadDashboard";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await API.get("/auth/me", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setUser(data);
            } catch (err) {
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    if (!user) return <p className="text-center text-gray-600 mt-10">Loading...</p>;

    return (
        <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 md:p-10 shadow-xl rounded-lg max-w-lg text-center">
                <h2 className=" text-2xl font-bold text-gray-800">Welcome, {user.username}!</h2>
                <p className="text-gray-600 mt-2">Role: {user.role}</p>

                <div className="mt-6">
                    {user.role === "student" && <StudentDashboard />}
                    {user.role === "club_head" && <ClubHeadDashboard />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
