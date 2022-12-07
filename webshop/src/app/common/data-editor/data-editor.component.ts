import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Bill, billHeaderControls } from 'src/app/model/bill';
import { Customer, customerHeaderControls } from 'src/app/model/customer';
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
  headerControls: any[] = [];
  editor: FormGroup = new FormGroup({});
  action: string = '';
  item!: Product | Customer | Order | Bill;

  allDataLists$: Observable<BehaviorItemList> =
    this.generalItemService.listOfAll$;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.itemType = this.dataRelay.getType();

    switch (this.itemType) {
      case 'products':
        this.item = new Product();
        this.headerControls = productHeaderControls;
        break;
      case 'customers':
        this.item = new Customer();
        this.headerControls = customerHeaderControls;
        break;
      case 'orders':
        this.item = new Order();
        this.headerControls = orderHeaderControls;
        break;
      case 'bills':
        this.item = new Bill();
        this.headerControls = billHeaderControls;
        break;
    }

    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] !== '0') {
        this.action = 'editor';
        this.allDataLists$.subscribe((list) =>
          list[this.itemType].subscribe((items: any) => {
            this.item = {
              ...items.filter(
                (item: any) => String(item.uniqueId) === String(params['id'])
              )[0],
            };
          })
        );
      } else {
        this.action = 'creator';
      }
      this.generateInputControls(this.item);
    });
  }

  generateInputControls(item: Product | Customer | Order | Bill): void {
    this.headerControls.forEach((header) => {
      if (header.visible === true) {
        const control = new FormControl(item[header.key], header.validators);
        this.editor.addControl(header.key, control);
      }
    });
  }

  onSubmit() {
    // create new item
    if (!this.item.uniqueId) {
      //calculating new id
      let newId: number = 0;
      this.allDataLists$.subscribe((list) =>
        list[this.itemType].subscribe(
          (data: any) => (newId = data.slice(-1)[0].id)
        )
      );

      this.item.id = newId + 1;

      this.getControlValuesOfSelectFields();

      this.generalItemService
        .addItem(this.item, this.itemType)
        .subscribe((createdItem: any) => {
          this.item.uniqueId = createdItem['name'];
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
      this.getControlValuesOfSelectFields();

      this.generalItemService
        .updateItem(this.item, this.itemType)
        .subscribe((editedItem: any) => {
          this.allDataLists$.subscribe((list) => {
            list[this.itemType].subscribe((data: any) => {
              const index = data.findIndex(
                (item: any) => editedItem.uniqueId === item.uniqueId
              );
              data = data.splice(index, 1, this.item);

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

  getControlValuesOfSelectFields() {
    if (this.itemType === 'products') {
      this.item.category.name = this.editor.controls['catName'].value;

      this.item.active = this.editor.controls['active'].value;
      this.item.featured = this.editor.controls['featured'].value;
      this.item.price = Number(this.editor.controls['price'].value);
      this.setNonEditableCategoryData();
    } else if (this.itemType === 'customers') {
      Object.keys(this.editor.controls).forEach((key) => {
        if (key.includes('add')) {
          this.item.address[key.slice(3).toLowerCase()] =
            this.editor.controls[key].value;
        }
      });
      this.item.active = this.editor.controls['active'].value;
    } else if (this.itemType === 'orders') {
      this.item.customerId = Number(this.editor.controls['customerId'].value);
      this.item.productId = Number(this.editor.controls['productId'].value);
      this.item.amount = Number(this.editor.controls['amount'].value);
    } else if (this.itemType === 'bills') {
      this.item.orderId = Number(this.editor.controls['orderId'].value);
      this.item.amount = Number(this.editor.controls['amount'].value);
    }
  }

  setNonEditableCategoryData() {
    const categoryName = this.editor.controls['catName'].value;
    const indexOfCategory =
      this.headerControls[4].options.indexOf(categoryName);
    let categoryId: string = '';
    let categoryDescription: string = '';
    categoryId = this.headerControls[3].options[indexOfCategory];
    categoryDescription = this.headerControls[5].options[indexOfCategory];
    this.item['category'].id = Number(categoryId);
    this.item['category'].description = categoryDescription;
  }
}
