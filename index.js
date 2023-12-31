const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
require('dotenv').config();

const {Configuration, OpenAIApi} = require("openai")
const apiKey = process.env.OPENAI_API_KEY;
const config = new Configuration({
    apiKey:apiKey,
})

const openai = new OpenAIApi(config)

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/',async (req,res) => {
    res.status(200).send({
        message:"server is up"
    })
});

app.post('/chat',async (req,res) => {
    try {
        const {createMyMemo } = req.body
        
        const completion = await openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            messages:[{role:'user', content: createMyMemo}]
        })
    
        res.send(completion.data.choices[0])
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
})

const port = 8080

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})