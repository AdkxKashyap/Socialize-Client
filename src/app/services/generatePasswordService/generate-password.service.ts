import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratePasswordService {

  constructor() { }

   generatePassword():any {
    return Math.random().toString(36).slice(2)
  }
}
