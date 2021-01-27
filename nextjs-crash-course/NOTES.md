# Next.js Crash Course

- https://nextjs.org/

> - Can't import global stylesheet in the components, add it to `_app.js`
> - Each component has its own stylesheet naming it like `Home.module.css`
> - Head is used to define html > head

```
$ npx create-next-app
```

### Build

**package.json**

```
...
  "build": "next build && next export",
...
```

```
$ npm run build
$ npm install -g serve
$ serve.cmd -s ./out -p 8000
```

### API

- http://localhost:3000/api/articles
- http://localhost:3000/api/articles/1
