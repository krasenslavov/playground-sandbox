# MongoDB Crash Course (Atlas)

- https://www.mongodb.com/2
- https://account.mongodb.com/account/login

- Add `C:\Program Files\MongoDB\Server\4.4\bin` to Windows env and run `mongo` to enter the MongoDB shell

```
> show dbs
> use products
> db
> show collections
> db.dropDatabase('products)
> use playground
> db.craeteCollection('posts)
```

### Insert Single Entry

```
> db.posts.insert({
  title: "Post One",
  body: "This is post one body",
  category: "News",
  likes: 10,
  tags: ["news", "events"],
  user: {
    name: "John Doe",
    status: "author"
  },
  date: Date()
});

WriteResult({ "nInserted" : 1 })
```

### Insert Multiple Entries

```
> db.posts.insertMany([
  {
    title: "Post Two",
    body: "This is post two body",
    category: "News",
    date: Date()
  },
  {
    title: "Post Three",
    body: "This is post three body",
    category: "Tech",
    date: Date()
  },
  {
    title: "Post Three",
    body: "This is post three body",
    category: "Book Reviews",
    date: Date()
  }
]);

{
  "acknowledged" : true,
  "insertedIds" : [
    ObjectId("60108a349515eadd412f51c5"),
    ObjectId("60108a349515eadd412f51c6"),
    ObjectId("60108a349515eadd412f51c7")
  ]
}
```

### Find Entries and Fiters

```
> db.posts.find();
> db.posts.find().pretty();
> db.posts.find({ category: "news" }).count();
> db.posts.find().sort({ title: 1 }).pretty();
> db.posts.find().limit();
> db.posts.find().forEach((doc) => { print('Blog Post: ' + doc.title)});
> db.post().findOne({ category: "news" });
```

### Update Entries

```
> db.posts.update({ title: "Post Three" },
  {
    title: "Post Four",
    body: "This is post four body",
    date: Date()
  },
  {
    upsert: true // If not found insert it.
  }
);

// Update single field only
> db.posts.update({ title: "Post Four" },
  {
    $set: {
      category: "News"
    }
  }
);

// Add 'increment' to int
> db.posts.update({ title: "Post One" }, { $inc: { likes: 2 }});

// Remove post field
> db.posts.update({ title: "Post One" }, { $rename: { likes: "views" }});
```

### Delete Entries

```
> db.posts.remove({ title: "Post Four" });
```

### Add and find subsets (relationships)

```
> db.posts.update({ title: "Post One" },
  {
    $set: {
      comments: [
        {
          user: "John Doe",
          body: "Comment 1",
          date: Date()
        },
        {
          user: "Harry Blank",
          body: "Comment Two",
          date: Date()
        }
      ]
    }
  }
);

> db.posts.find({
  comments: {
    $elemMatch : {
      user: "John Doe"
    }
  }
}).pretty();
```

### Adding Text-search

```
> db.posts.createIndex({ title: "text" });
{
  "createdCollectionAutomatically" : false,
  "numIndexesBefore" : 1,
  "numIndexesAfter" : 2,
  "ok" : 1
}

> db.posts.find({
  $text: {
    $search: "\"Post T\""
  }
}).pretty();
```

### Other

```
> db.posts.update({ title: 'Post Two'}, { $set: { views: 10 }});
> db.posts.find({ views: { $gt: 10, $lt: 20 }});
> db.posts.find({ views: { $gte: 10 }});
```

### Connection to Atlas with Compasss

```
> mongo "mongodb+srv://dbname.aa0b1.mongodb.net/<dbname>" --username <user>
```
