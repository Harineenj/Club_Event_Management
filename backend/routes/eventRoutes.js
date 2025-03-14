const express = require("express");
const { createEvent, getAllEvents, editEvent, deleteEvent, MyEvents, ConfirmRegister } = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploads");

const router = express.Router();

router.post("/create", protect, upload.single("poster"), createEvent);
router.get("/all", getAllEvents); 
router.put("/:eventId", protect, editEvent); 
router.delete("/:eventId", protect, deleteEvent);
router.get("/my-events",protect,MyEvents);
router.post("/confirm-registration/:eventId",protect,ConfirmRegister);

module.exports = router;

