import {Component, OnInit} from '@angular/core';
import * as fs from 'fs';
import { Settings } from '../model/settings';
import { TheDb } from '../model/thedb';
import {Hero} from "../model/hero";
const { remote } = require('electron')
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Customer} from "../model/customer";
import { ActivatedRoute,Router } from '@angular/router'


@Component({
    selector: 'app-home',
    templateUrl: './editcustomer.component.html'
})

export class EditcustomerComponent implements OnInit{
    public heroes: Hero[];
    public No: any;
    public sub: any;
    public customers: Customer[];
     editform: any;
    ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            this.No = params['id'];
        });
        console.log(this.No);

        this.editform = new FormGroup({
            NO: new FormControl(this.No, Validators.required),
            Party: new FormControl("swfwefe", Validators.required),
            Address: new FormControl("", Validators.required),
            City: new FormControl(""),
            State: new FormControl("", Validators.required),
            GSTNo: new FormControl("", Validators.required)
        });
    }
    constructor(private route: ActivatedRoute, private router: Router) {
        Settings.initialize();

        if (fs.existsSync(Settings.dbPath)) {
            this.openDb(Settings.dbPath);
        } else if (Settings.hasFixedDbLocation) {
            this.createDb(Settings.dbPath);
        } else {
            this.createDb();
        }
    }
    onSubmit() {
        Customer.update(+(this.editform.get('NO').value),  this.editform.get('Party').value, this.editform.get('Address').value,this.editform.get('GSTNo').value, this.editform.get('City').value, this.editform.get('State').value)
            .then((customer:any) => {
                console.log("customer===",customer);
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

        // if (!filename) {
        //     return;
        // }

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

    public getHeroes() {
        Customer.get(+this.No)
            .then((customer:any) => {
                console.log("customer===",customer);
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
