import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  array: number[]  = [];
  ANIMATION_SPEED_MS = 35;
  ARRAY_SIZE = 30;
  PRIMARY_COLOR = '#009688';
  SECONDARY_COLOR = '#ffd740';
  finished = true;

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
    this.finished = false;
    setTimeout(()=> {
      this.finished = true;
    }, speed * multiplier);
  }

  getFinished(): boolean {
    return this.finished;
  }

  getSecondaryColor(): string {
    return this.SECONDARY_COLOR;
  }

  getPrimaryColor(): string {
    return this.PRIMARY_COLOR;
  }

  getArraySize(): number {
    return this.ARRAY_SIZE;
  }

  getAnimationSpeed(): number {
    return this.ANIMATION_SPEED_MS;
  }

}
