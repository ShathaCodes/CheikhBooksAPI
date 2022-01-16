## Running the app

```bash
# development watch
$ npm run start:dev

# if you're using the application for the first time, you've got to seed the database
$ npm run seed:db
```

## APIs

```POST /auth/login``` 	=> token

```POST /auth/register``` 	=> new user (+score ) without pwd


```GET /users``` 		=> [{users}]

```GET /users/id``` 		=> {user}

```Patch /users/id```		=> {user}

```DELETE /users/id```


```GET /books```		=> [{books}]

```GET /books/id``` 		=> {book}

```POST /books```		=> {book}

```Patch /books/id```		=> {book}

```DELETE /books/id```


```GET /addresses```		=> [{addresses}]

```GET /addresses/id``` 	=> {address}

```POST /addresses```		=> {address}

```Patch /addresses/id```	=> {address}

```DELETE /addresses/id```
