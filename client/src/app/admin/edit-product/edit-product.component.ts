import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IProduct, ProductFormValues} from '../../shared/models/product';
import {IBrand} from '../../shared/models/productBrand';
import {IType} from '../../shared/models/productType';
import {forkJoin} from 'rxjs';
import { FeatureService } from 'src/app/feature/feature.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: IProduct;
  productFormValues: ProductFormValues;
  brands: IBrand[];
  types: IType[];

  constructor(private adminService: AdminService,
              private featureService: FeatureService,
              private route: ActivatedRoute,
              private router: Router) {
    this.productFormValues = new ProductFormValues();
  }

  ngOnInit(): void {
    const brands = this.getBrands();
    const types = this.getTypes();

    forkJoin([types, brands]).subscribe(results => {
      this.types = results[0];
      this.brands = results[1];
    }, error => {
      console.log(error);
    }, () => {
      if (this.route.snapshot.url[0].path === 'edit') {
        this.loadProduct();
      }
    });
  }

  loadProduct() {
    this.featureService.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
        const productBrandId = this.brands && this.brands.find(x => x.name === response.productBrand).id;
        const productTypeId = this.types && this.types.find(x => x.name === response.productType).id;
        this.product = response;
        this.productFormValues = {...response, productBrandId, productTypeId};
      });
    }

  getBrands() {
    return this.featureService.getBrands();
  }

  getTypes() {
    return this.featureService.getTypes();
  }
}
