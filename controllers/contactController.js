// Importing async handler
const asyncHandler = require("express-async-handler");
// Importing the models
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts); 
});

// @desc Create new contacts
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is : ", req.body);
    const {name, email, phone } = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const contact = await Contact.create({
        name, 
        email,
        phone,
    });
    res.status(201).json(contact);
});

// @desc Get a contact
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc Update a contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body, // the updated body
        {new: true} // this is a query option
    )
    res.status(200).json(updatedContact);
});

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = { 
    getContacts, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact 
};