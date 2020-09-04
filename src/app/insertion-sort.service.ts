import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class InsertionSortService {

  constructor() { }

   insertionSortHelper(arr, animations) {
    for (let i = 1; i < arr.length; i++) {
      const cursor = arr[i];
      let j = i-1;
      // shift elements with larger values to the right until arr[j] > cursor
      while (j>= 0 && arr[j] > cursor) {
        arr[j+1] = arr[j];
          
        animations.push({idx: [j+1, j]});
        animations.push({idx: [j+1, j]});
        animations.push({idx: [j, arr[j+1]], swap: true});

        j -= 1;
      }
      // put the cursor value on the right side of the array
      arr[j + 1] = cursor;
      // animations.push({idx: [j+1, i]});
      // animations.push({idx: [j+1, i]});
      // animations.push({idx: [i, arr[j+1]], swap: false, cursor: true});
    }
    return animations;
  }

}
