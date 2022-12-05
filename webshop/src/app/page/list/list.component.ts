import { Component, Input, OnInit } from '@angular/core';
import { RelayDataService } from 'src/app/services/relay-data.service';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralItemService } from 'src/app/services/general-item.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BehaviorItemList } from 'src/app/model/item-list';
import { HeaderList } from 'src/app/model/headers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  items: any[] = [];
  type: string = '';

  headerList: HeaderList = new HeaderList();
  headers: string[] = [];

  dataRelay: RelayDataService = inject(RelayDataService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  generalItemService: GeneralItemService = inject(GeneralItemService);
  router: Router = inject(Router);

  allDataLists$: Observable<BehaviorItemList> =
    this.generalItemService.listOfAll$;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.type = params['type'];
      this.dataRelay.setType(this.type);
      this.headers = this.headerList[this.type];

      this.allDataLists$.subscribe((list) => {
        list[this.type].subscribe((data: any) => {
          this.items = data;
        });
      });
    });
  }

  onDeleteItem(uniqueId: string) {
    this.generalItemService
      .deleteItem(uniqueId, this.type)
      .subscribe((item) => {
        this.allDataLists$.subscribe((list) => {
          list[this.type].subscribe((data: any) => {
            const index = data.findIndex(
              (item: any) => item.uniqueId === uniqueId
            );
            data = data.splice(index, 1);
            this.toastr.error(`Successfully deleted`, 'DELETE!', {
              timeOut: 5000,
              positionClass: 'toast-top-right',
            });
            // this.router
            //   .navigate(['/'])
            //   .then(() => this.router.navigate(['/list/', this.type]));
          });
        });
      });
  }

  onEditItem(uniqueId: string) {
    this.router.navigate([`edit/${uniqueId}`]);
  }

  onAddNewItem(emit: boolean) {
    this.router.navigate([`create/0`]);
  }
}
