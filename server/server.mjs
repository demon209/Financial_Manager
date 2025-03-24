import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {resolvers} from "./resolvers/index.js"
import {typeDefs} from "./schemas/index.js"
dotenv.config();

const app = express();

const httpServer = http.createServer(app);



// connect to db
const URI = `mongodb+srv://vuquan150904:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.jbqfx.mongodb.net/myDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
try {
  await server.start();
  console.log("Apollo Server started successfully");
} catch (error) {
  console.error("Error starting Apollo Server:", error);
}

app.use(cors(), bodyParser.json(), expressMiddleware(server));

mongoose.connect(URI)
  .then(async () => console.log("✅ Connected to Database"))
  .catch(err => console.error("❌ Database connection error:", err));

console.log("Before starting HTTP server");
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log("Server ready at http://localhost:4000");
