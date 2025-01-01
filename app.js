const express = require("express");
const app = express();
const messageRouter = require("./routes/messageRouter");
const { CustomNotFoundError } = require('./errors/CustomErrors');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", messageRouter);

// default error handler if page not found in router
app.use((req, res, next) => {
    throw new CustomNotFoundError('Error 404, missing page')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:3000`);
});

// Every thrown error in the application or the previous middleware function calling `next` with an error as an argument will eventually go to this middleware function
app.use((err, req, res, next) => {
    console.error(err);
    // We can now specify the `err.statusCode` that exists in our custom error class and if it does not exist it's probably an internal server error
    // res.status(err.statusCode || 500).send(err.message);
    res.status(err.statusCode || 500).render("pages/404", {
        title: "Error",
        statusCode: err.statusCode,
        message: err.message
    });
});