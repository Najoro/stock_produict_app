// services/databaseService.js
import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';


export const initDB = async(dataBase) => {
  try {
      await dataBase.execAsync(`
        CREATE TABLE IF NOT EXISTS products(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          stock INTEGER NOT NULL,
          description TEXT,
          image TEXT
        )
      `);
      console.log("insertion du donne terminer",);
      
  } catch (error) {
    console.log("error lors de l'initialisation du db", error);
    
  }
};

export const insertProduct = async(name, stock, description, image) => {
  const db = SQLite.openDatabaseAsync('products.db');

  try {
    await db.runAsync(`
      INSERT INTO 
      products (name, stock, description, image) 
      VALUES (?, ?, ?, ?);`
      ,name,`${stock}`, description, image || "");

    console.log("insertion terminer avec succes");
    
  } catch (error) {
    console.log("erreur lors de l'insertion des donne dans la bd :", error);
    
  }
};

export const getProductInDataBase = async() => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM products');
    for (const row of allRows) {
      console.log(row.id, row.value, row.intValue);
    }
  } catch (error) {
    console.log("erreur lors de la recuperation de tous les data");
    
  }
}

