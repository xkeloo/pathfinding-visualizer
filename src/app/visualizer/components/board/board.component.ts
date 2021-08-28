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
  activeAlgorithm: string = this.algorithms[0];
  algorithmsListShowed: boolean = false; 
  dragActive: 'false' | 'initial' | 'destination' | 'clear' | 'block' = 'false';
  pathCalculated: boolean = false;
  animationsDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  visualize(): void {
    this.board.clearPath();
    console.log(AStar.calculatePath(this.board));
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

  toggleAlgoritmsList() {
    this.algorithmsListShowed = !this.algorithmsListShowed;
  }

  getNotActiveAlgorithms(): string[] {
    let list: string[] = new Array();
    for (let i = 0; i < this.algorithms.length; i++)
      if (this.algorithms[i].localeCompare(this.activeAlgorithm) != 0)
        list.push(this.algorithms[i]);
      return list;
  }
  
  setActiveAlgorithm(index: number) {
    this.activeAlgorithm = this.algorithms[index];
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
        if (node.type != 'destination' && node.type != 'wall') {
          if (node.type != 'initial') {
            this.board.setInitialNode(node.x, node.y);
            if (this.pathCalculated)
              this.visualize();
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
              this.visualize()
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
