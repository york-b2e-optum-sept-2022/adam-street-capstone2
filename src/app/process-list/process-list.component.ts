import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {IProcess} from "../_interface/IProcess";

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit {

  processList: IProcess[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    console.log('process list on init running')
    const observable = this.httpService.getProcessList();
    observable.subscribe({
      next: (data) => {
        this.processList = data;
      },
      error: (err) => {
        console.error()
      }
    })
  }

}
