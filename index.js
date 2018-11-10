const express = require("express")
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    posts: [Post]
    post(id: ID): Post
    authors: [Person]
    author(id: ID): Person
  }
  
  type Post {
    id: ID
    author: Person
    body: String
  }
  
  type Person {
    id: ID
    posts: [Post]
    firstName: String
    lastName: String
  }
`)

const rootValue = {
  posts: () => POSTS.values(),
  post: ({ id }) => POSTS.get(id),
  authors: () => PEOPLE.values(),
  author: ({ id }) => PEOPLE.get(id)
}

const PEOPLE = new Map()
const POSTS = new Map()

class Post
{
  constructor (data) {Object.assign(this, data)}

  get author ()
  {
    return PEOPLE.get(this.authorID)
  }
}

class Person
{
  constructor (data) {Object.assign(this, data)}

  get posts ()
  {
    return [...POSTS.values()].filter(post => post.authorID === this.id)
  }
}

// fake data for testing
const initializeData = () => {
  const fakePeople = [
    { id: '1', firstName: 'John', lastName: 'Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Doe' }
  ]
  fakePeople.forEach(person => PEOPLE.set(person.id, new Person(person)))

  const fakePosts = [
    { id: '1', authorID: '1', body: 'Hello, world' },
    { id: '2', authorID: '2', body: 'Hi, planet' }
  ]

  fakePosts.forEach(post => POSTS.set(post.id, new Post(post)))
}
initializeData()
// end fake data

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true
}))

const port = process.env.PORT || 4000
app.listen(port)
console.log(`Running a GraphQL API server at localhost: ${port}/graphql`)
