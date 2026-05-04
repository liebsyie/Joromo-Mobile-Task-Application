import * as SQLite from 'expo-sqlite';

export type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
};

const db = SQLite.openDatabaseSync("tasks.db");

export function initDatabase() {
    try {
        db.execSync(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                status TEXT NOT NULL
            );
        `);
    } catch (error) {
        console.error("There was a problem initializing the database", error);
        throw error;
    }
}

export function addTask(title: string, description: string, status: string) {
    try {
        db.runSync(
            "INSERT INTO tasks (title, description, status) VALUES (?,?,?)",
            [title, description, status]
        );
    } catch (error) {
        console.error("Error Adding tasks", error);
        throw error;
    }
}

export function updateTask(id: number, title: string, description: string, status: string) {
    try {
        db.runSync(
            "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
            [title, description, status, id]
        );
        console.log(`Task ${id} updated successfully`);
    } catch (error) {
        console.error("Error Updating task", error);
        throw error;
    }
}

export function deleteTask(id: number) {
    try {
        db.runSync(
            "DELETE FROM tasks WHERE id = ?",
            [id]
        );
    } catch (error) {
        console.error("Error Deleting tasks", error);
        throw error;
    }
}

export function getTask(): Task[] {
    try {
        return db.getAllSync(
            "SELECT * FROM tasks ORDER BY id DESC"
        );
    } catch (error) {
        console.error("Error Fetching tasks", error);
        throw error;
    }
}

export function getTaskById(id: number): Task | null {
    try {
        return db.getFirstSync<Task>(
            "SELECT * FROM tasks WHERE id = ?",
            [id]
        );
    } catch (error) {
        console.error("Error Fetching task by id", error);
        throw error;
    }
}