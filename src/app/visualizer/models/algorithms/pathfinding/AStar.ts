import { Board } from "../../board";
import { Node } from "../../node";
import { PriorityQueue } from "../../utility/PriorityQueue";
import { UtilityFunctions } from "../../utility/UtilityFunctions";

export class AStar {
    private static NO_PARENT: number = -1;

    public static async calculatePath(board: Board, delay: number): Promise<any> {
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
        nodes[sourceIndex].type = 'checked';

        while(!openSet.isEmpty()) {
            let current = openSet.dequeue();
            if (current == targetIndex) {
                if (delay == 0) {
                    AStar.setPath(nodes, sourceIndex, targetIndex, parents, delay);
                    return  new Promise(resolve => resolve(fScore[current]));
                }
                else {
                    await AStar.setPath(nodes, sourceIndex, targetIndex, parents, delay*8);
                    return  new Promise(resolve => resolve(fScore[current]));     
                }     
            }
            let neighbours = board.getNeighbours(nodes[current]);
            neighbours.forEach(async node => {
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
                            if (delay == 0)
                                nodes[neighbour].type = 'checked'
                            else
                                await AStar.checkNode(nodes[neighbour], delay);
                        }
                        else {
                            openSet.remove(neighbour);
                            openSet.add(neighbour, fScore[neighbour]);
                        }
                    }             
                }      
            });
        }

        return new Promise(resolve => resolve(0));
    }

    private static calculateH(node1: Node, node2: Node): number {
        return Math.sqrt(Math.pow((node1.x - node2.x),2) + Math.pow((node1.y - node2.y),2));
    }

    private static async setPath(nodes: Node[], sourceIndex: number, targetIndex: number, parents: number[], delay: number): Promise<Node[]> {
        let list: Node[] = new Array();
        let newIndex = targetIndex;
        while(parents[newIndex] != AStar.NO_PARENT) {
            list.push(nodes[newIndex]);
            newIndex = parents[newIndex];
        }

        list.push(nodes[sourceIndex]);
        list = list.reverse();
        if (delay == 0) {
            for (let i = 0; i < list.length; i++) {
                list[i].type = 'path';
            }
        }
        else {
            for (let i = 0; i < list.length; i++) {
                const result = await UtilityFunctions.resolveWait(delay);
                if (result == 'resolved')
                    list[i].type = 'path';
            }
        }

        return await list;
    }

    private static async checkNode(node: Node, delay: number) {
        return new Promise(async resolve => {
            const result = await UtilityFunctions.resolveWait(delay);
            if (result == 'resolved')
                node.type = 'checked';
                resolve('resolved')
        });
    }
}