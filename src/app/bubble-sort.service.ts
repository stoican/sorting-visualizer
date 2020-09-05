import { Injectable } from '@angular/core';
import { DataService } from './data.service'

@Injectable({
  providedIn: 'root'
})
export class BubbleSortService {

  constructor(private dataService: DataService) { 
  }


  bubbleSortHelper(arr, animations) {
    for (let i = 0; i < arr.length - 1; i++) {
      let swapped = false;
      for (let j = 0; j < arr.length - i - 1; j++) {

        if (arr[j] > arr[j + 1]) {
          // swap the elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          // push the index of the two elements to represent comparison
          animations.push({ idx: [j, j + 1] });
          animations.push({ idx: [j, j + 1] });
          // push the index and value of swapped element
          animations.push({ idx: [j + 1, arr[j]], swap: true });
          swapped = true;
        } else {
          // push the index of the two elements to represent comparison
          animations.push({ idx: [j, j + 1] });
          animations.push({ idx: [j, j + 1] });
          animations.push({ idx: [j + 1, arr[j]], swap: false });
        }

      }

      if(!swapped) {
        break;
      }
    }
    return animations;
  }
}
