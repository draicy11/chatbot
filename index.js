const Groq = require("groq-sdk");
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getGroqChatCompletion(prompt) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "llama3-8b-8192",
    });
}

async function handlePrompt(prompt) {
    const chat_completion = await getGroqChatCompletion(prompt);
    return chat_completion.choices[0]?.message?.content || "something happened";
}

// Example POST route to demonstrate body parsing
app.post('/handle-prompt', async (req, res) => {
    const prompt = req.body.prompt;
    console.log(prompt);
    // handlePrompt("what is the capital of india")
    const answer = await handlePrompt(prompt)
    res.json({ message: 'answer for the promt', data: answer  });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});