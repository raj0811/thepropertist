# The Propertist API Documentation

REST API for agent authentication, property listing management, public property discovery, and agent enquiries.

## Base URL

Production:

```text
http://property-env.eba-dhsg3mry.ap-south-1.elasticbeanstalk.com
```

Local development:

```text
http://localhost:4000
```

For Postman, create a collection variable:

```text
baseUrl = http://property-env.eba-dhsg3mry.ap-south-1.elasticbeanstalk.com
```

## Authentication

Protected endpoints require the JWT returned by the login endpoint:

```http
Authorization: Bearer <agent-jwt>
```

Requests containing JSON must include:

```http
Content-Type: application/json
```

## Common response format

Successful responses generally use:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

Paginated responses also include:

```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalProperties": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## Endpoint summary

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| POST | `/agent/register` | Public | Register an agent |
| POST | `/agent/login` | Public | Log in and receive a JWT |
| GET | `/agent` | Bearer token | Get the authenticated agent profile |
| POST | `/properties/create` | Bearer token | Create a property listing |
| GET | `/properties/agent-properties` | Bearer token | Get the authenticated agent's listings |
| GET | `/properties/all-properties` | Public | Search and filter all listings |
| GET | `/properties/get/:propertyId` | Public | Get one property by MongoDB ID |
| PATCH | `/properties/edit/:propertyId` | Bearer token | Edit a property owned by the agent |
| DELETE | `/properties/delete/:propertyId` | Bearer token | Delete a property owned by the agent |
| GET | `/enquiries/agent-enquiries` | Bearer token | Get enquiries assigned to the agent |

---

## Agent authentication

### Register agent

```http
POST /agent/register
```

Authentication: Public

Request body:

```json
{
  "name": "Raj",
  "email": "raj@example.com",
  "phone": "7000000000",
  "address": "Chembur, Mumbai",
  "localities": ["Chembur", "Kurla", "BKC", "Matunga"],
  "experience": 5,
  "password": "strong-password",
  "expertise": ["RENT", "PG"]
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Agent's full name |
| `email` | string | Yes | Unique email address |
| `phone` | string | Yes | Unique phone number |
| `address` | string | Yes | Agent's address |
| `localities` | string[] | Yes | Areas served by the agent |
| `experience` | number | Yes | Experience in years; minimum `0` |
| `password` | string | Yes | Account password; minimum 6 characters |
| `photo` | string | No | Profile image URL |
| `certifications` | object[] | No | Professional certifications |
| `expertise` | string[] | No | Areas of expertise |
| `bio` | string | No | Agent biography |

Expected status: `201 Created`

### Login agent

```http
POST /agent/login
```

Authentication: Public

Request body:

```json
{
  "email": "raj@example.com",
  "password": "strong-password"
}
```

Store the returned JWT and send it as a bearer token on protected endpoints.

Expected status: `200 OK` or `201 Created`, depending on the controller configuration.

### Get authenticated agent profile

```http
GET /agent
```

Authentication: Bearer token

This endpoint does not require a request body. The agent is identified from the JWT.

Example:

```bash
curl --request GET "{{baseUrl}}/agent" \
  --header "Authorization: Bearer {{agentToken}}"
```

Expected status: `200 OK`

---

## Properties

### Create property

```http
POST /properties/create
```

Authentication: Bearer token

Request body:

```json
{
  "name": "Premium 2 BHK Apartment",
  "city": "Mumbai",
  "address": {
    "address": "Tilak Nagar, Chembur",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400089"
  },
  "listingType": "SELL",
  "carpetArea": 850,
  "carpetAreaUnit": "SQ_FT",
  "configuration": "2BHK",
  "benefits": ["GATED_SOCIETY", "GYM", "PARK"],
  "nearestStation": {
    "name": "Tilak Nagar Railway Station",
    "distanceInKm": 1.2
  },
  "description": "A spacious 2 BHK apartment in a gated society.",
  "images": ["https://example.com/property-1.jpg"],
  "estimatedPrice": 12500000,
  "negotiable": true,
  "propertyAgeType": "EXISTING",
  "propertyAgeInYears": 5
}
```

| Field | Type | Required | Allowed values / description |
| --- | --- | --- | --- |
| `name` | string | Yes | Property title |
| `city` | string | Yes | Property city |
| `address` | object | Yes | Contains address, city, state, and pincode |
| `listingType` | string | Yes | `SELL`, `RENT`, `LEASE` |
| `carpetArea` | number | Yes | Carpet area greater than zero |
| `carpetAreaUnit` | string | Yes | `SQ_FT`, `SQ_METER` |
| `configuration` | string | Yes | Examples: `1RK`, `1BHK`, `2BHK`, `DUPLEX` |
| `benefits` | string[] | No | `GATED_SOCIETY`, `GYM`, `POOL`, `PARK` |
| `nearestStation` | object | No | Station name and distance in kilometres |
| `description` | string | Yes | Property description |
| `images` | string[] | No | Image URLs |
| `estimatedPrice` | number | Yes | Estimated price in INR |
| `negotiable` | boolean | No | Whether price is negotiable |
| `propertyAgeType` | string | Yes | `NEW`, `UNDER_CONSTRUCTION`, `EXISTING` |
| `propertyAgeInYears` | number | Conditional | Applicable to existing properties |
| `googleMapLocation` | string | No | Google Maps URL or location value |

Expected status: `201 Created`

### Get agent properties

```http
GET /properties/agent-properties?page=1&limit=10
```

Authentication: Bearer token

| Query parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Results per page |

Example response:

```json
{
  "success": true,
  "message": "Agent properties fetched successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalProperties": 0,
    "totalPages": 0,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

### Get all properties

```http
GET /properties/all-properties
```

Authentication: Public

| Query parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | number | No | Page number; default `1` |
| `limit` | number | No | Results per page; default `10` |
| `status` | string | No | Example: `AVAILABLE` |
| `bhk` | number | No | BHK count; `2` maps to `2BHK` |
| `minPrice` | number | No | Minimum estimated price |
| `maxPrice` | number | No | Maximum estimated price |
| `location` | string | No | Searches city/location |
| `listingType` | string | No | `SELL`, `RENT`, or `LEASE` |

Example:

```http
GET /properties/all-properties?location=Mumbai&bhk=2&minPrice=5000000&maxPrice=15000000&page=1&limit=10
```

Expected status: `200 OK`

### Get property details

```http
GET /properties/get/:propertyId
```

Authentication: Public

`propertyId` is the property's MongoDB `_id` in the current API.

Example:

```http
GET /properties/get/6a5b6cbff85297d2ab414564
```

Expected status: `200 OK`

### Edit property

```http
PATCH /properties/edit/:propertyId
```

Authentication: Bearer token

Only the agent who owns the property can edit it. Since this is a PATCH endpoint, send only the fields that need to change.

Example request:

```json
{
  "name": "Premium 2 BHK Apartment 3",
  "estimatedPrice": 12000000,
  "negotiable": true
}
```

A complete update can use the same supported fields as property creation.

Expected status: `200 OK`

### Delete property

```http
DELETE /properties/delete/:propertyId
```

Authentication: Bearer token

Only the agent who owns the property can delete it.

Example:

```bash
curl --request DELETE "{{baseUrl}}/properties/delete/6a5cbd38b3de320e4ddd1553" \
  --header "Authorization: Bearer {{agentToken}}"
```

Expected status: `200 OK`

---

## Enquiries

### Get agent enquiries

```http
GET /enquiries/agent-enquiries?page=1&limit=10
```

Authentication: Bearer token

Returns enquiries assigned to the authenticated agent, including populated property details for property-specific enquiries.

| Query parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Results per page |

Example response:

```json
{
  "success": true,
  "message": "Agent enquiries fetched successfully",
  "data": [
    {
      "enquiryType": "PROPERTY",
      "name": "Home Seeker",
      "email": "seeker@example.com",
      "phone": "7000000000",
      "propertyMongoId": {
        "_id": "6a5b6cc2f85297d2ab414565",
        "name": "Premium 2 BHK Apartment",
        "listingType": "SELL",
        "configuration": "2BHK",
        "estimatedPrice": 12500000,
        "status": "AVAILABLE"
      },
      "movingInTime": "JUST_EXPLORING",
      "message": "I am interested in this property.",
      "status": "NEW",
      "enquiryId": "ENQ-292E6A02D5"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalEnquiries": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

## Common status codes

| Status | Meaning |
| --- | --- |
| `200 OK` | Successful fetch, update, or delete |
| `201 Created` | Resource created successfully |
| `400 Bad Request` | Invalid request or identifier |
| `401 Unauthorized` | JWT missing, invalid, or expired |
| `403 Forbidden` | Authenticated agent does not own the resource |
| `404 Not Found` | Requested resource does not exist |
| `409 Conflict` | Email or phone number already registered |
| `500 Internal Server Error` | Unexpected server error |

## Postman setup

Create these collection variables:

| Variable | Example value |
| --- | --- |
| `baseUrl` | `http://property-env.eba-dhsg3mry.ap-south-1.elasticbeanstalk.com` |
| `agentToken` | JWT returned by `/agent/login` |
| `propertyId` | MongoDB `_id` returned when a property is created |

Use the following authorization value for every protected request:

```text
Bearer {{agentToken}}
```

## Collection notes

- The supplied Postman collection uses several different secret variable names for bearer tokens. This document standardizes them as `agentToken`.
- The GET `/agent` request in the collection contains a login-style body. A GET profile request should not send that body; authentication comes from the bearer token.
- The create-property sample includes a legacy numeric `bhk` field in addition to `configuration`. The current property model uses `configuration`, so this document omits `bhk` from the request body.
- The supplied collection contains the agent-enquiry listing endpoint but does not contain the public create-enquiry request.