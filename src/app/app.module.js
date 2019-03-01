"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/common/http");
const app_component_1 = require("./app.component");
const home_component_1 = require("./Home/home.component");
const about_component_1 = require("./About/about.component");
const common_1 = require("@angular/common");
const app_service_1 = require("./app.service");
const appRoutes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: '', component: about_component_1.AboutComponent }
];
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, common_1.CommonModule, http_1.HttpClientModule, router_1.RouterModule.forRoot(appRoutes, { useHash: true })],
        declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, about_component_1.AboutComponent],
        providers: [
            app_service_1.APIService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map