# amunicja_pomorskie_frontend

Tldr: there is dobroni.org but it is aimed at stores from the south of the country, so I quickly made my own
to scrapbook the Pomeranian stores that interest me.

This is my first ever project in Bootstrap/js, feel free to join.

## How to run - Docker image ready for deployment

Docker images are built in this repository CI, and after push to master are published to Docker Hub with tags:
- day.month.year
- latest

To run application, start Docker container with following environment variables passed:

```bash
docker run --name ammo_front --rm -d -p 3000:3000 \
    -e DB_HOST=database IP address \
    -e DB_USER=database username \
    -e DB_PASSWORD=database password \
    -e DB_DATABASE=database name \
    -e DB_TABLE=table name \
    -e DB_PORT=database port \
wkobiela/ammo_front:latest
```
Check if container is healthy, and for the logs:
```bash
docker ps -a
docker container logs ammo_front
```

App will be available at `http://localhost:3000`


## Google analytics
Mount `analytics.js` file in /app catalog in container.<br>

```bash
docker run --name ammo_front --rm -d -p 3000:3000 \
    -e DB_HOST=database IP address \
...
    -v analytics.js:/app/analytics.js
wkobiela/ammo_front:latest
```

File should have following content: <br>
Remember to update `G-GOOGLE-JTAG-NUMBER` with your own analytics Google code.

```js
// Google tag (gtag.js)
(function() {
    var script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-GOOGLE-JTAG-NUMBER";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-GOOGLE-JTAG-NUMBER');
})();
```

## Development - how to setup environment?
Clone repository:
```bash
git clone ...
cd repository
```

Install packages:
```bash
npm install
```

Create `.env` file in main folder, next to `index.html` with database settings:

```bash
DB_HOST=IP_address
DB_USER=user
DB_PASSWORD=password
DB_DATABASE=database_name
DB_TABLE=table_name
DB_PORT=port
```
Start web server with:

```bash
npm run start
```


### Repository is using super-linter GHA job. For local linting:
- CSS
```bash
npm stylelint init
npx stylelint "**/*.css"
```
- JavaScript
```bash
standard --fix
```

## Early preview

![preview](https://i.ibb.co/phS4pzd/Przechwytywanie.png)


## More info
Database should contain data scrapped from web pages. More info here:
[wkobiela/dobroni_pomorskie_backend](https://github.com/wkobiela/dobroni_pomorskie_backend)