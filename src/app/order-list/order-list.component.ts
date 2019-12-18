import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { OrderActivateService } from '../services/order-activate.service';
declare var $: any;

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  modalData = ''
  deleteData = ''
  orderUserName: ''
  orderTitle = ['Order #', 'Purchased On', 'Deliver To', 'Status', 'Activity']
  properties = ['order_id', 'purchased_on', 'deliver_to', 'status', 'activity']
  orderList = ''
  newPurchase = ''
  newDeliver = ''
  newStatus = ''
  constructor(private route: ActivatedRoute, private http: HttpClient, private orderActivate: OrderActivateService) {
    this.route.queryParams.subscribe(params => {
      this.orderUserName = params.userName
    })
   }

  ngOnInit() {
    this.http.get('http://localhost:3000/order').subscribe((value: any) => {
      this.orderList = value.orders
    }, (err) => {
      console.log('Error while getting the initial orders')
      console.log('************************')
      console.log(err)
      console.log('************************')
    })
    this.orderActivate.actionSourceObservable.subscribe((value: any) => {
      this.modalData = value;
      $('#edit-modal').modal('show');
    })
    this.orderActivate.deleteSourceObservable.subscribe((value: any) => {
      this.deleteData = value
      $('#delete-modal').modal('show')
      // this.onDelete(value)
    })
   
  }

  onEdit(editedData) {
    this.http.post('http://localhost:3000/order/edit', editedData).subscribe((status: any) => {
      this.orderList = status.result
    }, (err) => {
      console.log("Error posting the order data")
      console.log('************************')
      console.log(err)
      console.log('************************')
    })
    $('#edit-modal').modal('hide')
  }

  addOrder(data) {
    $('#add-modal').modal('show');
  }

  calculateMax(orderList) {
    let max = 0
    orderList.forEach(element => {
      if(parseInt(element.order_id) > max)
        max = element.order_id
    });
    return max + 1;
  }

  onAdd() {
    let obj = {
      order_id: this.calculateMax(this.orderList),
      purchased_on: this.newPurchase,
      deliver_to: this.newDeliver,
      status: this.newStatus
    }
    this.http.post('http://localhost:3000/order/add', obj).subscribe((status: any) => {
      this.orderList = status.result.orders
    }, (err) => {
      console.log("Error adding the order data")
      console.log('************************')
      console.log(err)
      console.log('************************')
    })
    $('#add-modal').modal('hide');
  }

  onDelete(value) {
      let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: value
      }
      this.http.delete('http://localhost:3000/order/delete', options).subscribe((status: any) => {
        this.orderList = status.result
      }, (err) => {
      console.log("Error deleting the order data")
      console.log('************************')
      console.log(err)
      console.log('************************')
      })
      $('#delete-modal').modal('hide')
  }
}
