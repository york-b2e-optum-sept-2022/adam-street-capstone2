import {Component, Input, OnInit} from '@angular/core';
import {IProcess, IStage} from "../_interface/IProcess";
import {HttpService} from "../http.service";
import {ProcessService} from "../process.service";
import {first} from "rxjs";

@Component({
  selector: 'app-process-editor',
  templateUrl: './process-editor.component.html',
  styleUrls: ['./process-editor.component.css']
})
export class ProcessEditorComponent implements OnInit {

  // PROCESS: FOO
  /*  foo = {
      id: 10,
      title: "my title",
      stageList: [
        {text: ""}
      ]
    }*/

  @Input() process!: IProcess;
  @Input() onCloseFn!: Function;

  multipleChoiceOption: string = "";

  constructor(private httpService: HttpService, private processService: ProcessService) {
  }

  ngOnInit(): void {
    this.process.stageList.sort(
      (a, b) => {
          return a.index - b.index
      }
    );
  }

  onAddStage() {
    this.process.stageList.push(
      {text: "", index: this.process.stageList.length, responseType: 1, optionList: []}
    )
  }

  onRemoveStage(index: number) {
    this.process.stageList.splice(index, 1);
  }

  onAddMultipleChoiceOptionToStage(stage: IStage) {
    stage.optionList.push(this.multipleChoiceOption);
    this.multipleChoiceOption = "";
  }

  onRemoveMultipleChoiceOptionFromStage(stage: IStage, index: number) {
    stage.optionList.splice(index, 1);
  }

  onSave() {

    if (this.process.id === undefined) {
      // NEW PROCESS
      const observable = this.httpService.createProcess(this.process);
      observable.pipe(first()).subscribe({
          next: (newProcess) => {
            console.log(newProcess);

            const processList = [...this.processService.$processList.getValue()];
            processList.push(newProcess);

            this.processService.$processList.next(processList);
          },
          error: (error) => {
            console.error(error);
          }
        }
      );
    } else {
      // EXISTING PROCESS
      const observable = this.httpService.updateProcess(this.process);
      observable.pipe(first()).subscribe({
        next: (updatedProcess) => {
          let processList = [...this.processService.$processList.getValue()];
          processList = processList.map(
            (process) => {
              if (process.id === this.process.id) {
                return updatedProcess
              }
              return process
            }
          );

          this.processService.$processList.next(processList);
          this.onCloseFn();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }

  }
}
