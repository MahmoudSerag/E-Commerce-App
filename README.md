<p align="center">
  <img src="./Unknown-Squad.png" width="100" alt="Unknown-Squad" /></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
<img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
</a></p>

<p align="center">
<img alt="Node.Js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img alt="Nest.Js" src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white">
<img alt="Swagger" src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white">
<img alt="NPM" src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white"></p>

## Description

The e-commerce app built with Node.js, Nest framework, MongoDB, and JWT offers a comprehensive set of features to support the entire shopping experience for customers. Users can register and login securely using JWT authentication, search and browse the product catalog, add products to their cart, and complete the checkout process with ease.

For example, a user can search for a product, add it to their cart, and choose a payment method. Once the payment is processed, the order is created and the user can track the status of their order from the app. Additionally, the app offers customer support features, such as the ability to create support tickets and get assistance with any issues that may arise.

Overall, the e-commerce app provides a seamless shopping experience that is secure, user-friendly, and efficient, making it a great choice for businesses looking to create a successful online store.

## Database Design

![Input info](https://cdn.discordapp.com/attachments/978298076039098478/1103094446897233960/Database_diagram.png)

### Documentation

[Here](https://e-commerc-app.onrender.com/api/docs)

## Installation

```bash
$ git clone https://github.com/MahmoudSerag/E-Commerce-App
$ cd E-Commerce-App
$ npm install
```

Create `.env` file, and add [Environment Variables](#environment-variables) to it:

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Environment Variables

1. `PORT`: Specifies the server port number (e.g. `3000`).

2. `MONGO_URI`: Specifies the MongoDB connection URL (e.g. `mongodb://localhost:27020/database_name OR add ur Mongo Cluster URI`)

3. `EMAIL_SERVICE`: gmail

4. `EMAIL_HOST`: smtp.gmail.com

5. `EMAIL_PORT`: 465

6. `EMAIL_SENDER`: `Add ur email (e.g: JohnDoe@example.com)`

7. `EMAIL_PASSWORD`: `Add ur email password (e.g: ddas123gtrqxD)`

8. `JWT_SECRET_KEY`: Specifies the secret key for JWT authentication (e.g. `secretKeyForEducationPlatform12345@$`).

9. `JWT_EXPIRES_IN`: Specifies the JWT expiration time (e.g. `30d`).
10. `STRIPE_SK`: `Add ur stripe secret key`
11. `SERVER_DOMAIN`: Specifies the server-side app domain (e.g. `http://localhost:3000 OR Add ur production server domain`).

## License

Nest is [MIT licensed](LICENSE).
