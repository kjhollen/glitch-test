# simple networked drawing app with socket.io and p5.js

A server that opens a socket.io connection between clients for a chatroom, where the messages
being exchanged are drawings (mouse drag coordinates).

## Your Project

On the front-end,

- Edit `src/pages/index.hbs` to change the content of the index.html page
- `public/client.js` is the javacript that runs when you load the webpage, and connects to the server via socket
- `public/style.css` is the styles for `src/pages/index.hbs`
- Drag in `assets`, like images or music, to add them to your project
- add other HTML pages, JavaScript files, or CSS files to the `public` folder as needed

On the back-end,

- your app starts at `server.js`, where it initializes the socket connection.
- add frameworks and packages in `package.json`, including socket.io, which is needed to connect clients to each other
- safely store app secrets in `.env` (nobody can see this but you and people you invite)

Click `Show` in the header to see your app live. Updates to your code will instantly deploy.

## Remixing this project to edit and expand

- look for TODO comments in `server.js`, `public/client.js`, and `src/pages/index.hbs` for places to update your protocol and message handling between the client and server.

## Debugging and Troubleshooting

- Make generous use of your browser's web development tools.
- Log messages to the console to help you determine if certain parts of the code are running.
- Ispect HTML elements to see which styles they have applied to them, and where they are in the hierarchy of the page. This is especially useful to do if you're dynamically adding elements to the page with JavaScript—you can look at the updated HTML to see where/how elements are added.

## Acknowledgments

Parts of the code in this project were adapted from this [WebSockets tutorial](https://thecodingtrain.com/Tutorials/12-websockets/index.html) on the Coding Train, by Dan Shiffman.

Additional client/server code simplifications were borrowed from [p5.multiplayer](https://github.com/L05/p5.multiplayer), written by Carlos Garcia.

This code also build's on Glitch's "glitch-hello-node" template for the node.js backend.