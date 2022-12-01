import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProcessEditorComponent} from "./process-editor/process-editor.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'editor-fe';

  constructor(private modalService: NgbModal) {
  }

  onCreateProcess() {
    const modalRef = this.modalService.open(ProcessEditorComponent);

    modalRef.componentInstance.process = {
      title: "",
      stageList: []
    }

    modalRef.componentInstance.onCloseFn = () => {
      modalRef.close();
    }
  }
}
