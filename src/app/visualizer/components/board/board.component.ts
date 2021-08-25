import { Component, OnInit } from '@angular/core';
import { DijkstrasAlgorithm } from '../../models/algorithms/pathfinding/dijkstrasAlghorithm';
import { Board } from '../../models/board';
import { Node } from '../../models/node';
import { BoardAnimations } from './board.animations';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [BoardAnimations.nodeType]
})
export class BoardComponent implements OnInit {
  board = new Board(40, 17);

  dragActive: 'false' | 'initial' | 'destination' | 'clear' | 'block' = 'false';
  pathCalculated: boolean = false;
  animationsDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  visualize(): void {
    this.board.clearPath();
    console.log(DijkstrasAlgorithm.calculatePath(this.board, this.board.getNodeList().indexOf(this.board.getInitalNode()), this.board.getNodeList().indexOf(this.board.getDestinationNode())));
    this.pathCalculated = true;
    this.animationsDisabled = true;
  }

  clearBoard() {
    this.board.clearBoard();
    this.pathCalculated = false;
  }

  clearPath() {
    this.board.clearPath();
    this.pathCalculated = false;
  }

  toggleDiagonalEdges() {
    this.board.diagonalEdges = !this.board.diagonalEdges;
    if(this.pathCalculated)
      this.visualize();
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
      else if(node.type == 'open' && !this.pathCalculated) {
        node.setWall();
        this.dragActive = "block";
      }
    }   
    else if(event.buttons == 2 && node.type == 'wall' && !this.pathCalculated) {
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
            this.visualize();
        }
        else
          this.dragActive = 'false';
        break;

      case 'destination':
        if(node.type != 'initial' && node.type != 'wall') {
          this.board.setDestinationNode(node.x, node.y);
          if (this.pathCalculated)
            this.visualize()
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
