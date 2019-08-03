# Json Web Token, login, registro y CRUD con Node.js 

### Instalación

Tener instalado [Node.js](https://nodejs.org/) y [MongoDB](https://www.mongodb.com/es).

Setee variable de entorno de MongoDb:

```sh
$ export MONGODB_URL="mongodb://..."
```

Instalar las dependencias e iniciar:

```sh
$ npm install
```

En modo desarrollo

```sh
$ npm run dev
```

En modo produccion

```sh
$ npm start
```

En modo debug:

```sh
$ npm run debug
```

Testear Api Rest (por ahora registro usuario):

```sh
$ npm run dev
$ npm test
```


#### Rutas (utilizar postman)


```js
/api/users/login (POST)
/api/users/register (POST)

/api/perfil (GET)
/api/peliculas (GET)
/api/peliculas (POST)
/api/peliculas/:id (GET)
/api/peliculas/:id (PUT)
/api/peliculas/:id (DELETE)
```
#### Modelo User

```
name: String - requerido
email: String - requerido
password: String - requerido
avatar: String
date: Date
```

#### Modelo Peliculas

```
name: String
description: String
link: String
images: Array
stars: Number
year: Number
gender: String
categories: Array
```

### Modelo Categorias

```
name: String
date: Date
```