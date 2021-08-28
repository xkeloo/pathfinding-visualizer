import { Board } from "../../board";
import { Node } from "../../node";
import { PriorityQueue } from "../../utility/PriorityQueue";

export class AStar {
    private static NO_PARENT: number = -1;

    public static calculatePath(board: Board): number {
        let sourceIndex = board.getNodeList().indexOf(board.getInitalNode());
        let targetIndex = board.getNodeList().indexOf(board.getDestinationNode());
        let nodes = board.getNodeList();

        let openSet = new PriorityQueue();

        let parents: number[] = new Array(nodes.length);
        parents[sourceIndex] = AStar.NO_PARENT;

        let gScore: number[] = new Array(nodes.length);
        let fScore: number[] = new Array(nodes.length);
        for (let i = 0; i < nodes.length; i++) {
            gScore[i] = Number.POSITIVE_INFINITY;
            fScore[i] = Number.POSITIVE_INFINITY;
        }
        gScore[sourceIndex] = 0;
        fScore[sourceIndex] = AStar.calculateH(nodes[sourceIndex], nodes[targetIndex]);

        openSet.add(sourceIndex, fScore[sourceIndex]);
        
        while(!openSet.isEmpty()) {
            let current = openSet.dequeue();
            if (current == targetIndex) {
                this.setPath(nodes, targetIndex, parents);
                return fScore[current];
            }
            nodes.forEach(node => {
                let edgeWeight: number = board.getEdgeWeight(nodes[current], node);
                if (edgeWeight != 0) {
                    let neighbour = nodes.indexOf(node);
                    let tentativeG = gScore[current] + edgeWeight;
                    if (tentativeG < gScore[neighbour]) {
                        parents[neighbour] = current;
                        gScore[neighbour] = tentativeG;
                        fScore[neighbour] = gScore[neighbour] + AStar.calculateH(nodes[neighbour], nodes[targetIndex]);
                        if (!openSet.contains(neighbour)){
                            openSet.add(neighbour, fScore[neighbour]);
                            if (nodes[neighbour].type != 'initial' && nodes[neighbour].type != 'destination')
                                nodes[neighbour].type = 'checked';
                        }
                        else {
                            openSet.remove(neighbour);
                            openSet.add(neighbour, fScore[neighbour]);
                        }
                    }             
                }      
            });
        }

        return 0;
    }

    private static calculateH(node1: Node, node2: Node): number {
        return Math.sqrt(Math.pow((node1.x - node2.x),2) + Math.pow((node1.y - node2.y),2));
    }

    private static setPath(nodes: Node[], targetIndex: number, parents: number[]): void {
        let list: Node[] = new Array();
        let newIndex = targetIndex;
        while(parents[newIndex] != AStar.NO_PARENT) {
            let node = nodes[parents[newIndex]];
            list.push(node);
            newIndex = parents[newIndex];
        }

        list.pop();
        list = list.reverse();
        list.forEach(element => {
            element.type = 'path';
        });
    }
}