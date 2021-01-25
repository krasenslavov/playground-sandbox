# Gatsby Crash Course

- https://www.gatsbyjs.com/
- https://reactjs.org/
- https://graphql.org/
- https://daringfireball.net/projects/markdown/

```
$ npm install -g gatsby-cli
$ gatsby.cmd new gatsby-crash-course
$ gatsby.cmd develop
```

- http://localhost:8000/

## GraphQL

- http://localhost:8000/\_\_\_graphql

```
{
  allFile {
    edges {
      node {
        id
      }
    }
  }
}
```

```
{
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          path
          title
          date
          author
        }
        excerpt
      }
    }
  }
}
```

## Blog

```
$ npm install gatsby-source-filesystem
$ npm install gatsby-transformer-remark
$ npm install gatsby-plugin-catch-links
```
