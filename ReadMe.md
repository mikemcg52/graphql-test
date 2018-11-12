This exploration was originally prompted by this article:  
    https://www.sitepoint.com/build-a-simple-api-service-with-express-and-graphql/  
    
As is often the case with internet articles this one didn’t work quite right so I had to dig around and I found this, simpler, article that I used to get things working.  
https://graphql.org/graphql-js/running-an-express-graphql-server/

I used the latter article for the initial implementation and then went back to the original to build something slightly more complex.  I think the key difference is the use of graphiql: true on line 80.  This provides the ability to use the GraphQL Playground functionality described in the initial article.
