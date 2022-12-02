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

  errorText: string = "";
  multipleChoiceOption: string = "";

  constructor(private httpService: HttpService, private processService: ProcessService) {
  }

  ngOnInit(): void {
    this.sortStageList();
  }

  sortStageList() {
    this.process.stageList.sort(
      (a, b) => {
        return a.index - b.index
      }
    );

    console.log(this.process.stageList);
  }

  onMoveStageUp(currentPosition: number) {

    if (currentPosition === 0) {
      return
    }

    const removedStageList = this.process.stageList.splice(currentPosition, 1);
    this.process.stageList.splice(currentPosition - 1, 0, removedStageList[0]);

    let counter = 0;
    for(let stage of this.process.stageList) {
      stage.index = counter;
      counter += 1;
    }
  }

  onMoveStageDown(currentPosition: number) {

    if (currentPosition === this.process.stageList.length - 1) {
      return
    }

    const removedStageList = this.process.stageList.splice(currentPosition, 1);
    this.process.stageList.splice(currentPosition + 1, 0, removedStageList[0]);

    let counter = 0;
    for(let stage of this.process.stageList) {
      stage.index = counter;
      counter += 1;
    }
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
    if (this.multipleChoiceOption.length === 0) {
      this.errorText = `Process stage ${stage.index + 1} is set to multiple choice, each option must have text`
      return;
    }

    stage.optionList.push(this.multipleChoiceOption);
    this.multipleChoiceOption = "";
  }

  onRemoveMultipleChoiceOptionFromStage(stage: IStage, index: number) {
    stage.optionList.splice(index, 1);
  }

  onStageResponseTypeChange(stage: IStage, selectedResponseType: string) {
    const responseType = parseInt(selectedResponseType);
    if (isNaN(responseType)) {
      console.error("unable to convert selectedResponseType to number");
      return;
    }

    stage.responseType = responseType;
  }

  onCloseError() {
    this.errorText = "";
  }

  onSave() {

    // validate the request

    // validate title is not empty
    if (this.process.title.length === 0) {
      this.errorText = "Process title must not be empty"
      return;
    }

    // validate stage list is not empty
    if (this.process.stageList.length === 0) {
      this.errorText = "Process stage list must not be empty"
      return;
    }

    // look at each stage
    for (const stage of this.process.stageList) {

      // validate stage text is not empty
      if (stage.text.length === 0) {
        this.errorText = `Process stage ${stage.index + 1} text must not be empty`
        return;
      }

      // look at the options list if the stage's response type is 3 (mc)
      console.log(stage.responseType)

      if (stage.responseType === 3) {

        console.log('inside if statement')

        // validate option list is not empty
        if (stage.optionList.length === 0) {
          this.errorText = `Process stage ${stage.index + 1} is set to multiple choice, and must have at least 1 option`
          return;
        }

        // look at each option
        for (let option of stage.optionList) {

          // option text is not empty
          if (option.length === 0) {
            this.errorText = `Process stage ${stage.index + 1} is set to multiple choice, each option must have text`
            return;
          }
        }
      }
    }

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
