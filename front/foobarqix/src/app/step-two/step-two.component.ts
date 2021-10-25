import { Component, OnInit, ViewChild } from '@angular/core';
import { StepOneService } from '../step-one/service/step-one.service';
import { StepTwoService } from './service/step-two.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {

  public numberChosen: number = 0;
  readonly numberPattern = /^[0-9]*$/
  public resultFinal: string = '';
  public isEmpty = false;
  public readonly step = 'two';
  public isDjango = false;
  public dataFromDjango = [];
  public resultFinalDjango = '';
  public numberChosenDjango: number = 0
  @ViewChild("numbFormDjango") numbFormDjango!: any

  constructor(private stepOneService: StepOneService, private stepTwoService: StepTwoService) { }

  ngOnInit(): void {
  }

  /**
   * Update number and resultFinal
   * @param event event
   */
  public updateNumber(event: any): void {
    if (event && event.value !== undefined) {
      const valData = event.value;
      if (this.isDjango && this.stepOneService.controlPatternNumber(valData)) {
        this.stepTwoService.createStepTwoDjango(valData).subscribe(
          ({ data }) => {
            if (data && data !== undefined) {
              this.resultFinalDjango = data['createStep'] && data['createStep']['stringStep'] ? data['createStep']['stringStep'] : '';
              this.reload();
            }
          }
        )
      } else {
        this.resultFinal = this.stepTwoService.sendUpdateNumber(valData, this.step);
        this.isEmpty = false;
      }
    }
  }

  public historyStepOne(): any {
    return this.stepOneService.historyStepOne(this.step);
  }

  public emptyHistory(): void {
    this.stepOneService.emptyHistory();
    this.isEmpty = true;
  }

  public reload(): void {
    if (this.isDjango) {
      this.stepOneService.reloadData().subscribe(
        ({ data }) => {
          const dataList: [] = data["steps"];
          this.dataFromDjango = dataList.filter(x => x['step'] === 'Two');
        }
      )
    }
  }

  public sendToDjango(event:any) {
    if (this.numbFormDjango) {
      this.updateNumber(this.numbFormDjango);
    }
  }

}
