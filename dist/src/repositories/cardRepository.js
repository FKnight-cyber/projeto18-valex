"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.unblockCard = exports.blockCard = exports.update = exports.insert = exports.findByCardDetails = exports.findByEmployeeId = exports.findByTypeAndEmployeeId = exports.findById = exports.find = void 0;
const database_1 = require("../../database");
async function find() {
    const result = await database_1.connection.query("SELECT * FROM cards");
    return result.rows;
}
exports.find = find;
async function findById(id) {
    const result = await database_1.connection.query("SELECT * FROM cards WHERE id=$1", [id]);
    return result.rows[0];
}
exports.findById = findById;
async function findByTypeAndEmployeeId(type, employeeId) {
    const result = await database_1.connection.query(`SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2`, [type, employeeId]);
    return result.rows[0];
}
exports.findByTypeAndEmployeeId = findByTypeAndEmployeeId;
async function findByEmployeeId(employeeId) {
    const result = await database_1.connection.query(`SELECT number,"cardholderName","expirationDate","securityCode",password FROM cards 
    WHERE "employeeId" = $1 AND "isBlocked" is false `, [employeeId]);
    return result;
}
exports.findByEmployeeId = findByEmployeeId;
async function findByCardDetails(number, cardholderName, expirationDate) {
    const result = await database_1.connection.query(` SELECT 
        * 
      FROM cards 
      WHERE number=$1 AND "cardholderName"=$2 AND "expirationDate"=$3`, [number, cardholderName, expirationDate]);
    return result.rows[0];
}
exports.findByCardDetails = findByCardDetails;
async function insert(cardData) {
    const { employeeId, number, cardholderName, securityCode, expirationDate, password, isVirtual, originalCardId, isBlocked, type, } = cardData;
    database_1.connection.query(`
    INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
      "expirationDate", password, "isVirtual","originalCardId", "isBlocked", type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `, [
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password,
        isVirtual,
        originalCardId,
        isBlocked,
        type,
    ]);
}
exports.insert = insert;
async function update(id, password) {
    database_1.connection.query(`
    UPDATE cards
      SET password = $2, "isBlocked" = false
    WHERE $1=id
  `, [id, password]);
}
exports.update = update;
async function blockCard(id) {
    database_1.connection.query(`
    UPDATE cards
      SET "isBlocked" = true
    WHERE $1=id
  `, [id]);
}
exports.blockCard = blockCard;
async function unblockCard(id) {
    database_1.connection.query(`
    UPDATE cards
      SET "isBlocked" = false
    WHERE $1=id
  `, [id]);
}
exports.unblockCard = unblockCard;
async function remove(id) {
    database_1.connection.query("DELETE FROM cards WHERE id=$1", [id]);
}
exports.remove = remove;
