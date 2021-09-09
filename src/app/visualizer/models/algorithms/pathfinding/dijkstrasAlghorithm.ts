import { Board } from "../../board";
import { Node } from "../../node";
import { UtilityFunctions } from "../../utility/UtilityFunctions";

export class DijkstrasAlgorithm {

    private static NO_PARENT: number = -1;

    public static async calculatePath(board: Board, delay: number): Promise<any> {

        let sourceIndex = board.getNodeList().indexOf(board.getInitalNode());
        let targetIndex = board.getNodeList().indexOf(board.getDestinationNode());
        let nodes = board.getNodeList();
        let shortestDistances: number[] = new Array(nodes.length);
        let checked: boolean[] = new Array(nodes.length);
        
        for (let i = 0; i < nodes.length; i++) {
            shortestDistances[i] = Number.POSITIVE_INFINITY;
            checked[i] = false;
        }

        shortestDistances[sourceIndex] = 0;

        let parents: number[] = new Array(nodes.length);
        parents[sourceIndex] = DijkstrasAlgorithm.NO_PARENT;
        

        for (let i = 0; i < nodes.length; i++) {
            let nearestNodeIndex: number = -1;
            let shortestDistance: number = Number.POSITIVE_INFINITY;
            
            for (let i = 0; i < nodes.length; i++) {
                if(!checked[i] && shortestDistances[i] < shortestDistance) {
                    shortestDistance = shortestDistances[i];
                    nearestNodeIndex = i;
                }
            }

            checked[nearestNodeIndex] = true;
            if (delay == 0)
                nodes[nearestNodeIndex].type = 'checked'
            else
                await DijkstrasAlgorithm.checkNode(nodes[nearestNodeIndex], delay);

            if (nearestNodeIndex == targetIndex) {
                if (delay == 0) {
                    DijkstrasAlgorithm.setPath(nodes, sourceIndex, targetIndex, parents, delay);
                    return  new Promise(resolve => resolve(shortestDistances[targetIndex]));
                }
                else 
                {
                    await DijkstrasAlgorithm.setPath(nodes, sourceIndex, targetIndex, parents, delay*8);
                    return new Promise(resolve => resolve(shortestDistances[targetIndex]));
                }
            }

            let neighbours = board.getNeighbours(nodes[nearestNodeIndex]);
            neighbours.forEach(neighbour => {
                let index = nodes.indexOf(neighbour);
                let edgeWeight: number = board.getEdgeWeight(nodes[nearestNodeIndex], neighbour);
                if ((edgeWeight > 0 && (shortestDistance + edgeWeight) < shortestDistances[index])) {
                    parents[index] = nearestNodeIndex;
                    shortestDistances[index] = shortestDistance + edgeWeight;
                }
            });

            
        }

        return new Promise(resolve => resolve(0));
    }

    private static async setPath(nodes: Node[], sourceIndex: number, targetIndex: number, parents: number[], delay: number): Promise<Node[]> {
        let list: Node[] = new Array();
        let newIndex = targetIndex;
        while(parents[newIndex] != DijkstrasAlgorithm.NO_PARENT) {
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