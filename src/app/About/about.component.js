"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
//import { APIService } from '../app.service';
//import { TheDb } from '../model/thedb';
const customer_1 = require("../model/customer");
//const { remote } = require('electron')
let AboutComponent = class AboutComponent {
    constructor(router) {
        this.router = router;
        this.printMode = false;
        this.logoRemoved = false;
        this.logo = '/assets/logo.jpg';
        this.invoice = {
            tax: 13.00,
            invoice_number: 10,
            customer_info: {
                name: 'Nikita Chevli',
                no: '91',
                address1: 'Laxmikant SOC',
                address2: 'Katargam',
                city: 'SURAT',
                state: 'GUJRAT',
                gstin: 'GSTTEGTGETGRTGTGTT'
            },
            company_info: {
                invoicNo: '1',
                date: '08/01/2019',
                dueDate: '08/01/2019',
                agent: '',
            },
            items: [
                { qty: '', description: '', cost: '', hsnCode: '' },
                { qty: '', description: '', cost: '', hsnCode: '' },
                { qty: '', description: '', cost: '', hsnCode: '' },
                { qty: '', description: '', cost: '', hsnCode: '' },
                { qty: '', description: '', cost: '', hsnCode: '' },
                { qty: '', description: '', cost: '', hsnCode: '' },
                { qty: '', description: '', cost: '', hsnCode: '' },
                { qty: '', description: '', cost: '', hsnCode: '' },
                { qty: '', description: '', cost: '', hsnCode: '' },
                { qty: '', description: '', cost: '', hsnCode: '' },
            ]
        };
        this.name = 'Angular 6';
        this.orderLines = [
            { price: 10, time: new Date(), quantity: 2 },
            { price: 20, time: new Date(), quantity: 3 },
            { price: 30, time: new Date(), quantity: 3 },
            { price: 40, time: new Date(), quantity: 5 }
        ];
        this.mainForm = this.getForm();
        this.invoice = this.invoice;
        this.person = "nikiiiii";
    }
    getForm() {
        return new forms_1.FormGroup({
            globalPrice: new forms_1.FormControl(),
            orderLines: new forms_1.FormArray(this.orderLines.map(this.getFormGroupForLine))
        });
    }
    printInfo() {
        // var data = document.getElementById('invoice');
        // var HTML_Width = document.getElementById('invoice').clientWidth;
        // var HTML_Height = document.getElementById('invoice').clientHeight
        // var top_left_margin = 15;
        // var ratio = HTML_Height / HTML_Width;
        // var PDF_Width = HTML_Width+(top_left_margin*2);
        // var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
        // var canvas_image_width = HTML_Width;
        // var canvas_image_height = HTML_Height;
        // var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
        // html2canvas(data).then(canvas => {
        //   canvas.getContext('2d');
        //   console.log(canvas.height+"  "+canvas.width);
        //   // Few necessary setting options
        //   var imgWidth = 208;
        //   var pageHeight = 295;
        //   var imgHeight = canvas.height * imgWidth / canvas.width;
        //   var heightLeft = imgHeight;
        //   const contentDataURL = canvas.toDataURL('image/png');
        //    let pdf = new jsPDF('p','mm', 'A4'); // A4 size page of PDF
        //   var position = 0;
        //   var width = pdf.internal.pageSize.width;
        //   var height = pdf.internal.pageSize.height;
        //   height = ratio * width;
        //   pdf.addImage(contentDataURL, 'PNG', 0,0 )
        //   pdf.setFontType("bold");
        //   pdf.save('MYPdf.pdf'); // Generated PDF
        // });
        window.print();
    }
    ;
    readUrl(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.logo = e.target.result;
                // document.getElementById('company_logo').setAttribute('src', e.target.result);
                this.setLogo(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    ;
    setLogo(logo) {
        localStorage['logo'] = logo;
    }
    ;
    addItem() {
        this.invoice.items.push({ qty: '', cost: '', description: "", hsnCode: '' });
    }
    removeItem(item) {
        this.invoice.items.splice(this.invoice.items.indexOf(item), 1);
    }
    ;
    invoiceSubTotal() {
        var total = 0.00;
        this.invoice.items.forEach((item) => {
            total += (+(item.qty) * +(item.cost));
        });
        return total;
    }
    ;
    calculateSGST() {
        return ((this.invoice.tax * this.invoiceSubTotal()) / 100);
    }
    ;
    calculateCGST() {
        return ((this.invoice.tax * this.invoiceSubTotal()) / 100);
    }
    ;
    calculateIGST() {
        return ((this.invoice.tax * this.invoiceSubTotal()) / 100);
    }
    ;
    // Calculates the grand total of the invoice
    calculateGrandTotal() {
        this.saveInvoice();
        return Math.round(this.calculateSGST() + this.calculateCGST() + this.invoiceSubTotal());
    }
    ;
    getFormGroupForLine(orderLine) {
        return new forms_1.FormGroup({
            price: new forms_1.FormControl(orderLine.price)
        });
    }
    convertIntoWord() {
        let amount = (this.calculateSGST() + this.calculateCGST() + this.invoiceSubTotal()).toString();
        var words = new Array();
        words[0] = '';
        words[1] = 'One';
        words[2] = 'Two';
        words[3] = 'Three';
        words[4] = 'Four';
        words[5] = 'Five';
        words[6] = 'Six';
        words[7] = 'Seven';
        words[8] = 'Eight';
        words[9] = 'Nine';
        words[10] = 'Ten';
        words[11] = 'Eleven';
        words[12] = 'Twelve';
        words[13] = 'Thirteen';
        words[14] = 'Fourteen';
        words[15] = 'Fifteen';
        words[16] = 'Sixteen';
        words[17] = 'Seventeen';
        words[18] = 'Eighteen';
        words[19] = 'Nineteen';
        words[20] = 'Twenty';
        words[30] = 'Thirty';
        words[40] = 'Forty';
        words[50] = 'Fifty';
        words[60] = 'Sixty';
        words[70] = 'Seventy';
        words[80] = 'Eighty';
        words[90] = 'Ninety';
        amount = amount.toString();
        var atemp = amount.split(".");
        var number = atemp[0].split(",").join("");
        var n_length = number.length;
        var words_string = "";
        if (n_length <= 9) {
            var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
            var received_n_array = new Array();
            for (var i = 0; i < n_length; i++) {
                received_n_array[i] = number.substr(i, 1);
            }
            for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                n_array[i] = received_n_array[j];
            }
            for (var i = 0, j = 1; i < 9; i++, j++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    if (n_array[i] == 1) {
                        n_array[j] = 10 + (+(n_array[j]));
                        n_array[i] = 0;
                    }
                }
            }
            let value = 0;
            for (var i = 0; i < 9; i++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    value = n_array[i] * 10;
                }
                else {
                    value = n_array[i];
                }
                if (value != 0) {
                    words_string += words[value] + " ";
                }
                if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Crores ";
                }
                if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Lakhs ";
                }
                if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Thousand ";
                }
                if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                    words_string += "Hundred and ";
                }
                else if (i == 6 && value != 0) {
                    words_string += "Hundred ";
                }
            }
            words_string = words_string.split("  ").join(" ");
        }
        return words_string;
    }
    clearLocalStorage() {
        var confirmClear = confirm('Are you sure you would like to clear the invoice?');
        if (confirmClear) {
            this.clear();
            this.setInvoice(this.invoice);
        }
    }
    ;
    clear() {
        localStorage['invoice'] = '';
        this.clearLogo();
    }
    ;
    clearLogo() {
        localStorage['logo'] = '';
    }
    ;
    hasLogo() {
        return !!localStorage['logo'];
    }
    ;
    // Returns a stored logo (false if none is stored)
    getLogo() {
        if (this.hasLogo()) {
            return localStorage['logo'];
        }
        else {
            return false;
        }
    }
    ;
    //in service file
    setInvoice(invoice) {
        localStorage['invoice'] = JSON.stringify(invoice);
    }
    ;
    toggleLogo() {
        this.logoRemoved = !this.logoRemoved;
        this.clearLogo();
    }
    ;
    // Triggers the logo chooser click event
    saveInvoice() {
        this.setInvoice(this.invoice);
    }
    ;
    submitForm() {
    }
    onSelectChange(customerNo) {
        let info = customer_1.Customer.get(customerNo)
            .then((customer) => {
            return customer;
        });
        console.log("customer=====", info);
        this.invoice.customer_info = {
            name: info['Party'],
            no: '91',
            address1: info['Address'],
            city: info['City'],
            state: info['State'],
            gstin: info['GSTNo']
        };
    }
    ngOnInit() {
        customer_1.Customer.getAll()
            .then((customer) => {
            console.log("customer====", customer);
            this.customers = customer;
        });
        // this.apiService
        //         .getCustomer()
        //         .subscribe(data  => {
        //           // this.getProducts();
        //           this.customers = data['data'];
        //         });
    }
    onButtonClick() {
        console.log("bnutton click");
        this.router.navigate(['home']);
    }
};
AboutComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'app-about',
        templateUrl: './about.component.html',
        styleUrls: ['./about.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [router_1.Router])
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map