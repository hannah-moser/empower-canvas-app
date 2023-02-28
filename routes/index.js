const express = require("express");
const PORT = 3001;
const app = express();
const bodyParser  = require('body-parser');

const canvasController = require("../controllers/canvasController");
const router = express.Router();

// Used to injest form input from the front end as json
app.use(bodyParser.json());

// test the api connection before building out endpoints
app.get("/api", (request, response) => {
    response.json({ data: "Hello from server!" });
});

app.use('/canvas', router)
router.get('', canvasController.getCanvasNotes)
router.post('', canvasController.createCanvasNote)

app.listen(PORT, () => {
    console.log(`Woop woop server up on ${PORT}`);
});