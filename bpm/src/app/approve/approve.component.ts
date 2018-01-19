import { FundService } from './../services/fund.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  _id: Number;
  _amount: Number;
  request: any;
  approved = false;
  constructor(private fundService: FundService) { }

  ngOnInit() {
    this.request= {};
  }

  setId(value) {
    this._id = value;
  }

  submit() {
    this.fundService.fetchRequest(this._id).subscribe((res)=>{
      this.request = res.json();
    },err=>{
      console.log(err);
    })
  }

  setApproveFund(value) {
    this._amount = value;
  }

  approve() {
    this.fundService.approveRequest(this._id, this._amount).subscribe((res)=>{
      this.approved = true;
      this.request = res.json();
    },err=>{
      console.error(err);
    })
  }
}
