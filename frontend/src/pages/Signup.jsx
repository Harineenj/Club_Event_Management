import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "student",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/auth/register", formData);
            console.log("Response:", response.data);
            navigate("/login");
        } catch (err) {
            console.error("Signup error:", err.response);  
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-blue-200 to-green-200">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="role"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="student">Student</option>
                        <option value="club_head">Club Head</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-black p-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-sm mt-4 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
