const express = require("express");
const router = express.Router();

// Importing controllers
const { 
    getContacts, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact } = require("../controllers/contactController"); 

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// Exporting our router
module.exports = router;