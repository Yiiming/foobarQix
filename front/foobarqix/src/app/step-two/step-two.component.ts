import { Component, OnInit } from '@angular/core';
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

  constructor(private stepOneService: StepOneService, private stepTwoService: StepTwoService) { }

  ngOnInit(): void {
  }

  /**
   * Update number and resultFinal
   * @param event event
   */
  public updateNumber(event: any): void {
    if (event && event.value !== undefined) {
      this.resultFinal = this.stepTwoService.sendUpdateNumber(event.value, this.step);
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
