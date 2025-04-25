// services/databaseService.js
import * as SQLite from 'expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';


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
      await dataBase.runAsync(`ALTER TABLE products ADD COLUMN amount TEXT;`);

      console.log("insertion du donne terminer",);
  } catch (error) {
    console.log("error lors de l'initialisation du db", error);
    
  }
};


export const getAllProducts = async ({dataBase}) => {
  try {
    const products = await dataBase.getAllAsync("SELECT * FROM products");
    return products;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
};

