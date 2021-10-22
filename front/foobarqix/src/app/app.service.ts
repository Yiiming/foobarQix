import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  /**
   * Sauvegarde l'historique en sessionStorage
   */
  public saveHistory(res: any): void {
    const dataSession = sessionStorage.getItem('saveHistory') ? sessionStorage.getItem('saveHistory') : '';
    let tableInsert = [];
    if (dataSession && dataSession !== '') {
      tableInsert = JSON.parse(dataSession);
      tableInsert.push(res);
    } else {
      tableInsert.push(res);
    }
    sessionStorage.setItem('saveHistory', JSON.stringify(tableInsert));
  }

  public displayHistory(step: string): any {
    const dataSession = sessionStorage.getItem('saveHistory') ? sessionStorage.getItem('saveHistory') : '';
    if (dataSession && dataSession !== '') {
      const tableDataSession: [] = JSON.parse(dataSession);
      const response = tableDataSession.filter(data => data && data['step'] && data['step'] ? data['step'] === step : false);
      return response;
    } else {
      return 'No data';
    }
  }

  public emptyHistory() {
    sessionStorage.removeItem('saveHistory');
  }
}
