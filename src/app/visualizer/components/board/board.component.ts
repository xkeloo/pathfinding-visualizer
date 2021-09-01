import { Component, OnInit } from '@angular/core';
import { AStar } from '../../models/algorithms/pathfinding/AStar';
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

  algorithms: string[] = new Array("Dijsktra's algorithm", "A* algorithm");
  activeAlgorithm: number = 0;
  algorithmsListShowed: boolean = false; 
  dragActive: 'false' | 'initial' | 'destination' | 'clear' | 'block' = 'false';
  calculating: boolean = false;
  pathCalculated: boolean = false;
  animationsDisabled: boolean = false;
  algorithmDelay: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  visualize(delay: number): void {
    if (this.calculating) return;
    
    if (this.pathCalculated)
      this.board.clearPath();
    
    this.calculating = true;

    if (delay != 0)
      this.animationsDisabled = false;

    let result;
    switch(this.activeAlgorithm) {
      case 0: result = DijkstrasAlgorithm.calculatePath(this.board, delay); break;
      case 1: result = AStar.calculatePath(this.board, delay); break;
      default: result = new Promise(resolve => resolve('done')); break;
    }
    result.then(value => {
      this.calculating = false
      this.pathCalculated = true;
      this.animationsDisabled = true;
      console.log(this.calculating)
    });
  }

  clearBoard() {
    if (this.calculating) return;
    this.board.clearBoard();
    this.pathCalculated = false;
    this.animationsDisabled = false;
  }

  clearPath() {
    if (this.calculating) return;
    this.board.clearPath();
    this.pathCalculated = false;
    this.animationsDisabled = false;
  }

  toggleDiagonalEdges() {
    this.board.diagonalEdges = !this.board.diagonalEdges;
    if(this.pathCalculated)
      this.visualize(this.algorithmDelay);
  }

  toggleAlgoritmsList() {
    if (this.calculating) return;
    this.algorithmsListShowed = !this.algorithmsListShowed;
  }
  
  setActiveAlgorithm(index: number) {
    this.activeAlgorithm = index;
    
    if (this.pathCalculated) {
      this.algorithmsListShowed = !this.algorithmsListShowed;
      this.visualize(this.algorithmDelay);
    }
  }

  contextMenuDisable(event: MouseEvent) {
    event.preventDefault();
  }

  onMouseDown(event: MouseEvent, node: Node) {
    event.preventDefault();
    if (this.calculating) return;
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
    if (this.calculating) return;
    switch(this.dragActive) {
      case 'false': break;

      case 'initial': 
        if (node.type != 'destination' && node.type != 'wall') {
          if (node.type != 'initial') {
            this.board.setInitialNode(node.x, node.y);
            if (this.pathCalculated)
              this.visualize(0);
          }
        }
        else
          this.dragActive = 'false';
        break;

      case 'destination':
        if (node.type != 'initial' && node.type != 'wall') {
          if (node.type != 'destination') {
            this.board.setDestinationNode(node.x, node.y);
            if (this.pathCalculated)
              this.visualize(0)
          }
        }
        else
          this.dragActive = 'false';
        break;

      case 'block':
        if (event.buttons == 1 && node.type == 'open')
          node.setWall();
        break;
        
      case 'clear':
        if (event.buttons == 2 && node.type == 'wall')
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
