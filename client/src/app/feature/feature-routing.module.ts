import { NgModule } from '@angular/core';
import { FeatureComponent } from './feature.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: FeatureComponent},
  {path: ':id', component: ItemDetailsComponent, data: {breadcrumb: {alias: 'itemDetails'}}},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
