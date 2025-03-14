import { Link } from "react-router-dom";

const ClubHeadDashboard = () => {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold">Club Head Dashboard</h3>
            <p className="text-gray-600">Manage events and view registered students.</p>

            <Link to="/create_event">
                <button className="mt-2 px-4 py-2 bg-green-500 text-black rounded">
                    Create Event
                </button>
            </Link>

            <Link to="/club_events">
                <button className="mt-2 ml-2 px-4 py-2 bg-yellow-500 text-black rounded">
                    View My Events
                </button>
            </Link>
        </div>
    );
};

export default ClubHeadDashboard;
