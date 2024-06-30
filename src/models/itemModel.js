const pool = require("../services/db");

module.exports.createMagicItem = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Item(name,description,rarity,type,attributes,effects)
        VALUES (?,?,?,?,?,?);
        `;
    const VALUES = [data.name, data.description, data.rarity, data.type, JSON.stringify(data.attributes), JSON.stringify(data.effects)];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.readAllMagicItems = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Item;
        `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.readMagicItemById = (Item_id, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Item
        WHERE item_id = ?;
        `;
    const VALUES = [Item_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateMagicItemById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE Item
        SET name = ?, description = ?, rarity = ?, type = ?, attributes = ?, effects = ?
        WHERE item_id = ?;
        `;
    const VALUES = [data.name, data.description, data.rarity, data.type, JSON.stringify(data.attributes), JSON.stringify(data.effects),data.magic_item_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteMagicItemById = (Item_id, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM Item
        WHERE item_id = ?;
        ALTER TABLE Item AUTO_INCREMENT = 1;
        `;
    const VALUES = [Item_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

