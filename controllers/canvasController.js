const conn = require("../services/db")

// Return all canvas notes
exports.getCanvasNotes = (request, response, next) => {
    conn.query("SELECT * FROM canvas", function(error, data) {
        if(error) {
            return next(error);
        }

        response.status(200).json({
            data: data,
        });
    });
};

// Create a new canvas note in the databse
exports.createCanvasNote = (request, response, next) => {
    console.log(request.params)
    if (!request.body) {
        return next("Cannot create canvas note without input");
    }

    const values = [request.body.name, request.body.notes];

    conn.query(
        "INSERT INTO canvas (name, notes) VALUES(?)",
        [values],
        function(error, data, fields) {
            if (error) {
                return next(error);
            }

            return response.status(201).json({
                status: 201,
                message: "new canvas note created",
            });
        }
    );
};