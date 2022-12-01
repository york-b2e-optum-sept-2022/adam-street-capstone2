import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProcess} from "./_interface/IProcess";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  createProcess(title: string) {
    const observable = this.httpClient.post<IProcess>("http://localhost:8080/api/process",
      {
        title: title
      }
    );

    observable.subscribe({
      next: (newProcess) => {
        console.log(newProcess);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  getProcessList() {
    const observable = this.httpClient.get<IProcess[]>("http://localhost:8080/api/process");
    return observable;
  }


}
