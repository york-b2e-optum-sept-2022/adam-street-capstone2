import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProcess} from "./_interface/IProcess";
import {Observable} from "rxjs";
import {ProcessService} from "./process.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  createProcess(process: IProcess) {
    const observable = this.httpClient.post<IProcess>("http://localhost:8080/api/process", process);
    return observable;
  }

  getProcessList() {
    const observable = this.httpClient.get<IProcess[]>("http://localhost:8080/api/process");
    return observable;
  }

  deleteProcess(id: number) {
    const observable = this.httpClient.delete("http://localhost:8080/api/process?id=" + id);
    return observable;
  }

  updateProcess(process: IProcess) {
    const observable = this.httpClient.put<IProcess>("http://localhost:8080/api/process", process);
    return observable;
  }


}
