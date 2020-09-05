import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  array: number[]  = [];
  ANIMATION_SPEED_MS = 25;
  ARRAY_SIZE = 40;
  PRIMARY_COLOR = '#009688';
  SECONDARY_COLOR = '#ffd740';
  isFinished = true;
  isSorted = false;

  constructor() { }

  createArray(size: number = this.ARRAY_SIZE): number[] {
    this.array = [];
    for (let i = 0; i < size; i++) {
      this.array.push(this.randomNum(5, 700));
    }
    return this.array;
  }

  randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } 

  buttonsStateSwitcher(speed: number, multiplier: number): void {
    this.isFinished = false;
    this.isSorted = true;
    setTimeout(()=> {
      this.isFinished = true;
    }, speed * multiplier);
  }

  getArraySize(): number {
    return this.ARRAY_SIZE;
  }

  getAnimationSpeed(): number {
    return this.ANIMATION_SPEED_MS;
  }

  getPrimaryColor(): string {
    return this.PRIMARY_COLOR;
  }
  
  getSecondaryColor(): string {
    return this.SECONDARY_COLOR;
  }

  getIsSorted(): boolean {
    return this.isSorted;
  }

  setIsSorted(flag): void {
    this.isSorted = flag;
  }

  getIsFinished(): boolean {
    return this.isFinished;
  }
}
