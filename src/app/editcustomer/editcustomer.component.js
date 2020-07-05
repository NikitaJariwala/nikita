"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const fs = require("fs");
const settings_1 = require("../model/settings");
const thedb_1 = require("../model/thedb");
const { remote } = require('electron');
const forms_1 = require("@angular/forms");
const customer_1 = require("../model/customer");
const router_1 = require("@angular/router");
let EditcustomerComponent = class EditcustomerComponent {
    constructor(route, router) {
        this.route = route;
        this.router = router;
        settings_1.Settings.initialize();
        if (fs.existsSync(settings_1.Settings.dbPath)) {
            this.openDb(settings_1.Settings.dbPath);
        }
        else if (settings_1.Settings.hasFixedDbLocation) {
            this.createDb(settings_1.Settings.dbPath);
        }
        else {
            this.createDb();
        }
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.No = params['id'];
        });
        console.log(this.No);
        this.editform = new forms_1.FormGroup({
            NO: new forms_1.FormControl(this.No, forms_1.Validators.required),
            Party: new forms_1.FormControl("swfwefe", forms_1.Validators.required),
            Address: new forms_1.FormControl("", forms_1.Validators.required),
            City: new forms_1.FormControl(""),
            State: new forms_1.FormControl("", forms_1.Validators.required),
            GSTNo: new forms_1.FormControl("", forms_1.Validators.required)
        });
    }
    onSubmit() {
        customer_1.Customer.update(+(this.editform.get('NO').value), this.editform.get('Party').value, this.editform.get('Address').value, this.editform.get('GSTNo').value, this.editform.get('City').value, this.editform.get('State').value)
            .then((customer) => {
            console.log("customer===", customer);
            this.router.navigate(['home']);
            //this.heroes = heroes;
        });
    }
    onEdit() {
    }
    //onEdit(customer: any) {
    // this.dialogService.confirm('rthth', 'hjhj', <BuiltInOptions>{
    // }).then((result: boolean) => {
    //      console.log("customer====",customer)
    //     console.log("result====",result)
    //     // result
    // });
    // }
    openDb(filename) {
        thedb_1.TheDb.openDb(filename)
            .then(() => {
            if (!settings_1.Settings.hasFixedDbLocation) {
                settings_1.Settings.dbPath = filename;
                settings_1.Settings.write();
            }
        })
            .then(() => {
            this.getHeroes();
        })
            .catch((reason) => {
            // Handle errors
            console.log('Error occurred while opening database: ', reason);
        });
    }
    createDb(filename) {
        if (!filename) {
            const options = {
                title: 'Create file',
                defaultPath: remote.app.getPath('documents'),
                filters: [
                    {
                        name: 'Database',
                        extensions: ['db'],
                    },
                ],
            };
            filename = remote.dialog.showSaveDialog(remote.getCurrentWindow(), options);
        }
        // if (!filename) {
        //     return;
        // }
        thedb_1.TheDb.createDb(filename)
            .then((dbPath) => {
            if (!settings_1.Settings.hasFixedDbLocation) {
                settings_1.Settings.dbPath = dbPath;
                settings_1.Settings.write();
            }
        })
            .then(() => {
            this.getHeroes();
        })
            .catch((reason) => {
            console.log(reason);
        });
    }
    getHeroes() {
        customer_1.Customer.get(+this.No)
            .then((customer) => {
            console.log("customer===", customer);
            this.editform.setValue({
                NO: customer.NO,
                Party: customer.Party,
                Address: customer.Address,
                City: customer.City,
                State: customer.State,
                GSTNo: customer.GSTNo
            });
            //this.heroes = heroes;
        });
    }
    onMenu(hero) {
        this.deleteHero(hero);
        // const menu = this.initMenu(hero);
        // Since Electron v2.0 popup must have option parameter.
        // See https://github.com/electron/electron/issues/12915
        // {} compiles correct, but tslint throws error
        // menu.popup({});
    }
    deleteHero(hero) {
        hero.delete();
        this.getHeroes();
    }
};
EditcustomerComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'app-home',
        templateUrl: './editcustomer.component.html'
    }),
    tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
], EditcustomerComponent);
exports.EditcustomerComponent = EditcustomerComponent;
//# sourceMappingURL=editcustomer.component.js.map