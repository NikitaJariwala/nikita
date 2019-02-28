"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const thedb_1 = require("./thedb");
/**
 * Simple class for selecting, inserting, updating and deleting Heroes in hero table.
 *
 * @export
 * @class Hero
 */
class Hero {
    constructor() {
        this.id = -1;
        this.name = '';
    }
    static get(id) {
        const sql = 'SELECT * FROM hero WHERE id = $id';
        const values = { $id: id };
        return thedb_1.TheDb.selectOne(sql, values)
            .then((row) => {
            if (row) {
                return new Hero().fromRow(row);
            }
            else {
                throw new Error('Expected to find 1 Hero. Found 0.');
            }
        });
    }
    static getAll() {
        const sql = `SELECT * FROM hero ORDER BY name`;
        const values = {};
        return thedb_1.TheDb.selectAll(sql, values)
            .then((rows) => {
            const heroes = [];
            for (const row of rows) {
                const hero = new Hero().fromRow(row);
                heroes.push(hero);
            }
            return heroes;
        });
    }
    insert() {
        const sql = `
            INSERT INTO hero (name)
            VALUES($name)`;
        const values = {
            $name: this.name,
        };
        return thedb_1.TheDb.insert(sql, values)
            .then((result) => {
            if (result.changes !== 1) {
                throw new Error(`Expected 1 Hero to be inserted. Was ${result.changes}`);
            }
            else {
                this.id = result.lastID;
            }
        });
    }
    update() {
        const sql = `
            UPDATE hero
               SET name = $name
             WHERE id = $id`;
        const values = {
            $name: this.name,
        };
        return thedb_1.TheDb.update(sql, values)
            .then((result) => {
            if (result.changes !== 1) {
                throw new Error(`Expected 1 Hero to be updated. Was ${result.changes}`);
            }
        });
    }
    delete() {
        const sql = `
            DELETE FROM hero WHERE id = $id`;
        const values = {
            $id: this.id,
        };
        return thedb_1.TheDb.delete(sql, values)
            .then((result) => {
            if (result.changes !== 1) {
                throw new Error(`Expected 1 Hero to be deleted. Was ${result.changes}`);
            }
        });
    }
    fromRow(row) {
        this.id = row['id'];
        this.name = row['name'];
        return this;
    }
}
exports.Hero = Hero;
//# sourceMappingURL=hero.js.map