"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = exports.findByCardId = void 0;
const database_1 = require("../../database");
async function findByCardId(cardId) {
    const result = await database_1.connection.query(`SELECT 
      payments.*,
      businesses.name as "businessName"
     FROM payments 
      JOIN businesses ON businesses.id=payments."businessId"
      JOIN cards ON cards.id = $1
     WHERE "cardId"=$1 AND cards."isBlocked" = false
    `, [cardId]);
    return result.rows;
}
exports.findByCardId = findByCardId;
async function insert(cardId, businessId, amount) {
    database_1.connection.query(`INSERT INTO payments ("cardId", "businessId", amount) VALUES ($1, $2, $3)`, [cardId, businessId, amount]);
}
exports.insert = insert;
