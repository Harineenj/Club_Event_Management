import { useState, useEffect } from "react";
import API from "../api";

const ClubEvents = () => {
    const [events, setEvents] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        registrationLink: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const BASE_URL = "https://club-event-management.onrender.com/api";

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
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

    const handleEditClick = (event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date ? new Date(event.date).toISOString().split('T')[0] : "",
            time: event.time || "",
            venue: event.venue || "",
            registrationLink: event.registrationLink || ""
        });
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdateSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            await API.put(`/events/${editingEvent._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setIsEditing(false);
            fetchEvents();
        } catch (err) {
            setError("Failed to update event.");
        }
    };

    const handleDeleteEvent = async (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                const token = localStorage.getItem("token");
                await API.delete(`/events/${eventId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                fetchEvents();
            } catch (err) {
                setError("Failed to delete event.");
            }
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingEvent(null);
    };
    
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                My Club Events 🎉
            </h2>

            {loading && <p className="text-center text-gray-600">Loading events...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Edit Event</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="3"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Time</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Venue</label>
                            <input
                                type="text"
                                name="venue"
                                value={formData.venue}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Registration Link</label>
                            <input
                                type="url"
                                name="registrationLink"
                                value={formData.registrationLink}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="flex justify-end space-x-2 mt-6">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateSubmit}
                                className="px-4 py-2 bg-blue-500 text-black rounded-lg"
                            >
                                Update Event
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {event.title}
                                    </h3>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => handleEditClick(event)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteEvent(event._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
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
                                    rel="noopener noreferrer"
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