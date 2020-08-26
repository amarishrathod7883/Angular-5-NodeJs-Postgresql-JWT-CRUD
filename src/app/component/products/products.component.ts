import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit {

  products: any;
  currentProduct = null;
  currentIndex = -1;
  product_name = '';

  constructor(private ProductsService: ProductsService) { }

  ngOnInit() 
  {
    this.retrieveProducts();
  }

  retrieveProducts() 
  {
    this.ProductsService.getAll().subscribe(data => 
    {
      this.products = data;
    },
    error => 
    {
      console.log(error);
    });
  }

  deleteProduct(id)
  {
    var confirmDelete = confirm("Are you sure want to Delete?");
    if (confirmDelete == true) 
    {
      this.ProductsService.delete(id).subscribe(res => 
      {
        this.retrieveProducts();
      });
    }
  }

  getFilterValue(searchData)
  {
    if(!!searchData)
    {
      var search = {
        orderby: searchData
      };
      this.ProductsService.getFilterValue(search).subscribe(res => 
      {
        this.products = res;
      });
    }
    else
    {
      this.retrieveProducts();
    }
    

  }
}
