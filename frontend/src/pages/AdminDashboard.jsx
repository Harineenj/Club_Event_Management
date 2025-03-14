const AdminDashboard = () => {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold">Admin Dashboard</h3>
            <p className="text-gray-600">Manage users, events, and overall system settings.</p>
            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
                Manage Users
            </button>
            <button className="mt-2 ml-2 px-4 py-2 bg-purple-500 text-white rounded">
                View All Events
            </button>
        </div>
    );
};

export default AdminDashboard;
