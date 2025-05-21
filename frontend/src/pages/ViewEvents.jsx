import { useEffect, useState } from "react";
import API from "../api";

const ViewEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(""); 

   const BASE_URL = "https://club-event-management.onrender.com/api"; 


    useEffect(() => {
         API.get("/events/all")
            .then((response) => {
                setEvents(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
                setLoading(false);
            });

        const storedUser = localStorage.getItem("userId");
        if (storedUser) setUserId(storedUser);
    }, []);

    const confirmRegistration = async (eventId) => {
        try {
            const response = await API.post(
                `events/confirm-registration/${eventId}`,
                {},
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            alert(response.data.message);
            setEvents(events.map(event => event._id === eventId ? response.data.event : event));
        } catch (error) {
            alert(error.response?.data?.message || "Error confirming registration");
        }
    };

    if (loading) return <p className="text-center text-gray-500 text-lg animate-pulse">Loading events...</p>;

    return (
        <div className="container mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🎉 Upcoming Events</h2>

            {events.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No events available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div key={event._id} className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300">
                            <img src={`${BASE_URL}${event.poster}`} alt={event.title} className="w-full h-48 object-cover" />
                            <div className="p-5">
                                <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
                                <p className="text-gray-600 mt-2">{event.description}</p>
                                <div className="text-gray-500 text-sm mt-3">
                                    <p>📅 {new Date(event.date).toLocaleDateString()} | 🕒 {event.time}</p>
                                    <p>📍 {event.venue}</p>
                                </div>

                                <a 
                                    href={event.registrationLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="block mt-4 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg transition duration-300"
                                >
                                    Register Now
                                </a>

                                {!event.registeredStudents.includes(userId) ? (
                                    <button
                                        onClick={() => confirmRegistration(event._id)}
                                        className="block w-full mt-3 bg-green-600 hover:bg-green-700 text-black text-center py-2 rounded-lg transition duration-300"
                                    >
                                        Confirm Registration
                                    </button>
                                ) : (
                                    <p className="mt-3 text-green-600 font-semibold text-sm flex items-center">
                                        ✅ You are registered
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewEvents;
