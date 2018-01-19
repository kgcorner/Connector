import { FundService } from './../services/fund.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  _id: String;
  request: any;
  constructor(private fundService: FundService) { }

  ngOnInit() {
  }

  setId(value) {
    this._id = value;
  }

  fetch() {
    this.fundService.fetchRequest(this._id).subscribe((res)=>{
      this.request = res.json();
    },err=>{
      console.log(err);
    })
  }
}
