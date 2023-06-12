import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CRUDService } from 'src/app/service/crud.service';
import { Products } from 'src/app/models/products.interface';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


        sub!: Subscription;
        products: Products[] | undefined;

  constructor(private prodottoSRV: CRUDService) { }

  ngOnInit(): void {
    this.recuperateProduct()
  }


  recuperateProduct() {
    this.sub = this.prodottoSRV.recupera().subscribe((res: Products[]) => {
        this.products = res;
  });
  }

}
