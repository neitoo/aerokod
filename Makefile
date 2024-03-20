up:
	docker-compose up -d
stop:
	docker-compose stop

init: up app-grant-write-permission setting-env app-composer-install app-migrations app-storage-link app-swagger app-generate-swagger app-seeders

swagger: app-generate-swagger

app-composer-install:
	docker-compose run --rm laravel composer install
	docker-compose run --rm laravel composer run-script post-root-package-install
	docker-compose run --rm laravel composer run-script post-create-project-cmd

setting-env:
	cp frontend/.env.example frontend/.env

app-migrations:
	docker-compose run --rm laravel php artisan migrate --force

app-swagger:
	docker-compose run --rm laravel php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"

app-generate-swagger:
	docker-compose run --rm laravel php artisan l5-swagger:generate

app-seeders:
	docker-compose run --rm laravel php artisan db:seed

app-storage-link:
	docker-compose run --rm laravel php artisan storage:link

app-grant-write-permission:
	docker-compose run --rm laravel chmod -R 777 ./
