
# Your Gallery

The Gallery web app is a secure platform that lets users sign up, log in, upload, and view their own images. It also offers a search function to easily find images by name. Organize, store, and enjoy your personal photo collection with ease.

## Features

- SignUp/LogIn
- Add image
- View Images
- Logout



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### Server

```MONGODB_URL``` : Connection string for MongoDB, eg: mongodb://0.0.0.0:27017/gallery

```JWT_SECRET```: Secret string for JWT sign, eg: 123456789

```CLOUD_NAME``` : Cloud name on cloudinary

```API_KEY``` : API key of cloudinary

```API_SECRET``` : API Secret of cloudinary

#### Client

```REACT_APP_BACKEND```: Backend URL, eg: http://localhost:8080
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```
#### Server
Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

#### Client

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```




