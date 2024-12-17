class CustomNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        // So the error is neat when stringified. NotFoundError: message instead of Error: message
        this.name = "NotFoundError";
    }
}

class CustomDbError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 502;
        // So the error is neat when stringified. NotFoundError: message instead of Error: message
        this.name = "DbError";
    }
}

module.exports = { CustomNotFoundError, CustomDbError };
