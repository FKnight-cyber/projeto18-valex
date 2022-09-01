import { connection } from "../../database";

export interface Recharge {
  id: number;
  cardId: number;
  timestamp: Date;
  amount: number;
}
export type RechargeInsertData = Omit<Recharge, "id" | "timestamp">;

export async function findByCardId(cardId: number) {
  const result = await connection.query<Recharge, [number]>(
    `SELECT r.id, r."cardId", timestamp, amount FROM recharges r
    JOIN cards ON cards.id = $1
     WHERE "cardId"=$1 AND cards."isBlocked" = false`,
    [cardId]
  );

  return result.rows;
}

export async function insert(id:number,amount:number) {
  connection.query<any, [number, number]>(
    `INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`,
    [id, amount]
  );
}
