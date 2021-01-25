# GraphQL

- https://graphql.org/

- Build the back end server
- Setup Express with Express-GraphQL
- Createa schema file with queries and mutations
- Implement JSON-Server
- CRUD functionality
- Test with GraphQL

```
$ npm init
$ npm install express express-graphql graphql nodemon
$ npm install json-server axios
```

- http://localhost:4000/graphql

```
{
  customer(id:"1") {
    name
    email
    age
  }
  customers {
    id,
    name,
    email,
    age
  }
}
```

- http://localhost:3000/
- http://localhost:3000/customers

## Create, delete, update customer

```
mutation {
  addCustomer(name: "Liz", email: "liz@yahoo.com", age: 21){
    id
    email
    name
  }
}

mutation {
  deleteCustomer(id: "4") {
    id
  }
}
```
