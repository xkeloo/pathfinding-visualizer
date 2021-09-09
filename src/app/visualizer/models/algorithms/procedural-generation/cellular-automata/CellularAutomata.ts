import { Board } from "../../../board";
import { Node } from "../../../node";
import { Room } from "./room";

export class CellularAutomata {

    private static wallChance: number = 0.45;
    private static birthLimit: number = 4;
    private static deathLimit: number = 4;
    private static loops: number = 10;
    private static roomThreshhold: number = 5;
    private static wallThreshhold: number = 5;

    public static generateMap(board: Board): void {
        CellularAutomata.randomize(board.getNodeList());

        for (let i = 0; i < CellularAutomata.loops; i++) 
            CellularAutomata.SimulateStep(board);


        CellularAutomata.processMap(board);

        CellularAutomata.placePoints(board);
    }

    private static processMap(board: Board): void {
        let wallRegions = CellularAutomata.getRegions(board, 'wall');

        wallRegions.forEach(wallRegion => {
            if (wallRegion.length < CellularAutomata.wallThreshhold) {
                wallRegion.forEach(node => {
                    node.type = 'open';
                });
            }
        });
        
        let roomRegions = CellularAutomata.getRegions(board, 'open');
        let survivingRooms: Room[] = new Array();

        roomRegions.forEach(roomRegion => {
            if (roomRegion.length < CellularAutomata.roomThreshhold) {
                roomRegion.forEach(node => {
                    node.type = 'wall';
                });
            }
            else {
                survivingRooms.push(new Room(roomRegion, board));
            }
        });

        survivingRooms.sort((a,b) => {
            return a.roomSize - b.roomSize;
        })

        CellularAutomata.connectClosestRooms(board, survivingRooms, false);

    }

    private static connectClosestRooms(board: Board, allRooms: Room[], forceAccessabilityFromMainRoom: boolean): void {
        let roomListA: Room[] = new Array();
        let roomListB: Room[] = new Array();

        if (forceAccessabilityFromMainRoom) {
            allRooms.forEach(room => {
                if (room.isAccessibleFromMainRoom) roomListB.push(room);
                else roomListA.push(room);
            });
        }
        else {
            roomListA = allRooms;
            roomListB = allRooms;
        }

        let bestDistance: number = 0;
        let bestTileA: Node;
        let bestTileB: Node;
        let bestRoomA: Room;
        let bestRoomB: Room;
        let possibleConnectionFound: boolean = false;

        roomListA.forEach(roomA => {
            if (!forceAccessabilityFromMainRoom) {
                possibleConnectionFound = false;
                if (roomA.connectedRooms.length > 0) return;
            }

            roomListB.forEach(roomB => {
                if (roomA == roomB || roomA.isConnected(roomB)) return;

                for (let tileIndexA = 0; tileIndexA < roomA.edgeTiles.length; tileIndexA++) {
                    for (let tileIndexB = 0; tileIndexB < roomB.edgeTiles.length; tileIndexB++) {
                        let tileA: Node = roomA.edgeTiles[tileIndexA];
                        let tileB: Node = roomB.edgeTiles[tileIndexB];
                        let distanceBetweenRooms: number = Math.floor(Math.pow(tileA.x - tileB.x, 2) + Math.pow(tileA.y - tileB.y, 2));

                        if (distanceBetweenRooms < bestDistance || !possibleConnectionFound) {
                            bestDistance = distanceBetweenRooms;
                            possibleConnectionFound = true;
                            bestTileA = tileA;
                            bestTileB = tileB;
                            bestRoomA = roomA;
                            bestRoomB = roomB;
                        }
                    }
                }
            });

            if (possibleConnectionFound && !forceAccessabilityFromMainRoom)
                CellularAutomata.createPassage(board, bestRoomA, bestRoomB, bestTileA, bestTileB);
        });

        if (possibleConnectionFound && forceAccessabilityFromMainRoom) {
            CellularAutomata.createPassage(board, bestRoomA!, bestRoomB!, bestTileA!, bestTileB!);
            CellularAutomata.connectClosestRooms(board, allRooms, true);
        }

        if(!forceAccessabilityFromMainRoom) 
          CellularAutomata.connectClosestRooms(board, allRooms, true);
        
    }

    private static createPassage(board: Board, roomA: Room, roomB: Room, tileA: Node, tileB: Node): void {
        Room.connectRooms(roomA, roomB);

        if (tileA.x >= tileB.x && tileA.y >= tileB.y) {
            for (let x = tileB.x; x <= tileA.x; x++) 
                for (let y = tileB.y - 1; y <= tileB.y + 1; y++)
                    board.getNode(x, y).type = 'open';

            for (let y = tileB.y; y <= tileA.y; y++) 
                for (let x = tileA.x - 1; x <= tileA.x + 1; x++)
                        board.getNode(x, y).type = 'open';
        }
        else if (tileA.x >= tileB.x && tileA.y < tileB.y) {
            for (let x = tileB.x; x <= tileA.x; x++) 
                for (let y = tileB.y - 1; y <= tileB.y + 1; y++)
                    board.getNode(x, y).type = 'open';

            for (let y = tileA.y; y <= tileB.y; y++) 
                for (let x = tileA.x - 1; x <= tileA.x + 1; x++)
                        board.getNode(x, y).type = 'open';
        }
        else if (tileA.x < tileB.x && tileA.y < tileB.y) {
            for (let x = tileA.x; x <= tileB.x; x++) 
                for (let y = tileA.y - 1; y <= tileA.y + 1; y++)
                    board.getNode(x, y).type = 'open';

            for (let y = tileA.y; y <= tileB.y; y++) 
                for (let x = tileB.x - 1; x <= tileB.x + 1; x++)
                        board.getNode(x, y).type = 'open';
        }
        else if (tileA.x < tileB.x && tileA.y >= tileB.y) {
            for (let x = tileA.x; x <= tileB.x; x++) 
                for (let y = tileA.y - 1; y <= tileA.y + 1; y++)
                    board.getNode(x, y).type = 'open';

            for (let y = tileB.y; y <= tileA.y; y++) 
                for (let x = tileB.x - 1; x <= tileB.x + 1; x++)
                        board.getNode(x, y).type = 'open';
        }
    }

    private static getRegions(board: Board, type: string): Node[][] {
        let regions: Node[][] = new Array(new Array());
        regions.pop()
        let tileChecked: Node[] = new Array();
        
        board.getNodeList().forEach(node => {
            if (!tileChecked.includes(node) && node.type == type) {
                let newRegion = CellularAutomata.getRegionTiles(board, node);
                regions.push(newRegion);
                

                newRegion.forEach(node => {
                    tileChecked.push(node);
                });
            }
        });
        return regions;
    }

    private static getRegionTiles(board: Board, node: Node): Node[] {
        let regionTiles: Node[] = new Array();
        let tileChecked: Node[] = new Array();
        let type = node.type;

        let queue: Node[] = new Array();
        queue.push(node);
        
        tileChecked.push(node);

        while (queue.length > 0) {
            let tile: Node = queue.shift()!;
            regionTiles.push(tile);

            board.getNeighbours(tile).forEach(neighbour => {
                if (tile.x == neighbour.x || tile.y == neighbour.y) {
                    if (!tileChecked.includes(neighbour) && neighbour.type == type) {
                        tileChecked.push(neighbour);
                        queue.push(neighbour);
                    }
                }
            });
        }
        
        return regionTiles;
    }


    private static SimulateStep(board: Board): void {
        let newNodesList: Node[] = new Array();
        
        board.getNodeList().forEach(node => {
            let openNeighbours: number = 0;
            board.getNeighbours(node).forEach(neighbour => {
                if (neighbour.type == 'open') openNeighbours++;
            });
            if (node.type == 'wall' && openNeighbours > CellularAutomata.birthLimit) 
                newNodesList.push(new Node(node.x, node.y, 'open'));
            else if (node.type == 'open' && (openNeighbours == 0 || openNeighbours < CellularAutomata.deathLimit)) 
                newNodesList.push(new Node(node.x, node.y, 'wall'));
            else
              newNodesList.push(new Node(node.x, node.y, node.type));
            
        });

        board.setNodeList(newNodesList);
    }

    private static randomize(nodes: Node[]): void {
        nodes.forEach(node => {
            node.type = (Math.random() <= CellularAutomata.wallChance) ? 'wall' : 'open';
        });
    }

    private static placePoints(board: Board): void {
        let initialX;
        let initialY;
        do {
            initialX = Math.floor(Math.random() * board.width);
            initialY = Math.floor(Math.random() * board.height);
        } while(board.getNode(initialX, initialY).type != 'open');
        
        let destinationX;
        let destinationY;
        do {
            destinationX = Math.floor(Math.random() * board.width);
            destinationY = Math.floor(Math.random() * board.height);
        } while((initialX == destinationX && initialY == destinationY) || (board.getNode(destinationX, destinationY).type != 'open'));

        board.setInitialNode(initialX, initialY);
        board.setDestinationNode(destinationX, destinationY);
    }

}