import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MergeSortService } from '../merge-sort.service';
import { BubbleSortService } from '../bubble-sort.service';
import { InsertionSortService } from '../insertion-sort.service'
import { IAnimation } from '../interfaces'; 

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  array: number[] = [];
  ANIMATION_SPEED_MS: number;
  PRIMARY_COLOR: string;
  SECONDARY_COLOR: string;

  ngOnInit(): void {
    this.array = this.dataService.createArray();
    this.ANIMATION_SPEED_MS = this.dataService.getAnimationSpeed();
    this.PRIMARY_COLOR = this.dataService.getPrimaryColor();
    this.SECONDARY_COLOR = this.dataService.getSecondaryColor();
  }

  constructor(public dataService: DataService, 
    private mergeSortService: MergeSortService, 
    private bubbleSortService : BubbleSortService,
    private insertionSortService: InsertionSortService) { }

  create() {
      this.array = this.dataService.createArray(Math.floor(this.dataService.ARRAY_SIZE));
  }

  onRangeChange() {
    this.array = this.dataService.createArray(Math.floor(this.dataService.ARRAY_SIZE));
  }

  onSpeedChange(value) {
    this.ANIMATION_SPEED_MS = value * -1;
  }

  mergeSort() {
    // clone the main array
    const arr = [...this.array];
    // get the animations of sorted array
    const animations = this.mergeSortService.getMergeSortAnimations(arr);
    // disable buttons while sorting
    this.dataService.buttonsStateSwitcher(this.ANIMATION_SPEED_MS, animations.length);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = this.container.nativeElement.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? this.SECONDARY_COLOR : this.PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight / 7 }%`;
        }, i * this.ANIMATION_SPEED_MS);
      }
    }
  }

  bubbleSort() {
    // clone the main array
    const arr = [...this.array]
    const animations: IAnimation[] = [];
    console.log(this.ANIMATION_SPEED_MS)
    // do sorting and get animations array
    this.bubbleSortService.bubbleSortHelper(arr, animations);
    // temporary disable all buttons
    this.dataService.buttonsStateSwitcher(this.ANIMATION_SPEED_MS, animations.length);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = this.container.nativeElement.getElementsByClassName('array-bar');
      const swapped = i % 3 !== 2;
      if (swapped) {
        const [barOneIdx, barTwoIdx] = animations[i].idx;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? this.SECONDARY_COLOR : this.PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.ANIMATION_SPEED_MS);
      } else if (animations[i].swap) {
        setTimeout(() => {
          // swap the bars
          [
            arrayBars[animations[i].idx[0]].style.height,
            arrayBars[animations[i].idx[0] - 1].style.height
          ] = [
            arrayBars[animations[i].idx[0] - 1].style.height,
            arrayBars[animations[i].idx[0]].style.height
          ];
          
        }, i * this.ANIMATION_SPEED_MS);
      }
    }
  }


  insertionSort() {
    const arr = [...this.array];
    const animations: IAnimation[] = [];
    this.insertionSortService.insertionSortHelper(arr, animations);
    console.log(animations[0].idx)
    this.dataService.buttonsStateSwitcher(this.ANIMATION_SPEED_MS, animations.length);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = this.container.nativeElement.getElementsByClassName('array-bar');
      const swapped = i % 3 !== 2;
      if (swapped) {
        const [barOneIdx, barTwoIdx] = animations[i].idx;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? this.dataService.SECONDARY_COLOR : this.dataService.PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.ANIMATION_SPEED_MS);
      } else if(animations[i].swap) {
          // swap the elements
          setTimeout(() => {            
            [
              arrayBars[animations[i].idx[0]].style.height, 
              arrayBars[animations[i].idx[0] + 1].style.height
            ] = [
              arrayBars[animations[i].idx[0] + 1].style.height,
              arrayBars[animations[i].idx[0]].style.height
            ];
            
          }, i * this.ANIMATION_SPEED_MS);
      }
    }
  }
}
