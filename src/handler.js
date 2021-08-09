const {
    nanoid
} = require("nanoid");
const {
    findIndex
} = require("./routes.js");
const allBooks = require("./books.js");


const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if (readPage === pageCount) {
        finished = true;
    } else if (readPage < pageCount) {
        finished = false;
    } else {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }

    if (name === undefined) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };


    allBooks.push(newBook);

    const checkBook = allBooks.filter((book) => book.id === id).length > 0;

    if (checkBook) {
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return response;
};


const getAllBooksHandler = (request, h) => {

    const {
        name,
        reading,
        finished
    } = request.query;

    let booksFiltered = allBooks;

    if (name !== undefined) {
        booksFiltered = allBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (reading !== undefined) {
        booksFiltered = booksFiltered.filter((book) => Number(book.reading) === Number(reading));
    }

    if (finished !== undefined) {
        booksFiltered = booksFiltered.filter((book) => Number(book.finished) === Number(finished));
    }

    if (name == undefined && reading == undefined && finished == undefined) {
        const response = h.response({
            status: 'success',
            data: {
                books: booksFiltered.map(book => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                }))
            }
        });
        response.code(200);
        return response;
    }

    if (name !== undefined || reading !== undefined || finished !== undefined) {
        if (booksFiltered.length > 0) {
            const response = h.response({
                status: 'success',
                data: {
                    books: booksFiltered.map(book => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    }))
                }
            });
            response.code(200);
            return response;
        }
    }

    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;

}


const getBookByIdHandler = (request, h) => {
    const {
        id
    } = request.params;

    const book = allBooks.filter(book => book.id === id)[0];

    if (book !== undefined) {
        return {
            status: "success",
            data: {
                book,
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;

}

const editBookByIdHandler = (request, h) => {
    const {
        id
    } = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if (readPage === pageCount) {
        finished = true;
    } else if (readPage < pageCount) {
        finished = false;
    } else {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }

    if (name === undefined) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    }

    const updatedAt = new Date().toISOString();

    const index = allBooks.findIndex(book => book.id === id);

    if (index !== -1) {
        allBooks[index] = {
            ...allBooks[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
}


const deleteBookByIdHandler = (request, h) => {
    const {
        id
    } = request.params;

    const index = allBooks.findIndex((book) => book.id === id);

    if (index !== -1) {
        allBooks.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;

}

const errorPageHandler = (request, h) => {
    const response = h.response({
        status: "fail",
        message: "Halaman tidak ditemukan."
    });
    response.code(404);
    return response;
}

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    deleteBookByIdHandler,
    editBookByIdHandler,
    errorPageHandler,
};