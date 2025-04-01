const express = require("express");
const path = require("path");
const { exec } = require("child_process");
const key = process.argv[2] || "0000"
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


app.listen(process.argv[3] || 8181, () => console.log("NETterm running on port "+(process.argv[3] || 8181)+" with key "+key));
