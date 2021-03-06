## Running the app

To run server on port 3000 development on watch mode
```
$ npm run start:dev
```

If you're using the application for the first time, you've got to seed the database
```
$ npm run seed:db
```

Don't forget to create .env file for the project with keys :
```PROJECT_PORT``` 
```DB_HOST``` 
```DB_USER``` 
```DB_PASSWORD``` 
```DB_NAME``` 
```SECRET``` 

## APIs

```POST /auth/login``` 	=> token

```POST /auth/register``` 	=> {new user (+score ) without pwd}
***
```GET /users``` 		=> [{users(+score)}] ```admin```

```GET /users/id``` 		=> {user(+score)}

```Patch /users/id```		=> {user} if user in token || ```admin```

```DELETE /users/id``` if user in token || ```admin```

***
```GET /addresses```		=> [{addresses for user}]

```GET /addresses/id``` 	=> {address}

```POST /addresses```		=> {address} if user in token

```Patch /addresses/id```	=> {address} if user in token

```DELETE /addresses/id``` if user in token

***
```GET /books?genre=id```		=> [{books (+genres)}] + can add query param ?genre=id,id2,id3

```GET /books/search?name=&genre=ids```		=> [{books (+genres)}] + can add query param ?name=title/author &genre=id,id2,id3

```GET /books/popular```		=> [{books sorted by avg rating score}] 

```GET /books/id``` 		=> {book(+genres+ratings+reviews)}

```POST /books```		=> {book} if user in token || ```admin```

```Patch /books/id```		=> {book} if book owned by user in token || ```admin```

```DELETE /books/id``` if book owned by user in token || ```admin```

***
```GET /genres```		=> [{genres}]

```GET /genres/id``` 	=> {genre (+books)}

```POST /genres```		=> {genre} ```admin```

```Patch /genres/id```	=> {genre} ```admin```

```DELETE /genres/id``` ```admin```

***
```GET /orders```		=> [{orders}] for user

```GET /orders/all```		=> [{orders}] ```admin```

```GET /orders/id``` 	=> {order}

```POST /orders```		=> {order} if user in token || ```admin```

```Patch /orders/id```	=> {order} if order owned by user in token || ```admin```

```DELETE /orders/id``` if order owned by user in token || ```admin```

***
```GET /ratings```		=> [{ratings}]

```GET /ratings/id``` 	=> {rating}

```POST /ratings```		=> {rating} if user in token

```Patch /ratings/id```	=> {rating} if rating owned by user in token

```DELETE /ratings/id``` if rating owned by user in token

***
```GET /reviews```		=> [{reviews}]

```GET /reviews/id``` 	=> {review}

```POST /reviews```		=> {review} if user in token

```Patch /reviews/id```	=> {review} if review owned by user in token ( click like?)

```DELETE /reviews/id``` if review owned by user in token

***
```GET /scores```		=> [{scores}] not needed...

```GET /scores/id``` 	=> {score} not needed...

```POST /scores```		=> {score} not needed...

```Patch /scores/id```	=> {score} if score owned by user in token

```DELETE /scores/id``` => not needed ( cascade delete when user deleted)
