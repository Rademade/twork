Requirements:

Docker
Docker Compose

Preparations:

docker-compose pull
docker-compose build

docker-compose run frontend npm install
docker-compose run app npm install

docker-compose run app npx sequelize-cli db:create
docker-compose run app npx sequelize-cli db:migrate

Run the site locally:
docker-compose up