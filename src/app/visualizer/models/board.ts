import { Node } from "./node";

export class Board {
    nodes: Node[][] = [];
    diagonalEdges: boolean = true;
    initialNodeCoords: {x: number, y:number};
    destinationNodeCoords: {x: number, y:number};

    constructor(public width: number, public height: number) {
        for (let y = 0; y < this.height; y++) {
            this.nodes[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.nodes[y][x] = new Node(x, y);
            }
        }

        this.initialNodeCoords = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};        
        do {
            this.destinationNodeCoords = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
        } while (this.initialNodeCoords.x == this.destinationNodeCoords.x && this.initialNodeCoords.y == this.destinationNodeCoords.y);

        this.setInitialNode(this.initialNodeCoords.x, this.initialNodeCoords.y);
        this.setDestinationNode(this.destinationNodeCoords.x, this.destinationNodeCoords.y);


    }
    
    getNode(x: number, y: number): Node {
        return this.nodes[y][x];
    }

    getNodeList(): Node[] {
        let list: Node[] = new Array() 
        for (let y = 0; y < this.height; y++) 
            for (let x = 0; x < this.width; x++) 
                list.push(this.nodes[y][x]);
        return list;
    }

    clearBoard(): void {
        for (let y = 0; y < this.height; y++) 
            for (let x = 0; x < this.width; x++)
                this.nodes[y][x].type = 'open';

        this.getInitalNode().type = 'initial';
        this.getDestinationNode().type = 'destination';
    }

    clearPath(): void {
        this.getNodeList().forEach(node => {
            if(node.type == 'path' || node.type == 'checked')
                node.type = 'open';
        });
    }

    getInitalNode(): Node {
        return this.getNode(this.initialNodeCoords.x, this.initialNodeCoords.y);
    }

    getDestinationNode(): Node {
        return this.getNode(this.destinationNodeCoords.x, this.destinationNodeCoords.y);
    }

    setInitialNode(x: number, y: number) {
        this.getNode(this.initialNodeCoords.x, this.initialNodeCoords.y).type = 'open';
        this.initialNodeCoords = {x: x, y: y};
        this.getNode(x, y).type = 'initial';
    }

    setDestinationNode(x: number, y: number) {
        this.getNode(this.destinationNodeCoords.x, this.destinationNodeCoords.y).type = 'open';
        this.destinationNodeCoords = {x: x, y: y};
        this.getNode(x, y).type = 'destination';
    }

    getEdgeWeight(node1: Node, node2: Node): number {
        if (node1.type == 'wall' || node2.type == 'wall') return 0;

        let deltaX = node1.x - node2.x;
        let deltaY = node1.y - node2.y;
        
        if (deltaX == 0 && (deltaY == -1 || deltaY == 1)) return 1;

        if (deltaY == 0 && (deltaX == -1 || deltaX == 1)) return 1;

        //right now if there are walls placed diagonally crossing the potential path algorithm still will go through 
        if (this.diagonalEdges && (deltaX == -1 || deltaX == 1) && (deltaY == -1 || deltaY == 1)) return 1.4142;

        return 0;
    }

    
}