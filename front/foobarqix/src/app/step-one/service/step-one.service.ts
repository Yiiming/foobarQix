import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root'
})
export class StepOneService {

  public numberChosen: number = 0;
  readonly numberPattern = /^[0-9]*$/

  readonly strThree = 'Foo';
  readonly strFive = 'Bar';
  readonly strSeven = 'Qix';

  constructor(private appService: AppService) { }

  /**
   * Update number and resultFinal
   * @param event event
   */
  public sendUpdateNumber(val: number, step: string): string {
    const controlNumb = this.numberPattern.test(val.toString());
    let resultFinal = '';
    let numberChosen = val;
    if (val && val !== undefined && controlNumb === true) {
      
      resultFinal += this.divisibleThree(numberChosen);
      resultFinal += this.divisibleFive(numberChosen);
      resultFinal += this.divisibleSeven(numberChosen);
      resultFinal += this.cutByNumber(numberChosen);
      if (resultFinal === '') {
        resultFinal = numberChosen.toString();
      }
      const dataSave = {
        number: numberChosen,
        result: resultFinal,
        step: step
      };
      this.appService.saveHistory(dataSave);
    } else {
      numberChosen = 0;
      resultFinal = 'Errors occured';
    }
    return resultFinal;
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
  
  private cutByNumber(numb: number): string {
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

  public historyStepOne(step: string): any {
    return this.appService.displayHistory(step);
  }

  public emptyHistory(): void {
    this.appService.emptyHistory();
  }

  public saveHistory(): void {
    //return this.appService.emptyHistory();
  }
}
