# amunicja_pomorskie_frontend

Tldr: there is dobroni.org but it is aimed at stores from the south of the country, so I quickly made my own
to scrapbook the Pomeranian stores that interest me.

It is possible that the site will be online soon.

# Needed packages
- npm
- node

# How to run

Create `.env` file in main folder, next to `index.html` with database settings:

```bash
DB_HOST=IP_address
DB_USER=user
DB_PASSWORD=password
DB_DATABASE=database_name
DB_TABLE=table_name
DB_PORT=port
```

Install dependencies and run:
```bash
npm install
npm run start
```

Webpage will be available on `http://localhost:8080` while db_connection server on `http://localhost:3000`.


# Early preview

![preview](https://i.ibb.co/phS4pzd/Przechwytywanie.png)


# More info
Database should contain data scrapped from webpages. More info here: 
https://github.com/wkobiela/dobroni_pomorskie_backend
