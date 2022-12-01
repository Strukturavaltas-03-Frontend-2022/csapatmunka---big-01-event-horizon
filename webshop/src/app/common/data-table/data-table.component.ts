import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() headers: string[] = [];
  @Input() records: any[] = [];

  page: number = 1;
  phrases: string[] = [];
  phrase: string = '';
  key: string = '';
  sortHeader: string = '';
  sortDirection: boolean = true;
  sortDirections: boolean[] = [];

  @Output() deleteItem: EventEmitter<string> = new EventEmitter();
  @Output() editItem: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDelete(uniqueId: string) {
    this.deleteItem.emit(uniqueId);
  }

  onEdit(uniqueId: string) {
    this.editItem.emit(uniqueId);
  }

  onPhraseChange(header: string, index: number) {
    this.key = header;
    this.phrase = this.phrases[index];
  }

  onSorting(header: string, index: number) {
    this.sortHeader = header;
    this.sortDirections[index] = !this.sortDirections[index];
    this.sortDirection = this.sortDirections[index];
  }
}
