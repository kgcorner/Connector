import { FundService } from './../services/fund.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  _id: String;
  channel: any;
  created = false;
  message = "";
  constructor(private fundService: FundService) { }

  ngOnInit() {
  }

  setChannelId(value) {
    this._id = value;
  }

  setChannelData(value) {
    this.channel = value;
  }

  fetch() {
    this.channel.id = this._id;
    this.fundService.createChannel(this.channel).subscribe((res)=>{
      this.message = res.json();
      this.created = true;
    },err=>{
      console.log(err);
    })
  }
}
