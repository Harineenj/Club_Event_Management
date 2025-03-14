const Event = require("../models/Event");




const createEvent = async (req, res) => {
    try {
        if (req.user.role !== "club_head") {
            return res.status(403).json({ message: "Access Denied" });
        }

        const { title, description, date, time, venue, registrationLink } = req.body;
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);
        
      
        if (!req.file) {
            return res.status(400).json({ message: "Poster image is required" });
        }

        const poster = `/uploads/${req.file.filename}`; 
        const event = new Event({
            title, 
            description, 
            date, 
            time, 
            venue, 
            poster, 
            registrationLink, 
            createdBy: req.user.id
        });

        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
};


const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate("createdBy", "username email");
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};

const editEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        if (event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to edit this event" });
        }

        Object.assign(event, req.body);
        await event.save();

        res.status(200).json({ message: "Event updated successfully", event });
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        if (event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this event" });
        }

        await event.deleteOne();
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
};


const MyEvents = async (req,res)=>{
    try {
        const events = await Event.find({ createdBy: req.user.id }).populate("registeredStudents","username email");
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const ConfirmRegister = async(req,res)=>{
    try {
        const eventId = req.params.eventId;
        const userId = req.user.id; 

        console.log("Confirm Registration Request - User:", userId, "Event:", eventId);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID found" });
        }

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        if (event.registeredStudents.includes(userId)) {
            return res.status(400).json({ message: "You have already confirmed registration" });
        }

        event.registeredStudents.push(userId);
        await event.save();

        res.status(200).json({ message: "Registration confirmed successfully", event });
    } catch (error) {
        console.error("Error in confirm registration route:", error);
        res.status(500).json({ message: "Server error", error });
    }
}
module.exports = { createEvent, getAllEvents, editEvent, deleteEvent, MyEvents, ConfirmRegister };

