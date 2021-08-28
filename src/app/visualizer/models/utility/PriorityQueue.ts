class QElement {
    constructor(public element: any, public priority: number) {}
}

export class PriorityQueue {
    items: QElement[] = [];
    constructor() {
        this.items = [];
    }

    add(element: any, priority: number): void {
        let qElement = new QElement(element, priority);
        let highset = true;

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                highset = false;
                break;
            }
        }

        if (highset) this.items.push(qElement);
    }

    dequeue(): any {
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items.shift()?.element;
    }

    remove(element: any): void {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].element == element) {
                this.items.splice(i, 1);
            }
        }
    }

    first() {
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[0].element;
    }

    last() {
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[this.items.length - 1].element;
    }

    isEmpty(): boolean {
        return this.items.length == 0;
    }

    contains(element: any): boolean {
        for(let i = 0; i < this.items.length; i++)
            if (this.items[i].element == element)
            return true;
        return false;
    }

}