import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Bill, billHeaderControls } from 'src/app/model/bill';
import { Customer, customerHeaderControls } from 'src/app/model/customer';
import { HeaderList } from 'src/app/model/headers';
import { BehaviorItemList } from 'src/app/model/item-list';
import { Order, orderHeaderControls } from 'src/app/model/order';
import { Product, productHeaderControls } from 'src/app/model/product';
import { GeneralItemService } from 'src/app/services/general-item.service';
import { RelayDataService } from 'src/app/services/relay-data.service';

@Component({
  selector: 'app-data-editor',
  templateUrl: './data-editor.component.html',
  styleUrls: ['./data-editor.component.scss'],
})
export class DataEditorComponent implements OnInit {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  dataRelay: RelayDataService = inject(RelayDataService);
  generalItemService: GeneralItemService = inject(GeneralItemService);
  router: Router = inject(Router);
  itemType: string = '';
  headers: string[] = [];
  headerList: HeaderList = new HeaderList();
  headerControls: any[] = [];
  editor: FormGroup = new FormGroup({});

  item: any = {};

  allDataLists$: Observable<BehaviorItemList> =
    this.generalItemService.listOfAll$;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.itemType = this.dataRelay.getType();

    switch (this.itemType) {
      case 'products':
        this.item = new Product();
        this.headers = this.headerList.products;
        this.headerControls = productHeaderControls;
        break;
      case 'customers':
        this.item = new Customer();
        this.headers = this.headerList.customers;
        this.headerControls = customerHeaderControls;
        break;
      case 'orders':
        this.item = new Order();
        this.headers = this.headerList.orders;
        this.headerControls = orderHeaderControls;
        break;
      case 'bills':
        this.item = new Bill();
        this.headers = this.headerList.bills;
        this.headerControls = billHeaderControls;
        break;
    }

    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] !== '0') {
        this.allDataLists$.subscribe((list) =>
          list[this.itemType].subscribe((items: any) => {
            this.item = items.filter(
              (item: any) => String(item.uniqueId) === String(params['id'])
            )[0];
          })
        );
      }
      this.generateInputs(this.item);
    });
  }

  generateInputs(item: any) {
    this.headerControls.forEach(
      (header) => (this.editor.controls[header.key] = new FormControl(''))
    );
  }

  onSubmit() {
    // create new item
    if (!this.item.uniqueId) {
      //calculating new id
      let newId: number = 0;
      this.allDataLists$.subscribe((list) =>
        list[this.itemType].subscribe(
          (data: any) => (newId = data.slice(-1)[0].id + 1)
        )
      );

      this.item.id = newId;

      switch (this.itemType) {
        case 'customers':
          this.getControlValuesOfSelectFields('add');
          break;
        case 'products':
          this.getControlValuesOfSelectFields('cat');
          break;
      }

      this.generalItemService
        .addItem(this.item, this.itemType)
        .subscribe((createdItem) => {
          this.allDataLists$.subscribe((list) => {
            list[this.itemType].subscribe((data: any) => {
              data.push(this.item);
              this.toastr.success(`Successfully created`, 'CREATE!', {
                timeOut: 5000,
                positionClass: 'toast-top-right',
              });
              this.router.navigate([`/list/${this.itemType}`]);
            });
          });
        });
    }
    // editing item
    else {
      switch (this.itemType) {
        case 'customers':
          this.getControlValuesOfSelectFields('add');
          break;
        case 'products':
          this.getControlValuesOfSelectFields('cat');
          break;
      }

      this.generalItemService
        .updateItem(this.item, this.itemType)
        .subscribe((editedItem: any) => {
          this.allDataLists$.subscribe((list) => {
            list[this.itemType].subscribe((data: any) => {
              data.filter(
                (item: any) => editedItem.uniqueId === item.uniqueId
              )[0] = editedItem;

              this.toastr.info(`Successfully edited`, 'EDIT!', {
                timeOut: 5000,
                positionClass: 'toast-top-right',
              });
              this.router.navigate([`/list/${this.itemType}`]);
            });
          });
        });
    }
  }

  getControlValuesOfSelectFields(param: string) {
    Object.keys(this.editor.controls).forEach((key) => {
      if (key.includes(param)) {
        this.item.address[key.slice(3).toLowerCase()] =
          this.editor.controls[key].value;
      }
    });
  }
}
