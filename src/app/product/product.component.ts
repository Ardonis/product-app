import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddEditComponent } from '../product-add-edit/product-add-edit.component';
import { ProductService } from '../service/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'price', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _productService: ProductService
  ) {}
  ngOnInit(): void {
    this.getProductList();
  }
  openAddEditProductForm() {
    const dialogRef = this._dialog.open(ProductAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getProductList();
        }
      }
    })
  }
  getProductList() {
    this._productService.getProductList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe({
      next: (res) => {
        alert('Product Deleted!');
        this.getProductList();
      },
      error: console.log,
    });
  }

  openEditProductForm(data:any) {
    const dialogRef = this._dialog.open(ProductAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getProductList();
        }
      }
    })
  }
}
