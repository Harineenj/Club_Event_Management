import { useState, useEffect } from "react";
import API from "../api";

const ClubEvents = () => {
    const [events, setEvents] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const BASE_URL = "http://localhost:5004/api"; 

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await API.get("/events/my-events", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setEvents(response.data || []); 
            } catch (err) {
                setError("Failed to load events.");
                
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);
    
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                My Club Events 🎉
            </h2>

            {loading && <p className="text-center text-gray-600">Loading events...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {events && events.length === 0 && !loading ? (
                <p className="text-center text-gray-500 text-lg">
                    🚀 No events posted yet. Create one now!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events?.map((event) => (
                        <div
                        key={event._id}
                        className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
                        >
                            {event.poster && (
                                <img
                                src={`${BASE_URL}${event.poster}`}
                                alt={event.title}
                                className="w-full h-48 object-cover"
                                />
                                
                            )}
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {event.title}
                                </h3>
                                <p className="text-gray-600 mt-2">{event.description}</p>
                                <div className="mt-3">
                                    <p className="text-gray-500 flex items-center">
                                        📅 {new Date(event.date).toLocaleDateString()} ⏰ {event.time}
                                    </p>
                                    <p className="text-gray-500 flex items-center">
                                        📍 {event.venue}
                                    </p>
                                </div>
                                <a
                                    href={event.registrationLink}
                                    target="_blank"
                                    className="block mt-4 bg-blue-500 text-white py-2 px-4 rounded-full text-center font-medium hover:bg-blue-600 transition duration-300"
                                >
                                    Register Now 🚀
                                </a>
                                <h4 className="text-lg font-semibold mt-5 text-gray-700">
                                    Registered Students:
                                </h4>
                                <ul className="mt-2 list-disc ml-5 text-sm text-gray-700">
                                    {event.registeredStudents.length > 0 ? (
                                        event.registeredStudents.map((student) => (
                                            <li key={student._id}>
                                                {student.username} ({student.email})
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No students registered yet.</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};

export default ClubEvents;
