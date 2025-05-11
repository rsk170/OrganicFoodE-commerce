import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { PaginationNavigatorComponent } from './components/pagination-navigator/pagination-navigator.component';
import { OrderSumComponent } from './components/order-sum/order-sum.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PhotoWidgetComponent } from './components/photo-widget/photo-widget.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [PaginationHeaderComponent, PaginationNavigatorComponent, OrderSumComponent, TextInputComponent,
    StepperComponent, BasketSummaryComponent, PhotoWidgetComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    CdkStepperModule,
    RouterModule,
    CurrencyMaskModule,
    FormsModule,
    NgxGalleryModule,
    TabsModule.forRoot(),
    NgxDropzoneModule,
    ImageCropperModule
  ],
  exports: [
    PaginationModule,
    PaginationHeaderComponent,
    PaginationNavigatorComponent,
    CarouselModule,
    OrderSumComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
    CurrencyMaskModule,
    FormsModule,
    NgxGalleryModule,
    TabsModule,
    NgxDropzoneModule,
    ImageCropperModule,
    PhotoWidgetComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
