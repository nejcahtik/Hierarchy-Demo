import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  changeWhat: boolean[] = [false, false, false, false, false,
                            false, false, false, false]
  
  name: string = "";
  partner: string = "";
  constant: number = 0;
  planValue: string = "";
  basicName: string = "";
  planType: string = "";

  confirmed: boolean = false;

  checkConstant: boolean = false;
  productDeleted: boolean = false;

  @Input() product?: Product;

  constructor(private productService: ProductService) { }

  clickedOnChange(index: number): void {
    this.changeWhat[index] = true;
  }

  backToAllProducts() {
    this.product = undefined;
  }

  deleteProduct(): void {
    if(this.product)
      this.productService.deleteProduct(this.product.id)
        .subscribe(()=> {
          console.log("product deleted")
          this.productDeleted = true;
          
        });
  }

  confirm(whatToChange: string): void {

    if(whatToChange == "name" && this.product) {
      this.productService.changeProduct(this.product, whatToChange, this.name)
        .subscribe(prct => {
          console.log(prct);
          this.confirmed = true;
          if(this.product) this.product.product_name = this.name
        });
    }
    else if(whatToChange == "partner" && this.product) {
      this.productService.changeProduct(this.product, whatToChange, this.partner)
        .subscribe(prct => {
          console.log(prct);
          this.confirmed = true;
          if(this.product) this.product.product_partner = this.partner
        });
    }
    else if(whatToChange == "constant" && this.product) {
      if(Number(this.constant)){
        this.productService.changeProduct(this.product, whatToChange, this.constant)
          .subscribe(prct => {
            console.log(prct);
            this.confirmed = true;
            if(this.product) this.product.constant = this.constant
          });
      }
      else {
        this.checkConstant = true;
      }
    }
    else if(whatToChange == "plan_value" && this.product) {
      this.productService.changeProduct(this.product, whatToChange, this.planValue)
        .subscribe(prct => {
          console.log(prct);
          this.confirmed = true;
          if(this.product) this.product.plan_value = this.planValue
        });
    }
    else if(whatToChange == "basic_name" && this.product) {
      this.productService.changeProduct(this.product, whatToChange, this.basicName)
        .subscribe(prct => {
          console.log(prct);
          this.confirmed = true;
          if(this.product) this.product.basic_name = this.basicName
        });
    }
    else if(whatToChange == "plan_type" && this.product) {
      this.productService.changeProduct(this.product, whatToChange, this.planType)
        .subscribe(prct => {
          console.log(prct);
          this.confirmed = true;
          if(this.product) this.product.plan_type = this.planType
        });
    }

  }

  ngOnInit(): void {
  }

}
