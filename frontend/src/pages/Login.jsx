import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/auth/login", formData);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="w-screen flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96 transform transition-all duration-300 hover:shadow-2xl">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-5">Welcome Back</h2>
                {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-black font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                        Login
                    </button>
                </form>
                <p className="text-sm text-center mt-4 text-gray-600">
                    Don't have an account? <a href="/signup" className="text-blue-500 font-semibold hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
