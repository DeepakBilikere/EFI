import { Component, OnInit, Input } from '@angular/core';
import { OrderActivateService } from '../services/order-activate.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input('data') data;
  constructor(private orderActivate: OrderActivateService) { }

  ngOnInit() {
  }

  viewClick(event) {
    console.log('>>>>>>>>> View Click >>>>>>>>>')
    
  }

  editClick(event) {
    console.log('******** Edit Click *********')
    this.orderActivate.onEditClick(this.data);
  }

  deleteClick(event) {
    console.log('******** Delete Click *********')
    console.log('&&&&&&&&&&&&&')
    console.log(this.data)
    console.log('&&&&&&&&&&&&&')
    this.orderActivate.onDeleteClick(this.data);
  }

}
