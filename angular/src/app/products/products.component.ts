import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  
  clickedOnFilter: boolean = false;

  searchText: string = "";

  selectedProduct?: Product;

  constructor(private productService: ProductService) { }

  filter() {
    //todo
  }

  addProduct() {
    //todo
    //open AddProductComponent
  }

  setProduct(product: Product) {
    this.selectedProduct = product;
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(prcts => {
        console.log(prcts);
        this.products = prcts;
      })
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
