import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MergeSortService {

  constructor() { 
  }

  getMergeSortAnimations(arr) {
    const animations: number[] = [];
    if (arr.length <= 1) return arr;
    // duplicate the main array
    const auxiliaryArray = [...arr];
    this.mergeSortHelper(arr, 0, arr.length - 1, auxiliaryArray, animations);

    return animations;
  }

  mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    this.mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    this.mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    this.doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }

  doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }

    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
    return animations;
  }

}
