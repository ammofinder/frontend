# ammofinder frontend

TLDR: there already is [dobroni.org](dobroni.org) but it is aimed at stores from the south of the country.<br>
That's a pitty, northern shooters want some easy-to-find cheap ammo too!<br>
So? I quickly made my own project to scrape information from the Pomeranian stores that are in my interest - mainly Trojmiasto region.

<u>This is my first ever project in Bootstrap/js, feel free to join.</u>
<br><br>
Cheers,<br>
[@wkobiela](https://github.com/wkobiela)

## Production server running and available here
### [https://ammofinder.duckdns.org/](https://ammofinder.duckdns.org/) <br><br>


## How to run - Docker image ready for deployment

Docker images are built within this repository CI job, and published to [Docker Hub](https://hub.docker.com/repository/docker/wkobiela/ammofinder_frontend/general) with tags:

For master:
- master-short_sha
- latest

For PRs:
- PR-pr_number

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

App will be available at `http://localhost:3000` (or at whatever IP address container will be started).


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


### Repository is using super-linter GHA job - how to lint locally?
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

![preview](https://i.ibb.co/30XDnKN/Przechwytywanie.png)


## More info
Database should contain data scrapped from web pages. More info in backend/scrappers repository::
[ammofinder/backend](https://github.com/ammofinder/backend)