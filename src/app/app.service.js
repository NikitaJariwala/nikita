"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
// import { map, catchError, tap } from 'rxjs/operator';
require("rxjs/add/operator/map");
let APIService = class APIService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.API_URL = 'http://localhost:3000/api';
    }
    getCustomer() {
        return this.httpClient.get(`${this.API_URL}/customer`);
    }
};
APIService = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
], APIService);
exports.APIService = APIService;
//# sourceMappingURL=app.service.js.map