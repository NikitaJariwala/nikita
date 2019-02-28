"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const fs = require("fs");
const path = require("path");
const settings_1 = require("../model/settings");
const thedb_1 = require("../model/thedb");
const hero_1 = require("../model/hero");
const { remote } = require('electron');
const forms_1 = require("@angular/forms");
const customer_1 = require("../model/customer");
let HomeComponent = class HomeComponent {
    constructor() {
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
        this.formdata = new forms_1.FormGroup({
            NO: new forms_1.FormControl("", forms_1.Validators.required),
            Party: new forms_1.FormControl("", forms_1.Validators.required),
            Address: new forms_1.FormControl("", forms_1.Validators.required),
            City: new forms_1.FormControl(""),
            State: new forms_1.FormControl("", forms_1.Validators.required),
            GSTNo: new forms_1.FormControl("", forms_1.Validators.required)
        });
    }
    onClickSubmit(data) {
        customer_1.Customer.insert(+data.No, data.Party, data.Address, data.GSTNo, data.City, data.State)
            .then((customer) => {
            console.log("customer===", customer);
            //this.heroes = heroes;
        });
    }
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
        if (!filename) {
            return;
        }
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
    onRestoreDb() {
        thedb_1.TheDb.importJson(path.join(settings_1.Settings.dbFolder, 'database.init.json'), false)
            .then(() => {
            this.getHeroes();
        });
    }
    getHeroes() {
        hero_1.Hero.getAll()
            .then((heroes) => {
            this.heroes = heroes;
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
HomeComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'app-home',
        templateUrl: './home.component.html'
    }),
    tslib_1.__metadata("design:paramtypes", [])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map