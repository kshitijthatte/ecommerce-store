# E-commerce Store


### Folder structure

```
  
  1. client folder contains all the front-end related stuff.

  2. server folder contains all the backend related stuff.

```

### Server-side 

```

  1. cd controllers - (contains all the logic for APIs)
  2. cd models - (contains all the database schemas)
  3. cd routes - (defined all the routes for APIs)

```

### Set-up locally and run

1. Add .env file in the root directory of server

```

  MONGO_URL = '<YOUR_MONGODB_URL>'
  PORT = 8000
  SECRET = '<JWT_SECRET>'
  RAZORPAY_KEY_ID = '<RAZORPAY_KEY_ID>
  RAZORPAY_KEY_SECRET = '<RAZORPAY_KEY_SECRET>'

```
2. Install dependencies on server-side

```

  > cd server
   npm install

```
3. To run backend (development mode)

```
   > cd server
   npm run dev

```
4. Add .env file in the root directory of client

```

  REACT_APP_BACKEND = '<BACKEND_API_URL>'
  REACT_APP_RAZORPAY_KEY_ID = '<RAZORPAY_KEY_ID>
  
```
5. Install dependencies on client-side

```

   > cd client
   npm install

```

6. To run frontend

```

   > cd client
   npm run start

```

7. Ports:

```

    1. Backend running on: 8000
    2. Frontend running on: 3000

```