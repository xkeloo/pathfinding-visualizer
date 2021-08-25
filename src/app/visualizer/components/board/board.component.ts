import { Component, OnInit } from '@angular/core';
import { DijkstrasAlgorithm } from '../../models/algorithms/dijkstrasAlghorithm';
import { Board } from '../../models/board';
import { Node } from '../../models/node';
import { BoardAnimations } from './board.animations';
import { animation, style, animate, trigger, transition, useAnimation, state } from '@angular/animations';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [BoardAnimations.nodeType]
})
export class BoardComponent implements OnInit {
  board = new Board(30, 12);

  dragActive: 'false' | 'initial' | 'destination' | 'clear' | 'block' = 'false';
  pathCalculated: boolean = false;
  animationsDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  run(): void {
    console.log('XD')
    this.board.resetVisitedNodes();
    console.log(DijkstrasAlgorithm.calculatePath(this.board, this.board.getNodeList().indexOf(this.board.getInitalNode()), this.board.getNodeList().indexOf(this.board.getDestinationNode())));
    this.pathCalculated = true;
   // this.animationsDisabled = true;
  }

  contextMenuDisable(event: MouseEvent) {
    event.preventDefault();
  }

  onMouseDown(event: MouseEvent, node: Node) {
    event.preventDefault();
    if(event.buttons == 1){
      if(node.type == 'initial')
        this.dragActive = 'initial'
      else if(node.type == 'destination')
        this.dragActive = 'destination'
      else if(node.type == 'open') {
        node.setWall();
        this.dragActive = "block";
      }
    }   
    else if(event.buttons == 2 && node.type == 'wall') {
      node.clearWall();
      this.dragActive = 'clear';
    }
  }

  onMouseMove(event: MouseEvent, node: Node) {
    event.preventDefault();
    switch(this.dragActive) {
      case 'false': break;

      case 'initial': 
        if(node.type != 'destination' && node.type != 'wall') {
          this.board.setInitialNode(node.x, node.y);
          if (this.pathCalculated)
            this.run();
        }
        else
          this.dragActive = 'false';
        break;

      case 'destination':
        if(node.type != 'initial' && node.type != 'wall') {
          this.board.setDestinationNode(node.x, node.y);
          if (this.pathCalculated)
            this.run()
        }
        else
          this.dragActive = 'false';
        break;

      case 'block':
        if(event.buttons == 1 && node.type == 'open')
          node.setWall();
        break;
        
      case 'clear':
        if(event.buttons == 2 && node.type == 'wall')
          node.clearWall();
        break;
    }
  }

  onMouseUp(event: MouseEvent, node: Node) {
    event.preventDefault();
    if (this.dragActive != 'false'){
      this.dragActive = 'false'

    }

  }

  onMouseLeave() {
    this.dragActive = 'false';
  }


}
