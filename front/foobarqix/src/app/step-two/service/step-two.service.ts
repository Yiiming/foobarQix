import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StepOneService } from 'src/app/step-one/service/step-one.service';

const CREATE_POST = gql`
	mutation CreateStepTwo($numbStep: Int!, $step: String!) {
		createStepTwo(numberStep: $numbStep, step: $step) {
			id
			numberStep
			stringStep
			step
		}
	}
`;

@Injectable({
  providedIn: 'root'
})
export class StepTwoService {

  readonly strThree = 'Foo';
  readonly strFive = 'Bar';
  readonly strSeven = 'Qix';
  readonly asterik = '*';

  constructor(private stepOneService: StepOneService, private appService: AppService, private apollo: Apollo) {

  }

  /**
   * Update number and resultFinal
   * @param event event
   */
  public sendUpdateNumber(val: number, step: string): string {
    const controlNumb = this.stepOneService.numberPattern.test(val.toString());
    let resultFinal = '';
    let numberChosen = val;
    if (val && val !== undefined && controlNumb === true) {
      
      resultFinal += this.stepOneService.divisibleThree(numberChosen);
      resultFinal += this.stepOneService.divisibleFive(numberChosen);
      resultFinal += this.stepOneService.divisibleSeven(numberChosen);
      resultFinal += this.cutByNumberAsterik(numberChosen);
      if (resultFinal === '' || resultFinal === '*') {
        resultFinal = numberChosen.toString();
        resultFinal = resultFinal.replace('0', this.asterik);
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

  private cutByNumberAsterik(numb: number): string {
    const strNumb = numb.toString().split('');
    let res = '';
    strNumb.forEach(
      val => {
        switch (val) {
          case '0':
            res += this.asterik;
            break;
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

  public createStepTwoDjango(numb: number, step="Two"): Observable<any> {
    return this.apollo.mutate(
      {
        mutation: CREATE_POST,
        variables: {
          numbStep: numb,
          step: step
        }
      }
    );
  }
}


