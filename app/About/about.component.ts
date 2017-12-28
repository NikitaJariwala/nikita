import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: 'app/About/about.component.html'
})
export class AboutComponent implements OnInit{
    constructor(private router:Router){}

    ngOnInit(){

    }
    onButtonClick(){
        debugger;
        console.log("bnutton click");
        this.router.navigate(['home']);
    }
}
