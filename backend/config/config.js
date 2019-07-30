export default {
  development: {
    DB_USERNAME: "jivens",
    DB_PASSWORD: "st33rpik3",
    DB_NAME: "colrc_dev",
    DB_HOST: "localhost",
    DB_PORT: 3306,
    DB_DIALECT: "mysql",
    JWT_SECRET: "Mysecretpasscode",
    COMPOSE_PROJECT_NAME: "colrc-v2"
  },
  test: {
    DB_USERNAME: "jivens",
    DB_PASSWORD: "st33rpik3",
    DB_NAME: "colrc_test",
    DB_HOST: "localhost",
    DB_PORT: 3306,
    DB_DIALECT: "mysql",
    JWT_SECRET: "Mysecretpasscode",
    COMPOSE_PROJECT_NAME: "colrc-v2"
  },
  production: {
    DB_USERNAME: "jivens",
    DB_PASSWORD: "st33rpik3",
    DB_NAME: "colrc",
    DB_HOST: "localhost",
    DB_PORT: 3306,
    DB_DIALECT: "mysql",
    JWT_SECRET: "Mysecretpasscode",
    COMPOSE_PROJECT_NAME: "colrc-v2"
  }
}
