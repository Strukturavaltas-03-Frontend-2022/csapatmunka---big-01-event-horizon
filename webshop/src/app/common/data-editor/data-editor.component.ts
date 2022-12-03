import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bill, billHeaders } from 'src/app/model/bill';
import { Customer, customerHeaders } from 'src/app/model/customer';
import { Order, orderHeaders } from 'src/app/model/order';
import { HeaderControls, Product, productHeaders } from 'src/app/model/product';
import { RelayDataService } from 'src/app/services/relay-data.service';

@Component({
  selector: 'app-data-editor',
  templateUrl: './data-editor.component.html',
  styleUrls: ['./data-editor.component.scss'],
})
export class DataEditorComponent implements OnInit {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  dataRelay: RelayDataService = inject(RelayDataService);
  itemType: string = '';
  headers: string[] = [];
  headerControls = HeaderControls;
  editor: FormGroup = new FormGroup({});

  item: any = {};

  constructor() {}

  ngOnInit(): void {
    this.itemType = this.dataRelay.getType();

    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] !== '0') {
        this.item = this.dataRelay.getSingleItem(
          this.itemType,
          params['id']
        )[0];
      } else {
        switch (this.itemType) {
          case 'products':
            this.item = new Product();
            this.headers = productHeaders;
            break;
          case 'customers':
            this.item = new Customer();
            this.headers = customerHeaders;
            break;
          case 'orders':
            this.item = new Order();
            this.headers = orderHeaders;
            break;
          case 'bills':
            this.item = new Bill();
            this.headers = billHeaders;
            break;
        }
      }
      this.generateInputs();
    });
  }
  generateInputs() {
    this.headerControls.forEach(
      (header) =>
        (this.editor.controls[header.key] = new FormControl(header.key, [
          Validators.required,
        ]))
    );
  }

  onSubmit() {}
}
