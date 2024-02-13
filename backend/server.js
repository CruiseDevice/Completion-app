require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const OpenAI = require('openai');

const port = process.env.PORT || 5000;
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, Express App!');
});

app.post('/generate-text', async(req, res) => {

    const prompt = req.body.text;
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "user",
                "content": prompt
            }
        ],
        max_tokens: 50
    });
    // console.log(response.choices[0].message)
    const generatedText = response.choices[0].message;
    res.json({
        message: 'Text generation request received',
        data: generatedText
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
