import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-pagination-navigator',
  templateUrl: './pagination-navigator.component.html',
  styleUrls: ['./pagination-navigator.component.scss']
})
export class PaginationNavigatorComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageSize: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPaginationNavigatorChange(event: any) {
    this.pageChanged.emit(event.page);
  }

}
