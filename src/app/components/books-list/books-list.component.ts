import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  Books: any[] = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.GetBooks().subscribe(res => {
      console.log(res);
      this.Books = res as any[];
    });
  }

  onDelete(id: any): void {
    this.crudService.DeleteBook(id).subscribe({
      next: (res) => {
        console.log(res);
        // Prefer updating the array instead of reloading the whole page:
        this.Books = this.Books.filter(b => (b as any)._id !== id);
      },
      error: (err) => console.error(err)
    });
  }
}
