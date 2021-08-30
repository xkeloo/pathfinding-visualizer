import { Board } from "../../board";
import { Node } from "../../node";
import { UtilityFunctions } from "../../utility/UtilityFunctions";

export class DijkstrasAlgorithm {

    private static NO_PARENT: number = -1;

    public static async calculatePath(board: Board, delay: number): Promise<any> {
        //constructor
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
        
        let promises: Promise<any>[] = [];
        //async?
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
            if (nearestNodeIndex != sourceIndex && nearestNodeIndex != targetIndex) {
                promises.push(DijkstrasAlgorithm.checkNode(nodes[nearestNodeIndex], delay));
            }
            if (nearestNodeIndex == targetIndex) {
                DijkstrasAlgorithm.setPath(nodes, targetIndex, parents, delay*50)
                return Promise.all(promises).then((values) => console.log(shortestDistances[targetIndex]));
               // return new Promise(resolve => resolve(shortestDistances[targetIndex]));
                
            }

            for (let i = 0; i < nodes.length; i++) {
                let edgeWeight: number = board.getEdgeWeight(nodes[nearestNodeIndex], nodes[i]);

                if (edgeWeight > 0 && ((shortestDistance + edgeWeight) < shortestDistances[i])) {
                    parents[i] = nearestNodeIndex;
                    shortestDistances[i] = shortestDistance + edgeWeight;
                }
            }
        }

         return Promise.all(promises).then((values) => console.log(0));
    }

    private static async setPath(nodes: Node[], targetIndex: number, parents: number[], delay: number): Promise<Node[]> {
        let list: Node[] = new Array();
        let newIndex = targetIndex;
        while(parents[newIndex] != DijkstrasAlgorithm.NO_PARENT) {
            let node = nodes[parents[newIndex]];
            list.push(node);
            newIndex = parents[newIndex];
        }

        list.pop();
        list = list.reverse();
        list.forEach(async element => {
                const result = await UtilityFunctions.resolveWait(delay);
                if (result == 'resolved')
                    element.type = 'path';
        });
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