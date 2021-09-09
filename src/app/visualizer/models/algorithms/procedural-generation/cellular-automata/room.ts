import { Board } from "../../../board";
import { Node } from "../../../node";

export class Room {
    tiles: Node[] = new Array();
    edgeTiles: Node[] = new Array();
    connectedRooms: Room[] = new Array();
    roomSize: number = 0;
    isAccessibleFromMainRoom: boolean = false;
    isMainRoom: boolean = false;

    constructor(roomTiles: Node[], board: Board) {
        this.tiles = roomTiles;
        this.roomSize = this.tiles.length;
        this.tiles.forEach(tile => {
            board.getNeighbours(tile).forEach(neighbour => {
                if ((tile.x == neighbour.x || tile.y == neighbour.y) && neighbour.type == 'wall')
                    this.edgeTiles.push(neighbour);
            });
        });
    }

    setAccessibleFromMainRoom(): void {
        if (!this.isAccessibleFromMainRoom) {
            this.isAccessibleFromMainRoom = true;
            this.connectedRooms.forEach(room => {
                room.setAccessibleFromMainRoom();
            });
        }
    }

    public static connectRooms(roomA: Room, roomB: Room): void {
        if (roomA.isAccessibleFromMainRoom) {
            roomB.setAccessibleFromMainRoom()
        }
        else if (roomB.isAccessibleFromMainRoom) {
            roomA.setAccessibleFromMainRoom();
        }
        roomA.connectedRooms.push(roomB);
        roomB.connectedRooms.push(roomA);
    }
    
    isConnected(otherRoom: Room) {
        return this.connectedRooms.includes(otherRoom);
    }
}