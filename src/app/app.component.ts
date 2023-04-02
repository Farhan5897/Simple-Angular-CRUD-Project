import { Component, ViewChild } from '@angular/core';
import { UsersService } from './services/users.service';
import { OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'basic_crud_app';

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private _userService: UsersService){}




ngOnInit():void{
  this.showUser();
}



showUser(){
  this._userService.showUser().subscribe({
    next: (res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    },
    error: console.log,
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

deleteUser(id:number){
  this._userService.deleteUser(id).subscribe({
    next:(res) =>{
      alert('Deleted');
      this.showUser();
    },
    error:console.log,
  })
}
}
