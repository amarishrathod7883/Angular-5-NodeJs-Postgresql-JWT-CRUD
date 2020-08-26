import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

const baseUrl = '/api/products';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>
  {
    return this.http.get(baseUrl, { responseType: 'text' }).map(res => JSON.parse(res));
  }

  get(id): Observable<any> 
  {
    return this.http.get(`${baseUrl}/${id}`, { responseType: 'text' }).map(res => JSON.parse(res));
  }

  create(data): Observable<any> 
  {
    return this.http.post(baseUrl, data, { responseType: 'text' }).map(res => JSON.parse(res));
  }

  update(id, data): Observable<any> 
  {
    return this.http.put(`${baseUrl}/${id}`, data, { responseType: 'text' }).map(res => JSON.parse(res));
  }

  delete(id): Observable<any> 
  {
    return this.http.delete(`${baseUrl}/${id}`, { responseType: 'text' }).map(res => JSON.parse(res));
  }

  getFilterValue(value): Observable<any> 
  {
    var newurl = baseUrl + '/getproductfilter';
    return this.http.post(`${newurl}`, value, { responseType: 'text' }).map(res => JSON.parse(res));
  }

  findByProductName(product_name): Observable<any> 
  {
    return this.http.get(`${baseUrl}?title=${product_name}`, { responseType: 'text' }).map(res => JSON.parse(res));
  }

  getAllProductCategory(): Observable<any> 
  {
    return this.http.get(baseUrl+'/getproductcategory', { responseType: 'text' }).map(res => JSON.parse(res));
  }
}