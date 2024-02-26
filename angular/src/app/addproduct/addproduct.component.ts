import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productName: string = "";
  productPartner: string = "";
  constant: number = 0;
  planValue: string = "";
  basicName: string = "";
  planType: string = "";
  productType: string = "";
  planName: string = "";
  bcv: number = 0;
  pointsEarned: number = 0;
  pointsToBePaid: string = "";
  pointsForCareer: string = "";
  satbppr: string = "";

  productAdded: boolean = false;

  product?: Product = undefined;

  notanumber: boolean = false;

  constructor(private productService: ProductService) { }

  addProduct() {
    if(Number(this.constant) && this.constant > 0)
      this.productService.addProduct(this.productName, this.productPartner,
                                      this.constant, this.planValue, this.basicName,
                                      this.planType, this.productType, this.planName, this.bcv,
                                      this.pointsEarned, this.pointsToBePaid,
                                      this.pointsForCareer, this.satbppr)
        .subscribe(() => {
          console.log("product added");
          this.productAdded = true;
        })
    else {
      this.notanumber = true;
    }
      
  }

  ngOnInit(): void {
  }

}
