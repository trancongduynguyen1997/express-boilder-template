require('dotenv').config();

let loggingDataBase = false;
if (process.env.NODE_ENV === 'test') {
  loggingDataBase = false;
} else if (process.env.SQL_LOG === 'true') {
  // eslint-disable-next-line no-console
  loggingDataBase = console.log;
}
const config = {
  host: `http://localhost:${process.env.PORT}`,
  security: {
    jwt: {
      algorithm: 'RS256',
      maxage: '6h',
    },
  },
  database: {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB,
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    dialect: process.env.SQL_DIALECT,
    logging: loggingDataBase,
    pool: {
      max: Number(process.env.SQL_POOL_LIMIT),
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      freezeTableName: true,
      timestamps: true,
    },
    // replication: process.env.NODE_ENV === 'production' ? {
    //     read: [{ host: process.env.SQL_HOST_READ }],
    //     write: { host: process.env.SQL_HOST_WRITE }
    // } : null
  },
};

module.exports = config;
