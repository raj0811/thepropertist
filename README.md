# The Propertist Backend

Backend REST API for The Propertist property listing platform.

The API allows agents to register, log in, manage their property listings, and view enquiries received for their properties. Public users can browse properties and submit enquiries.

## Technologies

- Node.js
- NestJS
- TypeScript
- MongoDB
- Mongoose
- JWT authentication
- bcrypt
- AWS S3

## Features

- Agent registration and login
- JWT authentication
- Agent profile
- Create, edit, and delete properties
- Property ownership validation
- Public property listing
- Property search and filters
- Pagination
- General and property-specific enquiries
- AWS S3 image uploads

## Prerequisites

Install the following before starting:

- Node.js 20 or later
- npm
- MongoDB Atlas account or local MongoDB
- AWS account and S3 bucket, if using image uploads

## Installation

Clone the repository:

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
```

Open the backend directory:

```bash
cd YOUR_BACKEND_FOLDER
```

Install dependencies:

```bash
npm install
```

## Environment variables

Create a `.env` file in the backend project root:

```text
backend/
├── src/
├── package.json
├── .env
└── README.md
```

Add the following variables to `.env`:

```env
DB=mongodb+srv://DATABASE_USERNAME:DATABASE_PASSWORD@YOUR_CLUSTER.mongodb.net/propertist?retryWrites=true&w=majority

PORT=4000

JWT_SECRET=replace-with-a-long-random-secret

AWS_ACCESS_KEY_ID=replace-with-your-access-key
AWS_SECRET_ACCESS_KEY=replace-with-your-secret-key
AWS_BUCKET=replace-with-your-bucket-name
AWS_REGION=ap-south-1
```

Do not commit the `.env` file.

## Sample environment file


```env
DB=DB URI

PORT=4000

JWT_SECRET=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=
AWS_REGION=ap-south-1
```

```

## Start in development mode

```bash
npm run start:dev
```

The API will run at:

```text
http://localhost:4000
```

## Build the project

```bash
npm run build
```

The compiled application will be created inside:

```text
dist/
```

## Start the production build

```bash
npm run start:prod
```


## Verify the server

After starting the application, test an endpoint:

```bash
curl http://localhost:4000/properties/all-properties
```

## Authentication

Protected APIs require a JWT token:

```text
Authorization: Bearer YOUR_AGENT_TOKEN
```

The token is returned after successful agent login.

## Main API routes

### Agent routes

```text
POST /agent/register
POST /agent/login
GET  /agent
```

### Property routes

```text
POST   /properties/create
GET    /properties/agent-properties
GET    /properties/all-properties
GET    /properties/get/:propertyId
PATCH  /properties/edit/:propertyId
DELETE /properties/delete/:propertyId
```

### Enquiry routes

```text
POST /enquiries/create
GET  /enquiries/agent-enquiries
```

## Property filters

The public property endpoint supports:

```text
GET /properties/all-properties?page=1&limit=10&location=Mumbai&bhk=2&minPrice=5000000&maxPrice=15000000&listingType=SELL
```

Available filters:

- `status`
- `bhk`
- `minPrice`
- `maxPrice`
- `location`
- `listingType`

## Postman

Import the provided Postman collection into Postman.

Set these collection variables:

```text
baseUrl=http://localhost:4000
agentToken=JWT_RETURNED_FROM_LOGIN
```

For protected requests, use:

```text
Authorization: Bearer {{agentToken}}
```

## Production environment

For production deployment, configure environment variables directly in the hosting platform.

Do not upload or commit the production `.env` file.

The application must listen on the port supplied by the hosting platform:

```ts
const port = Number(process.env.PORT) || 4000;

await app.listen(port, "0.0.0.0");
```

## Security notes

- Passwords are hashed using bcrypt.
- Protected routes use JWT authentication.
- Agents can modify only their own properties.
- Email addresses and phone numbers must be unique.
- Environment credentials must never be committed.
- Use an IAM role instead of permanent AWS access keys when possible.