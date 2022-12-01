import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IProcess} from "./_interface/IProcess";
import {BehaviorSubject, first} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  $processList = new BehaviorSubject<IProcess[]>([]);


  constructor(private httpService: HttpService) {
    const observable = this.httpService.getProcessList();
    observable.pipe(first()).subscribe({
      next: (processList) => {
        console.log(processList);
        this.$processList.next(processList)
      },
      error: (err) => {
        console.error()
      }
    });
  }

}
