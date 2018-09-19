### TechShop
A fake ecommerce app that allows you to buy tech items such as: *phones, tables, laptops, etc*.
You can manage categories, products, orders and users. Also you can make orders and review your orders.

#### Screenshot:
![alt text](https://res.cloudinary.com/dombtm0fe/image/upload/v1537368098/screencapture-techshopapp-herokuapp-home-2018-09-19-10_19_59.png)

#### How to run:
##### API (Laravel)
* Clone: `https://github.com/Belzee10/tech-shop.git`
* Go to the directory and run: `composer install`
* Copy `.env.example` file to `.env` on the root folder
* Open the `.env` file and change the Database parameters(`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) to whatever you have
* Run `php artisan key:generate`
* Run `php artisan migrate --seed`
* Run `php artisan storage:link`
* Run `php artisan serve`

##### Client (Angular)
* Go to `public/tech-shop-app`
* Run `npm install`
* Run `npm start`
* The App is alive in: `localhost:4200`

**User:** `admin@email.com`
**Password:** `123`

