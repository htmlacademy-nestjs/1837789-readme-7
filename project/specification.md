## Удалить старые контейнеры связанные с проектом если они есть

```sh
docker rm -f $(docker ps -a | grep readmе | awk '{print $1}' | xargs)
docker volume rm $(docker volume ls | grep readme | awk '{print $2}' | xargs)
```
## Добавить необходимые .env файлы в той же директории на основе .env-example

#### ./apps/api/api.env
```sh
RABBITMQ_DEFAULT_USER=alina - Пользователь для работы RabbitMQ
RABBITMQ_DEFAULT_PASS=test - Пароль для работы с RabbitMQ
API_PORT=3005 - Порт для Api
API_RABBIT_HOST=localhost - Хост для работы RabbitMQ
API_RABBIT_PASSWORD=test - Пароль для работы с RabbitMQ
API_RABBIT_PORT=5673 - Порт на котором будет работать RabbitMQ
API_RABBIT_USER=admin - Пользователь для работы RabbitMQ
API_RABBIT_QUEUE=readme.notify.api - Название очереди RabbitMQ
API_RABBIT_EXCHANGE=readme.notify.api - Назание распределителя сообщений RabbitMQ
```
#### ./apps/account/account.env
```sh
MONGO_DB=readme-accounts - Название базы данных
MONGO_HOST=localhost - Хост для работы базы данных
MONGO_PORT=27017 - Порт базы данных внутри контейнера
MONGO_USER=alina - Имя пользователя базы данных
MONGO_PASSWORD=1234567 - Пароль пользователя базы данных
MONGO_AUTH_BASE=admin - Название базы данных для подключения

MONGO_EXTERNAL_PORT=27018 - Порт базы данных снаружи контейнера

PORT=3002 - Порт на котором будет работать сервис

MONGO_INITDB_ROOT_USERNAME=alina - Имя пользователя базы данных
MONGO_INITDB_ROOT_PASSWORD=1234567 - Пароль пользователя базы данных 
MONGO_INITDB_DATABASE=readme-accounts - Название базы данных
ME_CONFIG_BASICAUTH_USERNAME=alina - Имя пользователя базы данных
ME_CONFIG_BASICAUTH_PASSWORD=1234567 - Пароль пользователя базы данных
ME_CONFIG_MONGODB_ADMINUSERNAME=alina - Имя пользователя базы данных
ME_CONFIG_MONGODB_ADMINPASSWORD=1234567 - Пароль пользователя базы данных
ME_CONFIG_MONGODB_URL=mongodb://alina:1234567@readme.account.mongo:27017/

JWT_ACCESS_TOKEN_SECRET=token-secret-string - JWT секрет токена доступа
JWT_ACCESS_TOKEN_EXPIRES_IN=1d - JWT время жизни токена
JWT_REFRESH_TOKEN_SECRET=refresh-token-secret-string - JWT секрет рефреш токена
JWT_REFRESH_TOKEN_EXPIRES_IN=30d - JWT время жизни рефреш токена

RABBIT_HOST=localhost - Хост для работы RabbitMQ
RABBIT_PASSWORD=1234567 - Пароль для работы с RabbitMQ
RABBIT_PORT=5672 - Порт на котором будет работать RabbitMQ
RABBIT_USER=alina - Пользователь для работы RabbitMQ
RABBIT_QUEUE=readme.notify.income - Название очереди RabbitMQ
RABBIT_EXCHANGE=readme.notify - Назание распределителя сообщений RabbitMQ
```
#### ./apps/blog/blog.env
```sh
POSTGRES_USER=alina - Имя пользователя базы данных
POSTGRES_PASSWORD=1234567 - Пароль пользователя базы данных
POSTGRES_DB=readme-blog - Название базы данных
PGADMIN_DEFAULT_EMAIL=test@readme.local - Почтовый ящик администратора базы данных
PGADMIN_DEFAULT_PASSWORD=1234567 - Пароль администратора базы данных
PGADMIN_LOCAL_PORT=8082 - Порт для запуска PgAdmin
PGADMIN_REMOTE_PORT=80
PORT=5432 - Порт внутри котейнера на котором будет работать PostgreSQL
PORT=3001 - Порт на котором будет работать сервис
POSTGRES_EXTERNAL_PORT=5433 - Порт снаружи котейнера на котором будет работать PostgreSQL
```
#### ./apps/file-storage/file-storage.env
```sh
UPLOAD_DIRECTORY_PATH=<path to upload> - Путь к директории для сохранения файлов
MONGO_HOST=localhost - Хост для работы базы данных
MONGO_PORT=27018 - Порт базы данных внутри контейнера
MONGO_DB=readme-file-storage - Название базы данных
MONGO_USER=alina - Имя пользователя базы данных
MONGO_PASSWORD=1234567 - Пароль пользователя базы данных
MONGO_AUTH_BASE=admin - Название базы данных для подключения
```
#### ./apps/notify/notify.env
```sh
RABBITMQ_DEFAULT_USER=alina - Пользователь для работы RabbitMQ
RABBITMQ_DEFAULT_PASS=1234567 - Пароль для работы с RabbitMQ

MONGO_HOST=localhost - Хост для работы базы данных
MONGO_PORT=27019 - Порт базы данных внутри контейнера
MONGO_DB=readme-notify - Название базы данных
MONGO_USER=alina - Имя пользователя базы данных
MONGO_PASSWORD=1234567 - Пароль пользователя базы данных
MONGO_AUTH_BASE=admin - Название базы данных для подключения

RABBIT_HOST=localhost - Хост для работы RabbitMQ
RABBIT_PASSWORD=1234567 - Пароль для работы с RabbitMQ
RABBIT_PORT=5673 - Порт на котором будет работать RabbitMQ
RABBIT_USER=alina - Пользователь для работы RabbitMQ
RABBIT_QUEUE=readme.notify.income - Название очереди RabbitMQ
RABBIT_EXCHANGE=readme.notify - Назание распределителя сообщений RabbitMQ

MAIL_SMTP_HOST=localhost - Хост почтового сервера
MAIL_SMTP_PORT=8025 - Порт почтового сервера
MAIL_USER_NAME=alina - Имя пользователя почтового сервера
MAIL_USER_PASSWORD=1234567 - Пароль пользователя почтового сервера
MAIL_FROM=alina@gmail.com - Почтовый ящик отправителя по умолчанию
```

## Запустить контейнеры

```sh
docker compose --file ./apps/account/docker-compose.yaml --env-file ./apps/account/account.env --project-name "readme-account" up -d
docker compose --file ./apps/blog/docker-compose.ayml --env-file ./apps/blog/blog.env --project-name "readmy-blog" up -d
docker compose --file ./apps/file-storage/docker-compose.yaml --env-file ./apps/file-storage/file-storage.env --project-name "readme-file-storage" up -d
docker compose --file ./apps/notify/docker-compose.yaml --env-file ./apps/notify/notify.env --project-name "readme-notify" up -d 
```

## На всякий случай, сбросить nx

```sh
npx nx reset
```

## Заполнить БД тестовыми данными

```sh
npx nx run account:db:reset
npx nx run account:db:generate
npx nx run account:db:seed

npx nx run blog:db:reset
npx nx run blog:db:generate
npx nx run blog:db:seed
```

## Запустить все сервисы необходимые для работы приложения

```sh
npx nx run api:serve
npx nx run account:serve
npx nx run blog:serve
npx nx run file-storage:serve
npx nx run notify:serve
```

# Запросы для тестирования функционала приложения через API Gateway

- apps/api/src/app/app.http

# Запросы для тестирования отдельных сервисов

- apps/file-storage/src/app/file-uploader.http
- libs/account/authentication/src/authentication-module/authentication.http
- libs/blog/blog-comment/src/comments-module/comments.http
- libs/blog/blog-post/src/posts-module/post.http

