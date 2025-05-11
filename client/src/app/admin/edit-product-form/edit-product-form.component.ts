import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFormValues } from 'src/app/shared/models/product';
import { IBrand } from 'src/app/shared/models/productBrand';
import { IType } from 'src/app/shared/models/productType';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss'],
})
export class EditProductFormComponent implements OnInit {
  @Input() product: ProductFormValues;
  @Input() brands: IBrand[];
  @Input() types: IType[];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  updatePrice(event: any) {
    this.product.price = event;
  }

  onSubmit(product: ProductFormValues) {
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedProduct = {
        ...this.product,
        ...product,
        price: +product.price,
      };
      this.adminService
        .updateProduct(updatedProduct, +this.route.snapshot.paramMap.get('id'))
        .subscribe((response: any) => {
          this.router.navigate(['/admin']);
        });
    } else {
      const newProduct = { ...product, price: +product.price };
      this.adminService.createProduct(newProduct).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
