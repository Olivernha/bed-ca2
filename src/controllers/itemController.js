const model = require("../models/itemModel.js");

module.exports.createNewMagicItem = (req, res, next) => {

    const {name, description, rarity, type, attributes, effects} = req.body;

    if (!name || !description || !rarity || !type || !attributes || !effects) {
        res.sendStatus(400);
        return;
    }
    const data = {name, description, rarity, type, attributes, effects}; // ES6 shorthand syntax

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewMagicItem:", error);
            res.status(500).json(error);
        } else {
            req.params.magic_item_id = results.insertId;
            next();
        }
    };
    model.createMagicItem(data, callback);

}

module.exports.readAllMagicItems = (req, res) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAllMagicItems:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };
    model.readAllMagicItems(callback);
}

module.exports.readMagicItemById= (req, res) => {
    const {magic_item_id} = req.params;

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getMagicItemById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results[0]);
        }
    };
    model.readMagicItemById(magic_item_id, callback);
}

module.exports.updateMagicItemById = (req, res,next) => {
    const {magic_item_id} = req.params;
    const {name, description, rarity, type, attributes, effects} = req.body;
    if (!name || !description || !rarity || !type || !attributes || !effects) {
        res.sendStatus(400);
        return;
    }
    const data = {name, description, rarity, type, attributes, effects , magic_item_id};

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateMagicItemById:", error);
            res.status(500).json(error);
        } else {

            if(results.affectedRows == 0) {
                res.sendStatus(404);
            } else {
                req.params.magic_item_id = data.magic_item_id;
                next();
            }
        }
    };
    model.updateMagicItemById(data, callback);
}

module.exports.deleteMagicItemById = (req, res) => {
    const {magic_item_id} = req.params;
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMagicItemById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };
    model.deleteMagicItemById(magic_item_id, callback);
}


