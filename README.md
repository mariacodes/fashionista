# Fashionista

## Description
Singple Page App built using Angular, MongoDB, Bootstrap, Node, and Express. Digital storefront web application.

## Development
To begin, `npm install` to install the dependencies. Create a `.env` file at the root of the project and use the `.env.example` file as a template.

To run the server use `npm run start-server`.

To run the front end use `npm run start-client`.

### Schema for Collections
#### admin
```json
{
    "type": "string",
    "Fname": "string",
    "Lname": "string",
    "pass": "string"
}
```

#### products
```json
{
    "name": "string",
    "brand": "string",
    "price": "string",
    "email": "string",
    "availability": "string",
    "fashionimage": "string_url"
}
```

#### shoppingcart
```json
{
    "userId": "string",
    "name": "string",
    "brand": "string",
    "price": "string",
    "email": "string",
    "availability": "string",
    "fashionimage": "string_url"
}
```

#### user
```json
{
    "email": "testing",
    "Fname": "test",
    "Lname": "test",
    "pass": "test123"
}
```

#### wishlist
```json
{
    "userId": "string",
    "name": "string",
    "brand": "string",
    "price": "string",
    "email": "string",
    "availability": "string",
    "fashionimage": "string_url"
}
```