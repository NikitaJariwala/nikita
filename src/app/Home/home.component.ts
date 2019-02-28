import {Component, OnInit} from '@angular/core';
import * as fs from 'fs';
import * as path from 'path';
import { Settings } from '../model/settings';
import { TheDb } from '../model/thedb';
import {Hero} from "../model/hero";
const { remote } = require('electron')
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Customer} from "../model/customer";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit{
    public heroes: Hero[];
     formdata: any;
    ngOnInit(){
        this.formdata = new FormGroup({
            NO: new FormControl("", Validators.required),
            Party: new FormControl("", Validators.required),
            Address: new FormControl("", Validators.required),
            City: new FormControl(""),
            State: new FormControl("", Validators.required),
            GSTNo: new FormControl("", Validators.required)
        });
    }
    constructor( ) {
        Settings.initialize();

        if (fs.existsSync(Settings.dbPath)) {
            this.openDb(Settings.dbPath);
        } else if (Settings.hasFixedDbLocation) {
            this.createDb(Settings.dbPath);
        } else {
            this.createDb();
        }
    }
    onClickSubmit(data: any) {
        Customer.insert(+data.No,  data.Party, data.Address, data.GSTNo, data.City, data.State)
            .then((customer:any) => {
                console.log("customer===",customer)
                //this.heroes = heroes;
            });
    }

    public openDb(filename: string) {
        TheDb.openDb(filename)
            .then(() => {
                if (!Settings.hasFixedDbLocation) {
                    Settings.dbPath = filename;
                    Settings.write();
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

    public createDb(filename?: string) {
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

        TheDb.createDb(filename)
            .then((dbPath) => {
                if (!Settings.hasFixedDbLocation) {
                    Settings.dbPath = dbPath;
                    Settings.write();
                }
            })
            .then(() => {
                this.getHeroes();
            })
            .catch((reason) => {
                console.log(reason);
            });
    }

    public onRestoreDb() {
        TheDb.importJson(path.join(Settings.dbFolder, 'database.init.json'), false)
            .then(() => {
                this.getHeroes();
            });
    }

    public getHeroes() {
        Hero.getAll()
            .then((heroes) => {
                this.heroes = heroes;
            });
    }

    public onMenu(hero: Hero) {
        this.deleteHero(hero)
       // const menu = this.initMenu(hero);
        // Since Electron v2.0 popup must have option parameter.
        // See https://github.com/electron/electron/issues/12915
        // {} compiles correct, but tslint throws error
       // menu.popup({});
    }

    private deleteHero(hero: Hero) {
        hero.delete();
        this.getHeroes();
    }


}
