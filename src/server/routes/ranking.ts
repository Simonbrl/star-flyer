import express from 'express';
import Ranking from '../models/ranking';
const router: express.Router = express.Router();

router.get('/', (req, res) => {
    Ranking.find()
        .then((ranking) => {
            if(!ranking) return res.status(404).send("No players found");
            res.status(200).send(ranking);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Internal server error");
        })
});

router.get('/:limit', (req, res) => {
    const limit = parseInt(req.params.limit);
    if(!limit) return res.status(400).send("No limit provided");
    Ranking.find().sort({ score: -1 }).limit(limit)
        .then((ranking) => {
            if(!ranking) return res.status(404).send("No ranking found");
            res.status(200).send(ranking);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Internal server error");
        })
});

router.post('/', (req, res) => {
    const { username, key, score } = req.body;
    if(!username) return res.status(400).send("No name provided");
    if(!key) return res.status(400).send("No key provided");
    const ranking = { username, key, score };
    Ranking.create(ranking)
        .then((ranking) => ranking ? res.status(201).send() : res.status(500).send("Internal server error"))
        .catch((err) => {
            console.error(err);
            res.status(500).send("Internal server error");
        });
});

module.exports = router;