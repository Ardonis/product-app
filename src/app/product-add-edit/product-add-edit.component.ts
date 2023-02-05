import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss'],
})
export class ProductAddEditComponent implements OnInit {
  productFrom: FormGroup;
  category: string[] = ['Electronics', 'Fashion', 'Health', 'Bueaty'];

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<ProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productFrom = this._fb.group({
      name: '',
      category: '',
      price: '',
      date: '',
    });
  }

  ngOnInit(): void {
    this.productFrom.patchValue(this.data);
  }
  onFromSubmit() {
    if (this.productFrom) {
      if (this.data) {
        console.log('test form submit', this.data, this.productFrom);
        this._productService.updateProduct(this.data.id,this.productFrom.value).subscribe({
          next: (val: any) => {
            alert('Product updated successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        console.log('create', this.productFrom)
        this._productService.addProduct(this.productFrom.value).subscribe({
          next: (val: any) => {
            alert('Product added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
