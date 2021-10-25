import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StepOneService } from './service/step-one.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {

  public numberChosen: number = 0;
  public numberChosenDjango: number = 0;
  readonly numberPattern = /^[0-9]*$/
  public resultFinal: string = '';
  public resultFinalDjango: string = '';
  public isEmpty = false;
  public readonly step = 'one';
  public isDjango = false;
  public dataFromDjango = [];

  @ViewChild("numbFormDjango") numbFormDjango!: any

  constructor(private stepOneService: StepOneService) { }

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
        this.stepOneService.createStepOneDjango(valData).subscribe(
          ({ data }) => {
            if (data && data !== undefined) {
              this.resultFinalDjango = data['createStep'] && data['createStep']['stringStep'] ? data['createStep']['stringStep'] : '';
              this.reload();
            }
          }
        )
      } else {
        this.resultFinal = this.stepOneService.sendUpdateNumber(valData, this.step);
        this.isEmpty = false;
      }
    }
  }

  public historyStepOne(): any {
    return this.stepOneService.historyStepOne(this.step);
  }

  public emptyHistory(): void {
    if (this.isDjango) {
      this.stepOneService.deleteStepOne();
      this.dataFromDjango = [];
    } else {
      this.stepOneService.emptyHistory();
      this.isEmpty = true;
    }
  }

  public reload() {
    if (this.isDjango) {
      this.stepOneService.reloadData().subscribe(
        ({ data }) => {
          const dataList: [] = data["steps"];
          this.dataFromDjango = dataList.filter(x => x['step'] === 'One');
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
