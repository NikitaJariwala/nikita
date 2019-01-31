import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'app/About/about.component.html',
  styleUrls: ['app/About/about.component.css']

})
export class AboutComponent implements OnInit {
  person: string
  printMode   = false
  logoRemoved = false;
  logo='app/assets/logo.jpg'
  invoice: any = {
    tax: 13.00,
    invoice_number: 10,
    customer_info: {
      name: 'Mr. John Doe',
      web_link: 'John Doe Designs Inc.',
      address1: '1 Infinite Loop',
      address2: 'Cupertino, California, US',
      postal: '90210'
    },
    company_info: {
      name: 'Metaware Labs',
      web_link: 'www.metawarelabs.com',
      address1: '123 Yonge Street',
      address2: 'Toronto, ON, Canada',
      postal: 'M5S 1B6'
    },
    items: [
      { qty: 10, description: 'Gadget', cost: 9.95 }
    ]
  };
  
  constructor(private router: Router) {
    this.mainForm = this.getForm();
    this.invoice = this.invoice
    this.person = "nikiiiii"
  }
  name = 'Angular 6';
  mainForm: FormGroup;
  orderLines = [
    { price: 10, time: new Date(), quantity: 2 },
    { price: 20, time: new Date(), quantity: 3 },
    { price: 30, time: new Date(), quantity: 3 },
    { price: 40, time: new Date(), quantity: 5 }
  ]

  getForm(): FormGroup {
    return new FormGroup({
      globalPrice: new FormControl(),
      orderLines: new FormArray(this.orderLines.map(this.getFormGroupForLine))
    })
  }
  printInfo () {
    window.print();
  };
  readUrl (event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (e:any) => {
        this.logo=e.target.result;
       // document.getElementById('company_logo').setAttribute('src', e.target.result);
        this.setLogo(e.target.result);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  setLogo(logo:any) {
    localStorage['logo'] = logo;
  };

  addItem() {
    this.invoice.items.push({ qty: 0, cost: 0, description: "" });
  }

  removeItem(item: any) {
    this.invoice.items.splice(this.invoice.items.indexOf(item), 1);
  };

  invoiceSubTotal() {
    var total = 0.00;
    this.invoice.items.forEach((item:any, key:any)=>{
      total += (item.qty * item.cost);
    });
    return total;
  };
 calculateTax () {
    return ((this.invoice.tax * this.invoiceSubTotal())/100);
  };

  // Calculates the grand total of the invoice
  calculateGrandTotal () {
    this.saveInvoice();
    return this.calculateTax() + this.invoiceSubTotal();
  };
  
  getFormGroupForLine(orderLine: any): FormGroup {
    return new FormGroup({
      price: new FormControl(orderLine.price)
    })
  }

  clearLocalStorage() {
    var confirmClear = confirm('Are you sure you would like to clear the invoice?');
    if(confirmClear) {
      this.clear();
      this.setInvoice(this.invoice);
    }
  };

  clear() {
    localStorage['invoice'] = '';
    this.clearLogo();
  };
  clearLogo () {
    localStorage['logo'] = '';
  };


  hasLogo () {
    return !!localStorage['logo'];
  };

  // Returns a stored logo (false if none is stored)
  getLogo () {
    if (this.hasLogo()) {
      return localStorage['logo'];
    } else {
      return false;
    }
  };

 

//in service file
  setInvoice (invoice:any) {
    localStorage['invoice'] = JSON.stringify(invoice);
  };

  toggleLogo(element:any) {
    this.logoRemoved = !this.logoRemoved;
    this.clearLogo();
  };
  
  // Triggers the logo chooser click event
  editLogo () {
    // angular.element('#imgInp').trigger('click');
    document.getElementById('imgInp').click();
  };
  saveInvoice () {
    this.setInvoice(this.invoice);
  };

  submitForm() {

  }
  ngOnInit() {
    this.person = "nikitaaaaa";
  }
  onButtonClick() {
    debugger;
    console.log("bnutton click");
    this.router.navigate(['home']);
  }
}
