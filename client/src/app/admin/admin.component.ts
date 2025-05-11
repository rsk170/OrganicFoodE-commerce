import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import {FeatureService} from '../feature/feature.service';
import {AdminService} from './admin.service';
import { Parameters } from '../shared/models/parameters';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  products: IProduct[];
  totalCount: number;
  parameters: Parameters;

  constructor(
    private featureService: FeatureService,
    private adminService: AdminService
  ) {
    this.parameters = this.featureService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.featureService.getProducts(this.parameters).subscribe(
      (response) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPageChanged(event: any) {
    const params = this.featureService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.featureService.setShopParams(params);
      this.getProducts();
    }
  }

  deleteProduct(id: number) {
    this.adminService.deleteProduct(id).subscribe((response: any) => {
      this.products.splice(
        this.products.findIndex((p) => p.id === id),
        1
      );
      this.totalCount--;
    });
  }
}
