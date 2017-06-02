let restify = require('restify')
let builder = require('botbuilder')
let Parser = require('./scripts/Input')
let Ishtar = require('./scripts/Ishtar')

let server = restify.createServer()

// Setup Restify Server
server.listen(process.env.PORT || 3978, ()=>{
  console.log('%s listening to %s', server.name, server.url)
})

// Create chat connector that communicates w Bot Framework Service
let conn = new builder.ChatConnector({
  appId: process.env.MIRCOSOFT_APP_ID,
  appPassword: process.env.MIRCOSOFT_APP_PASSWORD
})

// Listen for messages
server.post('/api/messages', conn.listen())

// Reply to messages
// let bot = new builder.UniversalBot(conn, (session)=>{
//   session.send('You said: %s', session.message.text)
// })

let bot = new builder.UniversalBot(conn, (session)=>{
  let input = session.message.text
  session.sendTyping()
  if(input.startsWith('!card')){
    let cmd = Parser.normalizeCardInput(input.substr('6'))
    Ishtar.grimoire(cmd)
      .then((res)=>{
        session.send(res.grimoire_card.short_summary)
      })
      .catch((err)=>{
        console.log('Error: ', err)
      })
  }else{
    session.send('You said: %s', session.message.text)
  }
  
})