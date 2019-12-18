import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderActivateService {
  private actionSource = new Subject<boolean>()
  actionSourceObservable = this.actionSource.asObservable();
  private deleteSource = new Subject<boolean>()
  deleteSourceObservable = this.deleteSource.asObservable();

  constructor() { }

  onEditClick(data){
    this.actionSource.next(data)
  }

  onDeleteClick(data) {
    this.deleteSource.next(data)
  }
}
