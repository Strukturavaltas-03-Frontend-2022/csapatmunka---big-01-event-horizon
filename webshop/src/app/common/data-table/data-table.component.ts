import { Component, inject, Input, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { RelayDataService } from 'src/app/services/relay-data.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() headers: string[] = [];
  @Input() records: any[] = [];

  type: string = '';
  showSpinner: boolean[] = [];

  productService: ProductService = inject(ProductService);
  customerService: CustomerService = inject(CustomerService);
  orderService: OrderService = inject(OrderService);
  billService: BillService = inject(BillService);
  dataRelay: RelayDataService = inject(RelayDataService);

  constructor() {}

  ngOnInit(): void {
    this.showSpinner = new Array(this.records.length).fill(false);
  }

  setItemsAndResetSpinner(items: any) {
    this.records = [...items];
    this.dataRelay.setItems([...items]);
    this.showSpinner = new Array(this.records.length).fill(false);
  }

  onDelete(item: any, index: number) {
    this.type = this.dataRelay.getType();
    this.showSpinner[index] = true;

    switch (this.type) {
      case 'products':
        this.productService.deleteProduct(item).subscribe((item) => {
          this.productService.fetchProducts().subscribe((items) => {
            this.setItemsAndResetSpinner(items);
          });
        });

        break;
      case 'customers':
        this.customerService.deleteCustomer(item).subscribe((item) => {
          this.customerService.fetchCustomers().subscribe((items) => {
            this.setItemsAndResetSpinner(items);
          });
        });
        break;
      case 'orders':
        this.orderService.deleteOrder(item).subscribe((item) => {
          this.orderService.fetchOrders().subscribe((items) => {
            this.setItemsAndResetSpinner(items);
          });
        });
        break;
      case 'bills':
        this.billService.deleteBill(item).subscribe((item) => {
          this.billService.fetchBills().subscribe((items) => {
            this.setItemsAndResetSpinner(items);
          });
        });
        break;
    }
  }
}
