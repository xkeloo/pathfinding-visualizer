export class Node {
    type: 'open'| 'visited' | 'path' | 'wall' | 'initial' | 'destination' = 'open';

    constructor(public x: number, public y: number) {

    }

    setWall() {
        if (this.type == 'open')
            this.type = 'wall';
    }

    clearWall() {
        if (this.type == 'wall')
        this.type = 'open';
    }
}