const Groq = require("groq-sdk");
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


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
    // Print the completion returned by the LLM.
    console.log(chat_completion.choices[0]?.message?.content || "");
}


handlePrompt("what is the capital of india")
