# API REST with Typescript

This project is an api-rest performs with Nodejs, express and typescript as main technologies, also uses mysql to store data. It has sections of category, customers, products, purchases, purchases of products and users. Includes authentication methods using json web token for the login.

## Instalación

```bash
git clone https://github.com/EliasAcostaa/API-REST-NodeJs.git
cd api-rest-nodejs
npm install
npm run start:dev
```
## Tecnologías principales

- nodejs v14.18.1
- express v4.18.2
- typescript v4.6.2
- typeorm v0.3.6
- mysql v2.18.1

## Uso

Esta aplicación necesita las siguientes variables de entorno:

- `PORT` puerto de ejecución
- `DB_PORT` puerto de ejecución de la base de datos
- `DB_DATABASE` nombre de base de datos
- `DB_USER` nombre de usuario de base de datos
- `DB_PASSWORD` contraseña de base de datos
- `DB_HOST` servidor de base de datos
- `JWT_SECRET` llave secreta para generacion de jwt