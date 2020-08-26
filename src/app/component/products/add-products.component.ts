import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styles: []
})
export class AddProductsComponent implements OnInit 
{
  id: any = [];
  rForm: any;
  submitted = false;
  getProduct: any = {};
  getCategory: any = [];

  constructor(
    private ProductsService: ProductsService,
    private el: ElementRef, 
    private router: Router, 
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, ) 
  { 
    this.rForm = fb.group({
      'product_name': [null, Validators.required],
      'category_id': [null, Validators.required],
      'description': [null, Validators.required],
      'price': [0, Validators.required],
      'product_image': [null],
      'product_image_old': [null],
    });
  }

  ngOnInit() 
  {
    this.getAllCategory();

    this.activatedRoute.params.subscribe((params: Params) => 
    {
      this.id = params['id'];
      if (this.id != 'new') 
      {
        this.ProductsService.get(this.id).subscribe(res => 
        {
          this.getProduct = res;
        });
      }
    });
  }

  getAllCategory()
  {
    this.ProductsService.getAllProductCategory().subscribe(data => 
    {
      this.getCategory = data;
    },
    error => 
    {
      console.log(error);
    });
  }

  addProducts(formdata) 
  {
    console.log("formdata", formdata);

    if (this.rForm.valid) 
    {
      const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#product_image');
      const fileCount: number = inputEl.files.length;
      
      const formData = new FormData();

      formData.append('product_name', formdata['product_name']);
      formData.append('description', formdata['description']);
      formData.append('category_id', formdata['category_id']);
      formData.append('price', formdata['price']);
      formData.append('product_image_old', formdata['product_image_old']);
      var upload_path = 'product_attachment';
      formData.append('uploadpath', upload_path);
      formData.append('product_image', inputEl.files.item(0));
      
      // return false;
      if(this.id != 'new')
      {
        formData.append('id', this.id);
        this.ProductsService.update(this.id, formData).subscribe(res => 
        {
          this.router.navigate(['/products']);
        },
        error => 
        {
          console.log(error);
        });
      }
      else
      {
        this.ProductsService.create(formData).subscribe(res => 
        {
          this.router.navigate(['/products']);
        },
        error => 
        {
          console.log(error);
        });
      }
    } 
    else 
    {
      Object.keys(this.rForm.controls).forEach(field => 
      {
        const control = this.rForm.get(field);
        control.markAsTouched({ onlySelf: true });
        if(control.status == 'INVALID')
        {
          console.log(field, "<=>", control.status);
        }
      });
    }
  }
}