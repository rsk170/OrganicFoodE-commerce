import { HttpClient, HttpParams } from '@angular/common/http';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/productBrand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { Parameters } from '../shared/models/parameters';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  baseUrl = 'https://localhost:5001/api/';
  parameters = new Parameters();

  constructor(private http: HttpClient) {}

  getProducts(parameters: Parameters) {
    let params = new HttpParams();

    if (parameters.brandId !== 0) {
      params = params.append('brandId', parameters.brandId.toString());
    }

    if (parameters.typeId !== 0) {
      params = params.append('typeId', parameters.typeId.toString());
    }

    if (parameters.search) {
      params = params.append('search', parameters.search);
    }

    params = params.append('sort', parameters.sort);
    params = params.append('pageIndex', parameters.pageNumber.toString());
    params = params.append('pageSize', parameters.pageSize.toString());

    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body; // the IPaginationObject
        })
      );
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

  getShopParams() {
    return this.parameters;
  }

  setShopParams(params: Parameters) {
    this.parameters = params;
  }
}
