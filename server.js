/**
 * This is the main Node.js server script for your project
 */

const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

// Setup socket.io connection
const fastifyIO = require("fastify-socket.io");
fastify.register(fastifyIO);

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// View is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

/**
 * Our home page route
 *
 * Returns src/pages/index.hbs with data built into it
 */
fastify.get("/", function (request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = { seo: seo };

  // The Handlebars code will be able to access the parameter values and build them into the page
  return reply.view("/src/pages/index.hbs", params);
});

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);

// this is a callback function for when the server is finished setting up.
// you probably won't need to alter code anywhere else in this file.
// here, we set up the callback to establish a socket connection with a
// client as they appear.
fastify.ready().then(() => {
  // Setup a socket connection with a client
  fastify.io.on("connection", function (socket) {
    console.log("\n" + socket.id + " is attempting connection...");

    fastify.io.emit("connected", socket.id);

    // set up event listeners for this new socket connection
    // to receive other invites

    // TODO: add your own socket.on events for different interactions
    // in your app, if needed.
    
    socket.on("sendData", onSendData);
    function onSendData(data) {
      
      // this simple event function recognizes when it receives
      // a "sendData" message from a client, and just sends that
      // data out to other connected clients as-is.
      
      // goes only to OTHER clients (not the one that sent)
      //socket.broadcast.emit('receiveData', data);

      // goes to all clients, including one who sent
      fastify.io.sockets.emit("receiveData", data);
      
      // note: this is a server side console, and will show up in the
      // glitch LOGS tab at the bottom of the screen -- but not the client's
      // console in their browser's developer tools.
      console.log(data);
    }

    // when the user disconnects.. perform this
    socket.on("disconnect", () => {});
  });
});


