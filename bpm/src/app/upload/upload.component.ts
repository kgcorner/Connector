import { FundService } from './../services/fund.service';
import { Component, OnInit } from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  file:any;
  description:String;
  rFund: Number;
  mode= "upload";
  request: any;
  constructor(private fundService: FundService) { this.mode = "upload";}

  ngOnInit() {
  }

  setDescription(val) {
    this.description = val;
  }

  setFund(val) {
    this.rFund = val;
  }

  setFile(val) {
    this.file = val[0];
  }

  upload(files) {
    console.log(files);
    this.file = files;
  }
  submit(){    
    console.log("Uploading");
    console.log("Description:"+ this.description);
    console.log("Requested Fund:"+ this.rFund);
     this.fundService.submitRequest(this.description, this.rFund, this.file).subscribe((res)=>{
      if(res instanceof HttpResponse) {
        this.mode = "info";
        this.request = res.body;
        console.log(res.body);
      }
    },err=>{
      console.log(err);
    })
  }
}
