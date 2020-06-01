import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveLocal {

  constructor() { }

  save(key, value){
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.log('ERROR save localstorage', error);
      return false;
    }
  }

  get(key){
    return localStorage.getItem(key)
  }

  clear(key){
    try{
      localStorage.removeItem(key)
      return true;
    } catch (error) {
      return false;
    }
  }
}
