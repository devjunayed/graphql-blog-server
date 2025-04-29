# Blog app

## Requirements

- user can post and publish blog content
- user can see post
- authentication system
- user can see their own profile

## Table

- post 
    - id
    - title
    - content
    - authorId
    - published
    - publishedAt
    - createdAt
    - updatedAt

- user
    - id
    - name
    - email
    - password
    - createdAt
    - updatedAt
    - profile

- profile
    - id
    - bio
    - userId
    - createdAt
    - updatedAt

## Technology stack:

- graphQl
- typescript
- postgresSql
- prisma