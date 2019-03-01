import { TheDb } from './thedb';

/**
 * Simple class for selecting, inserting, updating and deleting Heroes in customer table.
 *
 * @export
 * @class Customer
 */
export class Customer {
    public NO = -1;
    public Party = '';
    public Address = '';
    public GSTNo = '';
    public City = '';
    public State = '';

    public static get(id: number): Promise<Customer> {
        const sql = 'SELECT * FROM customer WHERE NO = $NO';
        const values = { $NO: id };

        return TheDb.selectOne(sql, values)
            .then((row) => {
                if (row) {
                    return new Customer().fromRow(row);
                } else {
                    throw new Error('Expected to find 1 Customer. Found 0.');
                }
            });
    }

    public static getAll(): Promise<Customer[]> {
        const sql = `SELECT * FROM customer ORDER BY Party`;
        const values = {};

        return TheDb.selectAll(sql, values)
            .then((rows) => {
                const customers: Customer[] = [];
                for (const row of rows) {
                    const customer = new Customer().fromRow(row);
                    customers.push(customer);
                }
                return customers;
            });
    }

    public static insert(NO: number, Party : string, Address: string, GSTNo: string, City: string, State: string): Promise<number> {
        const sql = `INSERT INTO customer (NO, Party, Address, GSTNo, City, State)
            VALUES($NO, $Party, $Address, $GSTNo, $City, $State)`;

        const values = {
            $NO: NO,
            $Party : Party,
            $Address : Address,
            $GSTNo: GSTNo,
            $City : City,
            $State : State
        };

        return TheDb.insert(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 Customer to be inserted. Was ${result.changes}`);
                } else {
                    return 1
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

    public delete( NO : number): Promise<void> {
        const sql = `
            DELETE FROM customer WHERE NO = $NO`;

        const values = {
            $NO: NO,
        };

        return TheDb.delete(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 Customer to be deleted. Was ${result.changes}`);
                }
            });
    }

    public fromRow(row: Object): Customer {
        this.State = row['State'];
        this.City = row['City'];
        this.NO = row['NO'];
        this.Party = row['Party'];
        this.Address = row['Address'];
        this.GSTNo = row['GSTNo'];

        return this;
    }
}
