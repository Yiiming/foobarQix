import { Component, OnInit } from '@angular/core';
import { StepOneService } from './service/step-one.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {

  public numberChosen: number = 0;
  readonly numberPattern = /^[0-9]*$/
  public resultFinal: string = '';
  public isEmpty = false;
  public readonly step = 'one';

  constructor(private stepOneService: StepOneService) { }

  ngOnInit(): void {
  }

  /**
   * Update number and resultFinal
   * @param event event
   */
  public updateNumber(event: any): void {
    if (event && event.value !== undefined) {
      this.resultFinal = this.stepOneService.sendUpdateNumber(event.value, this.step);
      this.isEmpty = false;
    }
  }

  public historyStepOne(): any {
    return this.stepOneService.historyStepOne(this.step);
  }

  public emptyHistory(): void {
    this.stepOneService.emptyHistory();
    this.isEmpty = true;
  }

  public saveHistory(): void {
    //return this.appService.emptyHistory();
  }

}
