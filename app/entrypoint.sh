#!/bin/sh

npx sequelize-cli db:create
npx sequelize-cli db:migrate

npm run serve