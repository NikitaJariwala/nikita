"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const thedb_1 = require("./thedb");
/**
 * Simple class for selecting, inserting, updating and deleting Heroes in customer table.
 *
 * @export
 * @class Customer
 */
class Customer {
    constructor() {
        this.NO = -1;
        this.Party = '';
        this.Address = '';
        this.GSTNo = '';
        this.City = '';
        this.State = '';
    }
    static get(id) {
        const sql = 'SELECT * FROM customer WHERE NO = $NO';
        const values = { $NO: id };
        return thedb_1.TheDb.selectOne(sql, values)
            .then((row) => {
            if (row) {
                return new Customer().fromRow(row);
            }
            else {
                throw new Error('Expected to find 1 Customer. Found 0.');
            }
        });
    }
    static getAll() {
        const sql = `SELECT * FROM customer ORDER BY Party`;
        const values = {};
        return thedb_1.TheDb.selectAll(sql, values)
            .then((rows) => {
            const customers = [];
            for (const row of rows) {
                const customer = new Customer().fromRow(row);
                customers.push(customer);
            }
            return customers;
        });
    }
    static insert(NO, Party, Address, GSTNo, City, State) {
        const sql = `INSERT INTO customer (NO, Party, Address, GSTNo, City, State)
            VALUES($NO, $Party, $Address, $GSTNo, $City, $State)`;
        const values = {
            $NO: NO,
            $Party: Party,
            $Address: Address,
            $GSTNo: GSTNo,
            $City: City,
            $State: State
        };
        return thedb_1.TheDb.insert(sql, values)
            .then((result) => {
            if (result.changes !== 1) {
                throw new Error(`Expected 1 Customer to be inserted. Was ${result.changes}`);
            }
            else {
                return 1;
            }
        });
    }
    // public update(name: string): Promise<void> {
    //     const sql = `
    //         UPDATE customer
    //            SET name = $name
    //          WHERE id = $id`;
    //
    //     const values = {
    //         $Party: name,
    //     };
    //
    //     return TheDb.update(sql, values)
    //         .then((result) => {
    //             if (result.changes !== 1) {
    //                 throw new Error(`Expected 1 Customer to be updated. Was ${result.changes}`);
    //             }
    //         });
    // }
    delete(NO) {
        const sql = `
            DELETE FROM customer WHERE NO = $NO`;
        const values = {
            $NO: NO,
        };
        return thedb_1.TheDb.delete(sql, values)
            .then((result) => {
            if (result.changes !== 1) {
                throw new Error(`Expected 1 Customer to be deleted. Was ${result.changes}`);
            }
        });
    }
    fromRow(row) {
        this.State = row['State'];
        this.City = row['City'];
        this.NO = row['NO'];
        this.Party = row['Party'];
        this.Address = row['Address'];
        this.GSTNo = row['GSTNo'];
        return this;
    }
}
exports.Customer = Customer;
//# sourceMappingURL=customer.js.map