CREATE DATABASE IF NOT EXISTS example_database;
USE example_database;

CREATE TABLE IF NOT EXISTS example_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    caliber VARCHAR(50),
    shop VARCHAR(255),
    link VARCHAR(255),
    product_name VARCHAR(255),
    price VARCHAR(255),
    available VARCHAR(255),
    date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO example_table (caliber, shop, link, product_name, price, available)
VALUES
    ('9x19', 'Pestkownia', 'https://pestki.com', 'Scorpio 9x19', '0.95', 'Tak'),
    ('9x19', 'Sklep Zbrojownia', 'https://zbrojownia.pl', 'Fiocchi 9x19', '1.05', 'Tak'),
    ('9x19', 'Amunicja24', 'https://amunicja24.pl', 'Geco 9x19', '1.10', 'Tak'),
    ('9x19', 'Strzały dla Ciebie', 'https://strzaly.pl', 'Sellier & Bellot 9x19', '0.85', 'Nie'),
    ('9x19', 'Czarna Amunicja', 'https://czarnaamunicja.pl', 'Remington 9x19', '1.20', 'Tak'),
    ('9x19', 'Tactical Gear', 'https://tacticalgear.com', 'Hornady 9x19', '1.15', 'Tak'),
    ('7.62x39', 'Strzały Online', 'https://strzaly.com', 'AK-47 Ammo', '1.20', 'Tak'),
    ('223 Rem', 'Wojskowy Sklep', 'https://wojskowysklep.pl', 'M4 Carbine Rounds', '0.75', 'Tak'),
    ('.22 LR', 'Shooting Supplies', 'https://shootingsupplies.com', 'Ruger .22 Ammo', '0.30', 'Tak');

