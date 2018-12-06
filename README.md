# JWT - Login - Registro - NodeJS  MongoDB

### Instalación

Tener instalado [Node.js](https://nodejs.org/) y [MongoDB](https://www.mongodb.com/es).

Set variable de entorno de MongoDb:

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

Testeaar Api Rest (por ahora registro usuario):

```sh
$ npm run dev
$ npm test
```


#### Rutas (utilizar postman)


```js
/api/users/login (POST)
/api/users/register (POST)

/api/perfil?secret_token={{token}} (GET)
/api/productos?secret_token={{token}} (GET)
/api/productos?secret_token={{token}} (POST)
/api/productos/:id?secret_token={{token}} (GET)
/api/productos/:id?secret_token={{token}} (PUT)
/api/producto/delete/:id?secret_token={{token}} (DELETE)
```
#### Modelo User

```
name: tipo String - requerido
email: tipo String - requerido
password: tipo String - requerido
avatar: tipo String
date: tipo Date
```

#### Modelo Producto

```
titulo: tipo String
autor: tipo String
```