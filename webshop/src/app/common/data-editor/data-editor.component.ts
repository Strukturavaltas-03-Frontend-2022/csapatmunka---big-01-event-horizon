import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  item: any = {};

  constructor() {}

  ngOnInit(): void {
    this.itemType = this.dataRelay.getType();

    this.activatedRoute.params.subscribe((params) => {
      this.item = this.dataRelay.getSingleItem(this.itemType, params['id'])[0];
    });
  }
}
