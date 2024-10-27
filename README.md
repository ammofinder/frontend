# amunicja_pomorskie_frontend

Tldr: there is dobroni.org but it is aimed at stores from the south of the country, so I quickly made my own
to scrapbook the Pomeranian stores that interest me.

This is my first ever project in Bootstrap/js, feel free to join.

## Needed packages
- npm
- node

## How to run

Create `.env` file in main folder, next to `index.html` with database settings:

```bash
DB_HOST=IP_address
DB_USER=user
DB_PASSWORD=password
DB_DATABASE=database_name
DB_TABLE=table_name
DB_PORT=port

NODE_ENV=production
```

Install dependencies and run:
```bash
npm install
npm run start
```

Web page and API server will be available on  `http://localhost:3000`.

## Run with Docker

1. Build image
```bash
docker build -t ammo_frontend:latest .
```
2. Run container
```bash
docker run -d -p 3000:3000 ammo_frontend:latest
```
3. App should be accessible on host IP:3000

## Google analytics
Create `analytics.js` file in main catalog, before building docker image/running server, with following content.<br>
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
## Early preview

![preview](https://i.ibb.co/phS4pzd/Przechwytywanie.png)

## More info
Database should contain data scrapped from web pages. More info here:
[wkobiela/dobroni_pomorskie_backend](https://github.com/wkobiela/dobroni_pomorskie_backend)