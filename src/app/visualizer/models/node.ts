export class Node {
    type: 'open'| 'checked' | 'path' | 'wall' = 'open';

    constructor(public x: number, public y: number, _type: 'open'| 'checked' | 'path' | 'wall' = 'open') {
        this.type = _type;
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