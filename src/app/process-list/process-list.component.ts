import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProcess} from "../_interface/IProcess";
import {ProcessService} from "../process.service";
import {first, Subscription} from "rxjs";
import {HttpService} from "../http.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProcessEditorComponent} from "../process-editor/process-editor.component";

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit, OnDestroy {

  processList: IProcess[] = [];
  subscription: Subscription;

  constructor(private httpService: HttpService, private processService: ProcessService, private modalService: NgbModal) {
    this.subscription = this.processService.$processList.subscribe(
      (processList) => {
        this.processList = processList;
      }
    )
  }

  onUpdate(process: IProcess) {
    const modalRef = this.modalService.open(ProcessEditorComponent)
    modalRef.componentInstance.process = {...process};
    modalRef.componentInstance.onCloseFn = () => {
      modalRef.close();
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(processToDelete: IProcess) {
    if (!processToDelete.id) {
      return;
    }

    const observable = this.httpService.deleteProcess(processToDelete.id);
    observable.pipe(first()).subscribe({
      next: () => {
        let processList = [...this.processService.$processList.getValue()];
        processList = processList.filter(
          (currentProcess) => {
            return currentProcess.id !== processToDelete.id
          }
        )

        this.processService.$processList.next(processList);
      },
      error: (error) => {
        // TODO - deal with the error (display something to the user)
        console.error(error);
      }
    })
  }
}
