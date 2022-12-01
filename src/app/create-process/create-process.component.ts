import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrls: ['./create-process.component.css']
})
export class CreateProcessComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  title: string = "";

  ngOnInit(): void {
  }

  onClick() {
    console.log('button clicked')
    this.httpService.createProcess(this.title)
  }

}
