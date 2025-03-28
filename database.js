import * as SQLite from 'expo-sqlite';

//initialize the database connection
let db = null;

//nitialize the database
export const initDatabase = async () => {
  try {
    if (!db) {
      db = await SQLite.openDatabaseAsync('events_db');
      console.log('Database initialized successfully');
    }
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

//events table
export const createTable = async () => {
  try {
    const database = await initDatabase();
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        event_title TEXT NOT NULL, 
        event_description TEXT NOT NULL, 
        event_date TEXT NOT NULL, 
        organizer_name TEXT NOT NULL, 
        organizer_email TEXT NOT NULL, 
        organizer_phone TEXT NOT NULL
      );
    `);
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
    throw error;
  }
};

//insert event
export const insertEvent = async (eventData) => {
  try {
    const database = await initDatabase();
    const result = await database.runAsync(
      `INSERT INTO events (event_title, event_description, event_date, organizer_name, organizer_email, organizer_phone)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [
        eventData.event_title,
        eventData.event_description,
        eventData.event_date,
        eventData.organizer_name,
        eventData.organizer_email,
        eventData.organizer_phone
      ]
    );
    console.log('Event inserted with ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting event:', error);
    throw error;
  }
};

//Fetch events from the database
export const getEvents = async () => {
  try {
    const database = await initDatabase();
    const result = await database.getAllAsync(`SELECT * FROM events;`);
    return result;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

//Get a product by ID for details screen 
export const getProductById = async (id) => {
  try {
    const database = await initDatabase();
    const event = await database.getFirstAsync('SELECT * FROM products WHERE id = ?;', [id]);
    if (event) {
      return event; 
    }
    
  } catch (error) {
    console.error(`Error getting product with ID ${id}:`, error);
    return null;
  }
};