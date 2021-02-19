# Headless CMS & GraphQL API with KeystoneJS

- https://www.keystonejs.com/documentation/
- https://www.mongodb.com/3
- https://www.apollographql.com/docs/react/get-started/ - use to create the front-end

```
$ npx create-keystone-app .
$ npm install dotenv
$ npm install @keystonejs/auth-password
```

```
query {
  _allPostsMeta {
    count
  }
}

query {
  allPosts {
    id
    title
  }
}

mutation {
  createPost(data: {
    title: "Post three",
    body: "This is post three",
    author: "Krasen"
  }){
    id
  }
}
```

√ Keystone instance is ready at http://localhost:5000 🚀
🔗 Keystone Admin UI: http://localhost:5000/admin
🔗 GraphQL Playground: http://localhost:5000/admin/graphiql
🔗 GraphQL API: http://localhost:5000/admin/api
