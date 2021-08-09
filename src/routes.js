const {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    deleteBookByIdHandler,
    editBookByIdHandler,
    errorPageHandler,
} = require("./handler.js");

const handler = require("./handler.js");

const routes = [{
        method: "POST",
        path: "/books",
        handler: addBookHandler
    },
    {
        method: "GET",
        path: "/books",
        handler: getAllBooksHandler
    },
    {
        method: "GET",
        path: "/books/{id}",
        handler: getBookByIdHandler
    },
    {
        method: "PUT",
        path: "/books/{id}",
        handler: editBookByIdHandler
    },
    {
        method: "DELETE",
        path: "/books/{id}",
        handler: deleteBookByIdHandler
    },
    {
        method: "*",
        path: "/{any*}",
        handler: errorPageHandler
    },

];

module.exports = routes;