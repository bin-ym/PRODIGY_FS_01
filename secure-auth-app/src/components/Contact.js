// src/components/Contact.js

import React from 'react';

const Contact = () => {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>If you have any questions, feel free to reach out to us.</p>
            <form className="contact-form">
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                <button type="submit">Send Message</button>
            </form>
            <p>Email: support@binyam.tagel@gmail.com</p>
            <p>Phone: +251987076362</p>
        </div>
    );
};

export default Contact;
