export interface IProcess {
  id?: number,
  title: string,
  stageList: IStage[]
}

export interface IStage {
  id?: number,
  text: string,
  index: number,
  responseType: number,
  optionList: string[]
}
