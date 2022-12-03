import { Component, Input, OnInit } from '@angular/core';
import { RelayDataService } from 'src/app/services/relay-data.service';
import { inject } from '@angular/core';
import { customerHeaders } from 'src/app/model/customer';
import { productHeaders } from 'src/app/model/product';
import { orderHeaders } from 'src/app/model/order';
import { billHeaders } from 'src/app/model/bill';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralItemService } from 'src/app/services/general-item.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  items: any[] = [];
  type: string = '';

  headers: string[] = [];

  dataRelay: RelayDataService = inject(RelayDataService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  generalItemService: GeneralItemService = inject(GeneralItemService);
  router: Router = inject(Router);

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getItems(params['type']);

      this.type = this.dataRelay.getType();

      switch (this.type) {
        case 'products':
          this.headers = productHeaders;
          break;
        case 'customers':
          this.headers = customerHeaders;
          break;
        case 'orders':
          this.headers = orderHeaders;
          break;
        case 'bills':
          this.headers = billHeaders;
          break;
      }
    });
  }

  onDeleteItem(uniqueId: string) {
    this.generalItemService
      .deleteItem(uniqueId, this.type)
      .subscribe((item) => {
        this.generalItemService.fetchItems(this.type).subscribe((items) => {
          this.dataRelay.setItems([...items], this.type);
          this.toastr.error(`Successfully deleted`, 'DELETE!', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
          });
          this.router
            .navigate(['/'])
            .then(() => this.router.navigate(['/list/', this.type]));
        });
      });
  }

  onEditItem(uniqueId: string) {
    this.router.navigate([`edit/${uniqueId}`]);
  }

  getItems(type: string) {
    this.items = this.dataRelay.getItems(type);
  }

  onAddNewItem(emit: boolean) {
    this.router.navigate([`edit/0`]);
  }
}
