import express from "express";

import { Book } from "../models/bookModel.js";

const router = express.Router();
// route for creating books
router.post("/", async (request, response) => {
	try {
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({
				message: "Send all required fields: title, author, publish year",
			});
		}
		const newBook = {
			title: request.body.title,
			author: request.body.author,
			publishYear: request.body.publishYear,
		};

		const book = await Book.create(newBook);
		return response.status(201).send(book);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});
// route for get all books from database
router.get("/", async (request, response) => {
	try {
		const books = await Book.find({});
		response.status(200).json({
			count: books.length,
			data: books,
		});
	} catch (error) {
		console.log(error);
	}
});

//route for getting one book
router.get("/:id", async (request, response) => {
	try {
		const { id } = request.params;

		const book = await Book.findById(id);
		response.status(200).json(book);
	} catch (error) {
		console.log(error);
	}
});

//updating the book

router.put("/:id", async (request, response) => {
	try {
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({
				message: "Send all required fields: title, author, publish year",
			});
		}
		const { id } = request.params;

		const result = await Book.findByIdAndUpdate(id, request.body);

		if (!result) {
			return response.status(404).json({ message: "Book not found" });
		}

		return response.status(200).send("Done!");
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});
//deletar um livro
router.delete("/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const result = await Book.findByIdAndDelete(id);

		if (!result) {
			return response.status(404).json({ message: error.message });
		}

		return response.status(200).send({ message: "Book deleted" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

export default router;
