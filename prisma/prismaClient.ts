// const { PrismaClient } = require("@prisma/client")
// const { PrismaMssql } = require("@prisma/adapter-mssql")

// const adapter = new PrismaMssql({
//   server: "localhost",
//   port: 1433,
//   database: "UrlShortenerDB",
//   authentication: {
//     type: "default",
//     options: {
//       userName: "testUser",
//       password: "StrongPassword123!"
//     }
//   },
//   options: {
//     trustServerCertificate: true,
//   },
// })

// const prisma = new PrismaClient({ adapter })

// module.exports = prisma

// import { PrismaClient } from "@prisma/client";
// import { PrismaMssql } from "@prisma/adapter-mssql";

// const adapter = new PrismaMssql({
//   server: "localhost",
//   port: 1433,
//   database: "UrlShortenerDB",
//   authentication: {
//     type: "default",
//     options: {
//       userName: "testUser",
//       password: "StrongPassword123!"
//     }
//   },
//   options: {
//     trustServerCertificate: true
//   }
// });

// const prismaInstance = new PrismaClient({ adapter });

// export default prismaInstance;


import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaMssql({
  server: "localhost",
  port: 1433,
  database: "UrlShortenerDB",
  authentication: {
    type: "default",
    options: {
      userName: "anotherUser",         // your SQL Server username
      password: "Password123" // your SQL Server password
    }
  },
  options: {
    trustServerCertificate: true,
  },
})

// const adapter = new PrismaMssql(conn);
export const prismaInstance = new PrismaClient({ adapter });