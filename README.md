# projeto18-valex
A Typescript designed project to manage benefit cards among companies and employees


<p align="center">
  <img  src="https://cdn.iconscout.com/icon/free/png-256/credit-card-2650080-2196542.png">
</p>
<h1 align="center">
  Valex
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

Valex simulates an API that manages a benefit card, generally made available by companies to their employees.

</br>

## Features

-   Get the card balance and transactions
-   Create cards
-   Activate / Block / Unlock a card
-   Recharge a card
-   Make card payments with online payment option

</br>

## API Reference

### Get card balance

```http
GET /mycard-transactions/:id
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `cardId`    | `integer` | **Required**. card Id |

#

### Create a card

```http
POST /create-card/:id
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `employeeId` | `integer`| **Required**. user Id | 

####

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `type`       | `string` | **Required**. type of card benefit       |

`Valid types: [groceries, restaurant, transport, education, health]`

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

</br>

#### Response:

```json
{
	"number": "1111-1111-1111-1111",
	"cardholderName": "NAME N NAME",
	"securityCode": "111",
	"expirationDate": "01/27",
	"isVirtual": false,
	"isBlocked": true,
	"type": "card type",
	"cvc": "111"
}
```
`number has no defined format`

#

### Activate a card

```http
PUT /activate-card
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `cardId`         | `integer`| **Required**. card Id              |
| `password`       | `string` | **Required**. card password        |
| `securityCode`   | `string` | **Required**. card cvv             |

`Password length: 4`

`Password pattern: only numbers`

`Cvv max length: 3`

#

### Block a card

```http
PUT /mycard-block/:id
```

#### Request:

|    Params        |   Type   | Description                        |
| :----------      | :--------| :----------------------------------|
| `cardId`         | `integer`| **Required**. card Id              | 

####

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `password`       | `string` | **Required**. card password        |

#

### Unlock a card

```http
PUT /mycard-unblock/:id
```

#### Request:

|    Params        |   Type   | Description                        |
| :----------      | :--------| :----------------------------------|
| `cardId`         | `integer`| **Required**. card Id              | 

####

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `password`       | `string` | **Required**. card password        |

#

### Recharge a card

```http
POST /recharge-card/:id
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

|    Params        |   Type   | Description                        |
| :----------      | :--------| :----------------------------------|
| `cardId`         | `integer`| **Required**. card Id              | 

####

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `amount`         | `integer` | **Required**. recharge amount      |

#

### Card payments

```http
POST /buy-store/:id
```
#### Request:

|    Params        |   Type   | Description                        |
| :----------      | :--------| :----------------------------------|
| `businessId`     | `integer` | **Required**. card expiration date| 

####

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `cardId`         | `integer` | **Required**. card Id              |
| `password`       | `string`  | **Required**. card password        |
| `amount`         | `integer` | **Required**. payment amount       |

#

```http
POST /buy-online/:id
```

#### Request:

|    Params        |   Type   | Description                        |
| :----------      | :--------| :----------------------------------|
| `businessId`     | `integer` | **Required**. card expiration date| 

####

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `cardId`         | `integer` | **Required**. card Id              |
| `cardholderName` | `string`  | **Required**. name in card         |
| `cardNumber`     | `string`  | **Required**. card number          |
| `expirationDate` | `string`  | **Required**. card expiration date |
| `securityCode`   | `string`  | **Required**. card CVV             |
| `amount`         | `integer` | **Required**. payment amount       |

`Expiration Date Format: "MM/YY"`

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/FKnight-cyber/projeto18-valex
```

Go to the project directory

```bash
  cd projeto18-valex/
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  cd src/db/dbConfig
```
```bash
  bash ./create-database
```
```bash
  cd ../../..
```

Start the server

```bash
  npm run start
```

</br>

## Lessons Learned

In this project I learned a lot about how to structure an API with TypeScript

</br>

## Acknowledgements

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>

## Authors

-   Ryan Nicholas is a student at Driven Education and is putting effort into it to become a Dev.
<br/>

#
