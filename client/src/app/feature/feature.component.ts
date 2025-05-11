import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Parameters } from '../shared/models/parameters';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/productBrand';
import { IType } from '../shared/models/productType';
import { FeatureService } from './feature.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  parameters = new Parameters();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private featureService: FeatureService) { }

  ngOnInit(): void {
   this.getProducts();
   this.getBrands();
   this.getTypes();
  }

  getProducts(): void {
    this.featureService.getProducts(this.parameters).subscribe(response => {
      this.products = response.data;
      this.parameters.pageNumber = response.pageIndex;
      this.parameters.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands(): void {
    this.featureService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];  // another object to the array, adding an object at the beginning
    }, error => {
      console.log(error);
    });
  }

  getTypes(): void {
    this.featureService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number): void {
    this.parameters.brandId = brandId;
    this.parameters.pageNumber = 1;   // reset the page when a filter is chosen
    this.getProducts();
  }

  onTypeSelected(typeId: number): void {
    this.parameters.typeId = typeId;
    this.parameters.pageNumber = 1;   // reset the page when a new type is chosen
    this.getProducts();
  }

  activeClass(id: any) {
    console.log('enter id:', id);
    document.getElementById(id).classList.add('activeLocal');
  }

  removeActiveClass(id: any) {
    console.log('leave id:', id);
    document.getElementById(id).classList.remove('activeLocal');
  }

  onSortSelected(sort: string) {
    this.parameters.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.parameters.pageNumber !== event)
    {
      this.parameters.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.parameters.search = this.searchTerm.nativeElement.value;
    this.parameters.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.parameters = new Parameters();
    this.getProducts();
  }
}
