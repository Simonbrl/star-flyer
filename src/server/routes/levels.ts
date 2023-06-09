import express from 'express';
import Level from '../models/level';
const router: express.Router = express.Router();

router.get('/', (req, res) => {
    Level.find()
        .then((levels) => {
            if(!levels) return res.status(404).send("No levels found");
            res.status(200).send(levels);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Internal server error");
        })
});

router.get('/:level', (req, res) => {
    const level: string = req.params.level;
    if(!level) return res.status(400).send("No level provided");
    Level.findOne({ level: level })
        .then((level) => {
            if(!level) return res.status(404).send("Level not found");
            res.status(200).send(level);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Internal server error");
        })
});

module.exports = router;