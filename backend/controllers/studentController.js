
const User = require("../models/User");

const getStudentProfile = async (req, res) => {
    try {
        const student = await User.findById(req.user.id).select("-password");
        if (!student) return res.status(404).json({ message: "Student not found" });

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


const updateStudentProfile = async (req, res) => {
    try {
        const student = await User.findById(req.user.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const { username, password } = req.body;

        if (username) student.username = username;
        if (password) student.password = password; 

        await student.save();
        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getStudentProfile, updateStudentProfile };
