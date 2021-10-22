import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {

  public numberChosen: number = 0;
  readonly numberPattern = /^[0-9]*$/
  public resultFinal: string = '';

  readonly strThree = 'Foo';
  readonly strFive = 'Bar';
  readonly strSeven = 'Qix';

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  /**
   * Update number and resultFinal
   * @param event event
   */
  public updateNumber(event: any): void {
    const controlNumb = this.numberPattern.test(event.value);
    if (event && event.value !== undefined && event.value && controlNumb === true) {
      this.resultFinal = '';
      this.numberChosen = Number(event.value);
      this.resultFinal += this.divisibleThree(this.numberChosen);
      this.resultFinal += this.divisibleFive(this.numberChosen);
      this.resultFinal += this.divisibleSeven(this.numberChosen);
      this.resultFinal += this.cutByNumber(this.numberChosen);
      if (this.resultFinal === '') {
        this.resultFinal = this.numberChosen.toString();
      }
      const dataSave = {
        number: this.numberChosen,
        result: this.resultFinal,
        step: 'one'
      };
      this.appService.saveHistory(dataSave);
    } else {
      this.numberChosen = 0;
      this.resultFinal = 'Errors occured';
    }
  }

  /**
   * divide by three, if the number is divisible by 3, return Foo
   * @param numb input number
   */
  public divisibleThree(numb: number): string {
    return numb > 0 && numb % 3 === 0 ? this.strThree : '';
  }

  /**
   * divide by five, if the number is divisible by 5, return Bar
   * @param numb input number
   */
  public divisibleFive(numb: number): string {
    return numb > 0 && numb % 5 === 0 ? this.strFive : '';
  }


  /**
   * divide by seven, if the number is divisible by 7, return Qix
   * @param numb input number
  */
  public divisibleSeven(numb: number): string {
    return numb > 0 && numb % 7 === 0 ? this.strSeven : '';
  }
  
  public cutByNumber(numb: number): string {
    const strNumb = numb.toString().split('');
    let res = '';
    strNumb.forEach(
      val => {
        switch (val) {
          case '3':
            res += this.strThree;
            break;
          case '5':
            res += this.strFive;
            break;
          case '7':
            res += this.strSeven;
            break;
        }
      }
    )
    return res;
  }

  public historyStepOne(): any {
    return this.appService.displayHistory('one');
  }

  public emptyHistory(): void {
    this.appService.emptyHistory();
  }

  public saveHistory(): void {
    //return this.appService.emptyHistory();
  }

}
