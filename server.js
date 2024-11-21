const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (if needed)
app.use(express.static('public'));

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Here, you can handle the data (e.g., store in a database, send email, etc.)
    console.log(`Form Submitted: Name: ${name}, Email: ${email}, Message: ${message}`);

    // Send a response back
    res.json({ message: 'Form submitted successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());  // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// MongoDB connection
mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('MongoDB Connection Error: ', err));

// Define schema for form submission
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ },
    message: { type: String, required: true, minlength: 10 }
});

// Create model for contact form submissions
const Contact = mongoose.model('Contact', contactSchema);

// POST route to handle form submissions
app.post('/submit-form', async (req, res) => {
    const { name, email, message } = req.body;

    // Server-side validation
    if (!name || name.length < 3 || name.length > 50) {
        return res.status(400).json({ error: 'Name must be between 3 and 50 characters.' });
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailPattern.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }

    if (!message || message.length < 10) {
        return res.status(400).json({ error: 'Message must be at least 10 characters long.' });
    }

    try {
        // Create a new contact document and save it to MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting form: ' + error });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

});
