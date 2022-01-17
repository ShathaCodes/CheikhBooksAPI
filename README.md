## Running the app

To run server on port 3000 development on watch mode
```
$ npm run start:dev
```

If you're using the application for the first time, you've got to seed the database
```
$ npm run seed:db
```

## APIs

```POST /auth/login``` 	=> token

```POST /auth/register``` 	=> {new user (+score ) without pwd}
***
```GET /users``` 		=> [{users(+score)}]

```GET /users/id``` 		=> {user(+score)}

```Patch /users/id```		=> {user}

```DELETE /users/id```

***
```GET /addresses```		=> [{addresses for user}]

```GET /addresses/id``` 	=> {address}

```POST /addresses```		=> {address}

```Patch /addresses/id```	=> {address}

```DELETE /addresses/id```

***
```GET /books```		=> [{books (+genres)}]

```GET /books/id``` 		=> {book(+genres+ratings+reviews)}

```POST /books```		=> {book}

```Patch /books/id```		=> {book}

```DELETE /books/id```

***
```GET /genres```		=> [{genres}]

```GET /genres/id``` 	=> {genre (+books)}

```POST /genres```		=> {genre}

```Patch /genres/id```	=> {genre}

```DELETE /genres/id```

***
```GET /orders```		=> [{orders}]

```GET /orders/id``` 	=> {order}

```POST /orders```		=> {order}

```Patch /orders/id```	=> {order}

```DELETE /orders/id```

***
```GET /ratings```		=> [{ratings}]

```GET /ratings/id``` 	=> {rating}

```POST /ratings```		=> {rating}

```Patch /ratings/id```	=> {rating}

```DELETE /ratings/id```

***
```GET /reviews```		=> [{reviews}]

```GET /reviews/id``` 	=> {review}

```POST /reviews```		=> {review}

```Patch /reviews/id```	=> {review}

```DELETE /reviews/id```

***
```GET /scores```		=> [{scores}]

```GET /scores/id``` 	=> {score}

```POST /scores```		=> {score}

```Patch /scores/id```	=> {score}

```DELETE /scores/id```
