if (process.argv[2] == undefined || process.argv[3] == undefined ){
    console.log("Bad parameters.")
    console.log("Usage: node nterm <pin> <port> [IDontCareAboutErrorsAndSupport]")
    process.exit(1)
}   
if(process.argv[4]==="IDontCareAboutErrorsAndSupport") {
    console.log('IDontCareAboutErrorsAndSupport flag set, will not check version.')
}

const express = require("express");
const key = process.argv[2]
const v = require("./version.json").version;
const fetch = require('node-fetch').default;
const path = require("path");
const { exec } = require("child_process");
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log({"ip":req.ip, "method":req.method, "route":req.originalUrl, "body":JSON.stringify(req.body), "useragent": req.get('User-Agent')})
    try {
        switch (req.path) {
          case "/api/run":
            if (req.body.key!==key){
                    return res.status(403).send('Forbidden')
                } 
            if (req.method === "POST") {
                const { command } = req.body;
                
                exec(command, { timeout: 50000 }, (error, stdout, stderr) => {
                    if (error) {
                        return res.json({ error: error.message, stdout, stderr });
                    }
                    res.json({ stdout, stderr });
                });
            } else {
                res.status(405).send('Method not allowed');
            }
            break;
          case "/api/close":
            if (req.method === "DELETE") {
                if (req.body.key!==key){
                    return res.status(403).send('Forbidden')
                } 
                process.exit(0);
            } else {
                res.status(405).send('Method not allowed');
            }
            break;
          case "/api/auth":
            if (req.method === "PUT") {
                res.status(200).send({ success: (req.body.key === key)})
            } else {
                res.status(405).send('Method not allowed');
            }
            break;
          case "/":
            if (req.method === "GET") {
                const filePath=path.join(__dirname, "index.html");
                res.sendFile( filePath);
            } else {
                res.status(405).send('Method not allowed');
            }
            break;
          case "/main":
            if (req.method === "GET") {
                const filePath=path.join(__dirname, "main.html");
                res.sendFile( filePath);
            } else {
                res.status(405).send('Method not allowed');
            }
            break;
          case "/log-in":
            if (req.method === "GET") {
                const filePath=path.join(__dirname, "login.html");
                res.sendFile( filePath);
            } else {
                res.status(405).send('Method not allowed');
            }
            break;
          case "/close":
            if (req.method === "GET") {
                const filePath=path.join(__dirname, "close.html");
                res.sendFile( filePath);
            } else {
                res.status(405).send('Method not allowed');
            }
            break;
          case "/logo":
            if (req.method === "GET") {
                const filePath=path.join(__dirname, "logo.png");
                res.sendFile( filePath);
            } else {
                res.status(405).send('Method not allowed');
            }
            break;
          case "/favicon.ico":
            res.status(404).send('Not found');
            break;
          default:
            res.status(404).send('Not found');
        }
    } catch {
        res.status(500).send('Internal server error')
    }
    //next();
});


fetch('https://raw.githubusercontent.com/iHategithub9000/netterm/refs/heads/main/version.json')
  .then(response => response.json())
  .then(data => {
    if (v!=data.version && process.argv[4]=="IDontCareAboutErrorsAndSupport"){
        console.log("You're still behind on updates though. Latest: "+data.version+", Installed: "+v )
    }
    if (v!=data.version && process.argv[4]!=="IDontCareAboutErrorsAndSupport"){
        console.log('**********************************')
        console.log("You're behind on updates!\n")
        console.log("Installed version: "+v)
        console.log("Latest version: "+data.version)
        console.log("\nServer will start in 20 seconds\n")
        console.log("To get rid of the wait, add")
        console.log("'IDontCareAboutErrorsAndSupport'")
        console.log("to the end of process.argv,")
        console.log("or just update.")
        console.log('**********************************')
        setTimeout(()=>{
            app.listen(process.argv[3], () => console.log("NETterm running on port "+(process.argv[3] || 8181)+" with key "+key));
        },20000)
    } else {
        app.listen(process.argv[3], () => console.log("NETterm running on port "+(process.argv[3] || 8181)+" with key "+key));
    }
  })
  .catch(err => {
    console.error('Error: ', err);
  });

