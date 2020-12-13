# Template for React + Express Apps

## Running
1. Once you clone the repo run `npm i`  
1. To start run `npm start`
1. Run MYSQL locally, run `tables.sql` then `procs.sql`
1. create .env file in repo root, this file is NOT TRACKED in git (see below for format)

## Server
- `server/routes` folder contains all routes
  - `server/routes/index.js` registers all routes with the application
    - `api` sub folders group together related endpoints to make code cleaner
    - the `react` folder is setup to serve react from the api server only in production mode
- `server.js` minimal setup for express server, if you need to add cors or other middleware that can be done here
- In development and production the API server will be located at localhost:5000
  - If you just want to run the development server run `npm run server:dev`

## Client
- React front end, `client/public` folder doesnt have to be changed unless you want to add public files
- App.js has the browser router set up to route different pages
  - there is a landing page at `/` and a test page at `/test`
- In development the client will be located at localhost:3000
  - If you just want to run the client development server run `npm run client:dev`
- In production the client will be served from the API server at localhost:5000
  - For production the React app will be built and bundled, these bundled files will be served from the Express app as static files
- Note: if you are debugging and looking at the network tab, if running in dev mode aka `npm start` you may see some extra HTTP requests where the HTTP method is `OPTIONS`, and the response code 204, you can ignore these as these are CORS preflight messages and will not be there in production mode.

## Config
You can change any of the start up scripts etc to what fits you best, this is just a sample repo to get an Express/React app fast.

## AWS deployment EC2 (amazon linux)
1. create ec2 instance and ssh using private key, when creating open port 80 for inbound rules
1. `sudo yum update -y`
1. `sudo install git -y`
1. `sudo install nginx` command will say to run a different command, copy paste that and run it
1. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
1. `. ~/.nvm/nvm.sh`
1. `nvm install node`
1. `sudo vim /etc/nginx/nginx.conf`
Find the server config area and put this:
```
server {
   listen         80 default_server;
   listen         [::]:80 default_server;
   server_name    localhost;
   root           /usr/share/nginx/html;
   location / {
       proxy_pass http://127.0.0.1:5000;
       proxy_http_version 1.1;
       proxy_set_header Host $host;
   }
}
```
1. `sudo service nginx restart`
1. clone your repo and run `npm i` then `npm run prod &`, the & will push app into background, to stop type `fg` then press `ctrl+c`
Feel free to change any of the config or use a different reverse proxy, you should also make sure you are using correct user permissions  
The app should be live at the URL of your ec2 instace. You should also look into running the app as a service in case it crashes.


## .env format
```
HOST=your_host (should be localhost for dev)
USER=your_sql_user
PASS=sql_user_password
DB=your_database_name
```