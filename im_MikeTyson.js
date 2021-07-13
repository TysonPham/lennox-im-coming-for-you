const Discord = require('discord.js')
const { captureRejectionSymbol } = require('events')
const { receiveMessageOnPort } = require('worker_threads')
const client = new Discord.Client()
const cheerio = require('cheerio')
const request = require('request')

const PREFIX = '!';


client.on('ready', ()=> {
    console.log("Connected as " +client.user.tag)
})


client.on("message", (receiveMessage) => {
    //prevent infinite loop 
    if (receiveMessage.author == client.user) {
        return
    }
    console.log(receiveMessage)

    let args = receiveMessage.content.substring(PREFIX.length).split(" ")

    switch(args[0]) {
        case 'image':
            image(receiveMessage);
            break;
    }
})

let image = (message)=> {

    var options = {
        url:"http://results.dogpile.com/serp?qc=images&q=" + "mike tyson meme",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    }

    request (options, (error, response, responseBody) => {
        if(error) {
            return;
        }
        $ = cheerio.load(responseBody);
    
        var links = $(".image a.link");
    
        var urls = new Array(links.length).fill(0).map((v,i)=> links.eq(i).attr("href"));
    
        console.log(urls)
        if(!urls.length){
            return;
        }

        //send result
message.channel.send(urls[Math.floor(Math.random() * urls.length)])
    } )
    


};





client.login("ODY0NTExNzU2NzIxNzE3MjQ4.YO2hUA.c_sLXHbbXw0XR4GgGa4U1y-qqGU")