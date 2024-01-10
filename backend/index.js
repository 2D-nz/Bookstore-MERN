import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import cors from "cors";
import booksRoute from "./routes/booksRoute.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// app.use(
// 	cors({
// 		origin: "http://localhost:5173",
// 		methods: ["GET", "POST", "PUT", "DELETE"],
// 		allowedHeaders: ["Content-Type"],
// 	})
// );
app.use(cors());
app.use("/books", booksRoute);
app.get("/", (request, response) => {
	console.log(request);
	return response.status(234).send("ATAPO");
});

mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log("App is connected to database");
		app.listen(PORT, () => {
			console.log("App is listening to port: ", { PORT });
		});
	})
	.catch((error) => {
		console.log(error);
	});
