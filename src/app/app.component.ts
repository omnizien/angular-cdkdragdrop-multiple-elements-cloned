import { Component, ViewChild, ElementRef } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDragStart, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
// https://upmostly.com/angular/using-lodash-with-angular
import {cloneDeep} from 'lodash';


export interface iBoardItem {
  name: string;
  top: number;
  left: number;
  z_index: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("divBoard") divBoard!: ElementRef;

  imagens_x = [
    {
      Imagem: "https://preview.ibb.co/kZGsLm/img8.jpg"
    },
    {
      Imagem: "https://preview.ibb.co/kPE1D6/clouds.jpg"
    },
    {
      Imagem: "https://angularbooks.com/img/angular4/img3.jpg"
    }
  ];



  bigList: iBoardItem[] = [
  ];

  bottomList = [
    { name: "One", top: 0, left: 0 },
    { name: "Two", top: 0, left: 0 },
    { name: "Three", top: 0, left: 0 }
  ];

  dragging(){

  }

  sortPredicate(index: number, item: CdkDrag<number>) {
    return (index + 1) % 2 === item.data % 2;
  }

  thing = false
  mar_left = 0
  mar_top = 0
  drop(event: CdkDragDrop<BoardItem[]>) {

    for (let i = 0; i < this.bigList.length; i++) {
      this.bigList[i].z_index = i + 1
      console.log(this.bigList[i].z_index = i + 1);
    }

    this.thing = true


    const itemRect = event.item.element.nativeElement.getBoundingClientRect();
    const top = Math.max(
      0,
      itemRect.top +
      event.distance.y -
      this.divBoard.nativeElement.getBoundingClientRect().top
    );
    const left = Math.max(
      0,
      itemRect.left +
      event.distance.x -
      this.divBoard.nativeElement.getBoundingClientRect().left

    );

    const isWithinSameContainer = event.previousContainer === event.container;

    let toIndex = event.currentIndex;
    console.log(event.container.sortingDisabled)

  
    if (event.container.sortingDisabled) {
      console.log("sorting disabled")
      const arr = event.container.data.sort((a, b) => a.top - b.top);

      const targetIndex = arr.findIndex(item => item.top > top);
      console.log(targetIndex)

      toIndex = targetIndex === -1 ? isWithinSameContainer ? arr.length - 1 : arr.length : targetIndex;
      // toIndex = 0
      console.log()
    }

    const item = event.previousContainer.data[event.previousIndex];
    item.top = top;
    item.left = left;

    if (isWithinSameContainer) {
   

      moveItemInArray(event.container.data, event.previousIndex, toIndex);
    

    } else {
      const clone = cloneDeep(event.previousContainer.data[event.previousIndex]);
      event.container.data.splice(event.currentIndex, 0, clone);
      console.log(this.bigList);
      // copyArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   toIndex
      // );
    }
  }

  dragEnd($event: CdkDragEnd) {
    console.log($event)


    // console.log(this.image_1.y)
    // this.xPosArr.push(this.image_1.x);
    // this.yPosArr.push(this.image_1.y);
    // // console.log(e.beforeTranslate[1])

    // this.moveable.request("draggable", { x: this.image_1.x }, true);
    // const target = e.target;
    // target.style.transform = `translate(${this.image_1.x}px, ${this.image_1.y}px)`;

  }

  dragStarted(event: CdkDragStart) {
    console.log('**')
  }

  dragEnded(event: CdkDragEnd) {
    console.log(`[ ::: dragEnded - X ]   ${event.dropPoint.x} ::: dragEnded - Y ]  ${event.dropPoint.y}   `)
    // this.bigList[0].left = event.dropPoint.x
    // this.bigList[0].top = event.dropPoint.y
    console.log(this.bigList)




  }

  dragMoved(event: CdkDragMove) {
    // console.log( ` Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`);
  }

}


// drop(event: CdkDragDrop<BoardItem[]>) {
//   if (event.previousContainer === event.container) {
//     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//   } else {
//     transferArrayItem(
//       event.previousContainer.data,
//       event.container.data,
//       event.previousIndex,
//       event.currentIndex,
//     );
//   }
// }
// }

export class BoardItem {
  name: string;
  top: number;
  left: number;


  constructor(name: string, top: number, left: number) {
    this.name = name;
    this.top = top;
    this.left = left;
  }
}

