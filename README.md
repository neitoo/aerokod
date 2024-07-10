<h1>Dynamic-Filter</h1>

<h3>Технические требования:</h3>

1) Docker и docker-compose
2) Node.js >19.7.0 

***
<h3>Инструкция по установке проекта:</h3>

Из корня проекта вызываем команду:

```php
make init
```

***
<h3>Инструкция по запуску проекта</h3>

1) Из корня проекта вызываем команду:

```php
make up
```

Адрес бекенда
[http://localhost:8083/](http://localhost:8083/)

Документация апи
[http://localhost:8083/api/documentation](http://localhost:8083/api/documentation)

2) Из папки ***frontend*** вызываем команды:
```php
npm i && npm run dev
```
Проект откроется по адресу
[http://localhost:3000/](http://localhost:3000/)

3) Для того чтобы остановить контейнеры Docker из папки проекта вызываем команду:
```php
make stop
```
***
<h3>Ожидаемый результат:</h3>

1) из папки ***frontend*** выполняется команда:
```php
npm run lint
```
**Все проверки линтера проходят успешно**

2) из папки ***frontend*** выполняются команды:
```php
npm run build && npm run start
```
**Билд успешно собирается и проект открывается по адресу**
[http://localhost:3000/](http://localhost:3000/)
