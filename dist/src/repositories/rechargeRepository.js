"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = exports.findByCardId = void 0;
const database_1 = require("../../database");
async function findByCardId(cardId) {
    const result = await database_1.connection.query(`SELECT r.id, r."cardId", timestamp, amount FROM recharges r
    JOIN cards ON cards.id = $1
     WHERE "cardId"=$1 AND cards."isBlocked" = false`, [cardId]);
    return result.rows;
}
exports.findByCardId = findByCardId;
async function insert(id, amount) {
    database_1.connection.query(`INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`, [id, amount]);
}
exports.insert = insert;
