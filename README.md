![https://github.com/iHategithub9000/netterm/blob/main/logo.png?raw=true](https://github.com/iHategithub9000/netterm/blob/main/logo.png?raw=true)
# NetTerm
## Purpose
To remotely control computer command lines.
## Installation
```bash
git clone https://github.com/iHategithub9000/netterm.git
cd netterm
npm i
node nterm <pin> <port>
#default args: node nterm 0000 8181
```
## QnA
1. The terminal keeps saying "Fetch error: Unexpected token 'F', "Forbidden" is not valid JSON"  
You logged out and manually entered the terminal page. Go to the root and it will send you to the login.
2. I can't use CD and EXIT  
They don't work, because the server works by spawning the command as a child process.
3. What do the commands .cjs and .csjs do?  
.cjs runs clientside javascript, and .csjs sets javascript to be ran every time you open the terminal
4. I broke my terminal! What do?  
Usually CTRL+0 on the client will do the trick, if it still doesn't work, look up how to manually erase website data.
5. How do i reset customization?  
Run the command without any parameters.
 
