import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { map, catchError, tap } from 'rxjs/operator';
import 'rxjs/add/operator/map';

@Injectable()   
export  class  APIService {
    API_URL  =  'http://localhost:3000/api';
    constructor(private  httpClient:  HttpClient) {}
    getCustomer(){
        return  this.httpClient.get(`${this.API_URL}/customer`);
    }
}