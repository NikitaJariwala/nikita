"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const sqlite3_1 = require("sqlite3");
const settings_1 = require("./settings");
/**
 * TheDb is a Promise-ified wrapper around bare sqlite3 API.
 *
 * @export
 * @class TheDb
 */
class TheDb {
    static selectOne(sql, values) {
        return new Promise((resolve, reject) => {
            TheDb.db.get(sql, values, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }
    static selectAll(sql, values) {
        return new Promise((resolve, reject) => {
            TheDb.db.all(sql, values, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    static insert(sql, values) {
        return TheDb.change(sql, values);
    }
    static update(sql, values) {
        return TheDb.change(sql, values);
    }
    static delete(sql, values) {
        return TheDb.change(sql, values);
    }
    static query(sql) {
        return new Promise((resolve, reject) => {
            TheDb.db.run(sql, {}, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    static beginTxn() {
        return new Promise((resolve, reject) => {
            TheDb.db.run('BEGIN', (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    static commitTxn() {
        return new Promise((resolve, reject) => {
            TheDb.db.run('COMMIT', (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    static rollbackTxn(reason) {
        return new Promise((_resolve, reject) => {
            console.log('Rollback transaction');
            TheDb.db.run('ROLLBACK', (err) => {
                if (err) {
                    console.log(err);
                    reject(new Error('Unforeseen error occurred. Please restart the application'));
                }
                else {
                    reject(reason);
                }
            });
        });
    }
    static importJson(filename, disableForeignKeys) {
        const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const tableNames = Object.keys(data.tables);
        const deletes = [];
        const inserts = [];
        let foreignKeys;
        return TheDb.getPragmaForeignKeys()
            .then((value) => {
            foreignKeys = value;
            if (foreignKeys === !disableForeignKeys) {
                return Promise.resolve();
            }
            else {
                return TheDb.setPragmaForeignKeys(!disableForeignKeys);
            }
        })
            .then(TheDb.beginTxn)
            .then(() => {
            for (const table of tableNames) {
                deletes.push(TheDb.delete(`DELETE FROM ${table}`, {}));
            }
            return Promise.all(deletes);
        })
            .then(() => {
            for (const tableName of tableNames) {
                if (data.tables[tableName].length === 0) {
                    continue;
                }
                const columnNames = Object.keys(data.tables[tableName][0]);
                for (const row of data.tables[tableName]) {
                    let sql = `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES\n`;
                    const values = [];
                    for (const name of columnNames) {
                        values.push(row[name]);
                    }
                    sql += `(${Array(columnNames.length + 1).join('?, ').slice(0, -2)})`;
                    inserts.push(TheDb.insert(sql, values));
                }
            }
            return Promise.all(inserts);
        })
            .then(TheDb.commitTxn)
            .catch(TheDb.rollbackTxn)
            .then(() => {
            if (foreignKeys === !disableForeignKeys) {
                return Promise.resolve();
            }
            else {
                return TheDb.setPragmaForeignKeys(foreignKeys);
            }
        });
    }
    static exportJson(filename) {
        const data = {
            version: TheDb.version,
            tables: {},
        };
        return TheDb.selectAll(`SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name`, {})
            .then((rows) => {
            const selects = [];
            for (const row of rows) {
                selects.push(TheDb.selectAll(`SELECT * FROM ${row['name']}`, {})
                    .then((results) => {
                    return data.tables[row['name']] = results;
                }));
            }
            return Promise.all(selects);
        })
            .then(() => {
            fs.writeFileSync(filename, JSON.stringify(data, undefined, 4));
        });
    }
    static resetDbKarma() {
        const fromJson = path.join(settings_1.Settings.dbFolder, `karma-database.init.json`);
        return TheDb.importJson(fromJson, true);
    }
    static createDb(dbPath) {
        dbPath += path.extname(dbPath) === '.db' ? '' : '.db';
        console.log('Creating  databae: ', dbPath);
        const dataPath = path.join(settings_1.Settings.dbFolder, `database.init.json`);
        const schemaPath = path.join(settings_1.Settings.dbFolder, `database.db.sql`);
        const schema = fs.readFileSync(schemaPath, { encoding: 'utf8' });
        // Create data directory in userdata folder
        if (!fs.existsSync(path.join(dbPath, '..'))) {
            fs.mkdirSync(path.join(dbPath, '..'));
        }
        return TheDb.getDb(dbPath)
            .then(() => TheDb.exec(schema))
            .then(() => TheDb.setPragmaForeignKeys(true))
            .then(() => TheDb.importJson(dataPath, false))
            .then(TheDb.setPragmaVersion)
            .then(() => {
            console.log('Database created.');
            return dbPath;
        });
    }
    static openDb(dbPath) {
        console.log('Opening database: ', dbPath);
        return TheDb.getDb(dbPath)
            .then(() => TheDb.setPragmaForeignKeys(true))
            .then(TheDb.upgradeDb)
            .then(() => {
            console.log('Database opened');
            return Promise.resolve();
        });
    }
    static closeDb() {
        if (!TheDb.db) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            TheDb.db.close((err) => {
                console.log('Closing current Db');
                if (err) {
                    reject(err);
                    console.log('Db not closed');
                }
                else {
                    resolve();
                }
            });
        });
    }
    static getDb(dbPath) {
        return TheDb.closeDb()
            .then(() => {
            return new Promise((resolve, reject) => {
                const db = new sqlite3_1.Database(dbPath, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        TheDb.db = db;
                        resolve();
                    }
                });
            });
        });
    }
    static upgradeDb() {
        return TheDb.getPragmaVersion()
            .then((version) => {
            if (version === TheDb.version) {
                return Promise.resolve();
            }
            else if (version > TheDb.version) {
                throw new Error(`Cannot downgrade database from version ${version} to ${TheDb.version}.`);
            }
            else {
                return new Promise((resolve, reject) => {
                    switch (version) {
                        case 0:
                            // Upgrade schema if needed
                            // Upgrade data if needed
                            break;
                        default:
                            reject(new Error(`No upgrade defined for database version ${version}`));
                    }
                    resolve();
                });
            }
        })
            .then(TheDb.setPragmaVersion);
    }
    static change(sql, values) {
        return new Promise((resolve, reject) => {
            TheDb.db.run(sql, values, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ changes: this.changes, lastID: this.lastID });
                }
            });
        });
    }
    static exec(sql) {
        return new Promise((resolve, reject) => {
            TheDb.db.exec(sql, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    static getPragmaForeignKeys() {
        return new Promise((resolve, reject) => {
            TheDb.db.get('PRAGMA foreign_keys', (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(Boolean(row['foreign_keys']));
                }
            });
        });
    }
    static setPragmaForeignKeys(value) {
        return new Promise((resolve, reject) => {
            TheDb.db.run(`PRAGMA foreign_keys = ${value}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(`PRAGMA foreign_keys = ${value}`);
                    resolve();
                }
            });
        });
    }
    static getPragmaVersion() {
        return new Promise((resolve, reject) => {
            TheDb.db.get('PRAGMA user_version', (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(Number(row['user_version']));
                }
            });
        });
    }
    static setPragmaVersion() {
        return new Promise((resolve, reject) => {
            TheDb.db.run(`PRAGMA user_version = ${TheDb.version}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(`PRAGMA version = ${TheDb.version}`);
                    resolve();
                }
            });
        });
    }
}
TheDb.version = 1;
exports.TheDb = TheDb;
//# sourceMappingURL=thedb.js.map