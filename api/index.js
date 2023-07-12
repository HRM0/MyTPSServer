const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const {Configuration, OpenAIApi} = require("openai")

const config = new Configuration({
    apiKey:process.env.REACT_APP_API_KEY,
})

const openai = new OpenAIApi(config)

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post('/chat',async (req,res) => {

    const {createMyMemo } = req.body
    
    const completion = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:[{role:'user', content: createMyMemo}]
    })

    res.send(completion.data.choices[0])
})

const port = 8080

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})