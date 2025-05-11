import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { FeatureRoutingModule } from './feature-routing.module';
import { CategoryHeaderComponent } from '../core/category-header/category-header.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [FeatureComponent, ProductItemComponent, ItemDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FeatureRoutingModule
  ]
})
export class FeatureModule { }
