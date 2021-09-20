(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\DISK\Projects\pathifinding-visualizer\pathfinding-visualizer\src\main.ts */"zUnb");


/***/ }),

/***/ "7Egt":
/*!**********************************************************************************************************!*\
  !*** ./src/app/visualizer/models/algorithms/procedural-generation/cellular-automata/CellularAutomata.ts ***!
  \**********************************************************************************************************/
/*! exports provided: CellularAutomata */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CellularAutomata", function() { return CellularAutomata; });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node */ "j2if");
/* harmony import */ var _room__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./room */ "xrpj");


class CellularAutomata {
    static generateMap(board) {
        CellularAutomata.randomize(board.getNodeList());
        for (let i = 0; i < CellularAutomata.loops; i++)
            CellularAutomata.SimulateStep(board);
        CellularAutomata.processMap(board);
        CellularAutomata.placePoints(board);
    }
    static processMap(board) {
        let wallRegions = CellularAutomata.getRegions(board, 'wall');
        wallRegions.forEach(wallRegion => {
            if (wallRegion.length < CellularAutomata.wallThreshhold) {
                wallRegion.forEach(node => {
                    node.type = 'open';
                });
            }
        });
        let roomRegions = CellularAutomata.getRegions(board, 'open');
        let survivingRooms = new Array();
        roomRegions.forEach(roomRegion => {
            if (roomRegion.length < CellularAutomata.roomThreshhold) {
                roomRegion.forEach(node => {
                    node.type = 'wall';
                });
            }
            else {
                survivingRooms.push(new _room__WEBPACK_IMPORTED_MODULE_1__["Room"](roomRegion, board));
            }
        });
        survivingRooms.sort((a, b) => {
            return a.roomSize - b.roomSize;
        });
        CellularAutomata.connectClosestRooms(board, survivingRooms, false);
    }
    static connectClosestRooms(board, allRooms, forceAccessabilityFromMainRoom) {
        let roomListA = new Array();
        let roomListB = new Array();
        if (forceAccessabilityFromMainRoom) {
            allRooms.forEach(room => {
                if (room.isAccessibleFromMainRoom)
                    roomListB.push(room);
                else
                    roomListA.push(room);
            });
        }
        else {
            roomListA = allRooms;
            roomListB = allRooms;
        }
        let bestDistance = 0;
        let bestTileA;
        let bestTileB;
        let bestRoomA;
        let bestRoomB;
        let possibleConnectionFound = false;
        roomListA.forEach(roomA => {
            if (!forceAccessabilityFromMainRoom) {
                possibleConnectionFound = false;
                if (roomA.connectedRooms.length > 0)
                    return;
            }
            roomListB.forEach(roomB => {
                if (roomA == roomB || roomA.isConnected(roomB))
                    return;
                for (let tileIndexA = 0; tileIndexA < roomA.edgeTiles.length; tileIndexA++) {
                    for (let tileIndexB = 0; tileIndexB < roomB.edgeTiles.length; tileIndexB++) {
                        let tileA = roomA.edgeTiles[tileIndexA];
                        let tileB = roomB.edgeTiles[tileIndexB];
                        let distanceBetweenRooms = Math.floor(Math.pow(tileA.x - tileB.x, 2) + Math.pow(tileA.y - tileB.y, 2));
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
            CellularAutomata.createPassage(board, bestRoomA, bestRoomB, bestTileA, bestTileB);
            CellularAutomata.connectClosestRooms(board, allRooms, true);
        }
        if (!forceAccessabilityFromMainRoom)
            CellularAutomata.connectClosestRooms(board, allRooms, true);
    }
    static createPassage(board, roomA, roomB, tileA, tileB) {
        _room__WEBPACK_IMPORTED_MODULE_1__["Room"].connectRooms(roomA, roomB);
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
    static getRegions(board, type) {
        let regions = new Array(new Array());
        regions.pop();
        let tileChecked = new Array();
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
    static getRegionTiles(board, node) {
        let regionTiles = new Array();
        let tileChecked = new Array();
        let type = node.type;
        let queue = new Array();
        queue.push(node);
        tileChecked.push(node);
        while (queue.length > 0) {
            let tile = queue.shift();
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
    static SimulateStep(board) {
        let newNodesList = new Array();
        board.getNodeList().forEach(node => {
            let openNeighbours = 0;
            board.getNeighbours(node).forEach(neighbour => {
                if (neighbour.type == 'open')
                    openNeighbours++;
            });
            if (node.type == 'wall' && openNeighbours > CellularAutomata.birthLimit)
                newNodesList.push(new _node__WEBPACK_IMPORTED_MODULE_0__["Node"](node.x, node.y, 'open'));
            else if (node.type == 'open' && (openNeighbours == 0 || openNeighbours < CellularAutomata.deathLimit))
                newNodesList.push(new _node__WEBPACK_IMPORTED_MODULE_0__["Node"](node.x, node.y, 'wall'));
            else
                newNodesList.push(new _node__WEBPACK_IMPORTED_MODULE_0__["Node"](node.x, node.y, node.type));
        });
        board.setNodeList(newNodesList);
    }
    static randomize(nodes) {
        nodes.forEach(node => {
            node.type = (Math.random() <= CellularAutomata.wallChance) ? 'wall' : 'open';
        });
    }
    static placePoints(board) {
        let initialX;
        let initialY;
        do {
            initialX = Math.floor(Math.random() * board.width);
            initialY = Math.floor(Math.random() * board.height);
        } while (board.getNode(initialX, initialY).type != 'open');
        let destinationX;
        let destinationY;
        do {
            destinationX = Math.floor(Math.random() * board.width);
            destinationY = Math.floor(Math.random() * board.height);
        } while ((initialX == destinationX && initialY == destinationY) || (board.getNode(destinationX, destinationY).type != 'open'));
        board.setInitialNode(initialX, initialY);
        board.setDestinationNode(destinationX, destinationY);
    }
}
CellularAutomata.wallChance = 0.45;
CellularAutomata.birthLimit = 4;
CellularAutomata.deathLimit = 4;
CellularAutomata.loops = 10;
CellularAutomata.roomThreshhold = 5;
CellularAutomata.wallThreshhold = 5;


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "CR74":
/*!*********************************************************************************!*\
  !*** ./src/app/visualizer/models/algorithms/pathfinding/dijkstrasAlghorithm.ts ***!
  \*********************************************************************************/
/*! exports provided: DijkstrasAlgorithm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DijkstrasAlgorithm", function() { return DijkstrasAlgorithm; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utility/UtilityFunctions */ "JKcU");


class DijkstrasAlgorithm {
    static calculatePath(board, delay) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let sourceIndex = board.getNodeList().indexOf(board.getInitalNode());
            let targetIndex = board.getNodeList().indexOf(board.getDestinationNode());
            let nodes = board.getNodeList();
            let shortestDistances = new Array(nodes.length);
            let checked = new Array(nodes.length);
            for (let i = 0; i < nodes.length; i++) {
                shortestDistances[i] = Number.POSITIVE_INFINITY;
                checked[i] = false;
            }
            shortestDistances[sourceIndex] = 0;
            let parents = new Array(nodes.length);
            parents[sourceIndex] = DijkstrasAlgorithm.NO_PARENT;
            for (let i = 0; i < nodes.length; i++) {
                let nearestNodeIndex = -1;
                let shortestDistance = Number.POSITIVE_INFINITY;
                for (let i = 0; i < nodes.length; i++) {
                    if (!checked[i] && shortestDistances[i] < shortestDistance) {
                        shortestDistance = shortestDistances[i];
                        nearestNodeIndex = i;
                    }
                }
                checked[nearestNodeIndex] = true;
                if (delay == 0)
                    nodes[nearestNodeIndex].type = 'checked';
                else
                    yield DijkstrasAlgorithm.checkNode(nodes[nearestNodeIndex], delay);
                if (nearestNodeIndex == targetIndex) {
                    if (delay == 0) {
                        DijkstrasAlgorithm.setPath(nodes, sourceIndex, targetIndex, parents, delay);
                        return new Promise(resolve => resolve(shortestDistances[targetIndex]));
                    }
                    else {
                        yield DijkstrasAlgorithm.setPath(nodes, sourceIndex, targetIndex, parents, delay * 8);
                        return new Promise(resolve => resolve(shortestDistances[targetIndex]));
                    }
                }
                let neighbours = board.getNeighbours(nodes[nearestNodeIndex]);
                neighbours.forEach(neighbour => {
                    let index = nodes.indexOf(neighbour);
                    let edgeWeight = board.getEdgeWeight(nodes[nearestNodeIndex], neighbour);
                    if ((edgeWeight > 0 && (shortestDistance + edgeWeight) < shortestDistances[index])) {
                        parents[index] = nearestNodeIndex;
                        shortestDistances[index] = shortestDistance + edgeWeight;
                    }
                });
            }
            return new Promise(resolve => resolve(0));
        });
    }
    static setPath(nodes, sourceIndex, targetIndex, parents, delay) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let list = new Array();
            let newIndex = targetIndex;
            while (parents[newIndex] != DijkstrasAlgorithm.NO_PARENT) {
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
                    const result = yield _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_1__["UtilityFunctions"].resolveWait(delay);
                    if (result == 'resolved')
                        list[i].type = 'path';
                }
            }
            return yield list;
        });
    }
    static checkNode(node, delay) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                const result = yield _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_1__["UtilityFunctions"].resolveWait(delay);
                if (result == 'resolved')
                    node.type = 'checked';
                resolve('resolved');
            }));
        });
    }
}
DijkstrasAlgorithm.NO_PARENT = -1;


/***/ }),

/***/ "Izrw":
/*!****************************************************************!*\
  !*** ./src/app/visualizer/components/board/board.component.ts ***!
  \****************************************************************/
/*! exports provided: BoardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardComponent", function() { return BoardComponent; });
/* harmony import */ var _models_algorithms_pathfinding_AStar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/algorithms/pathfinding/AStar */ "v1dJ");
/* harmony import */ var _models_algorithms_pathfinding_dijkstrasAlghorithm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/algorithms/pathfinding/dijkstrasAlghorithm */ "CR74");
/* harmony import */ var _models_algorithms_procedural_generation_cellular_automata_CellularAutomata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/algorithms/procedural-generation/cellular-automata/CellularAutomata */ "7Egt");
/* harmony import */ var _models_board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../models/board */ "O64k");
/* harmony import */ var _board_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./board.animations */ "pg/H");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");







function BoardComponent_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function BoardComponent_div_5_div_1_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6); const i_r4 = ctx.index; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r5.setActiveAlgorithm(i_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const algorithm_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", algorithm_r3, " ");
} }
function BoardComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, BoardComponent_div_5_div_1_Template, 2, 1, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.algorithms);
} }
function BoardComponent_tr_41_td_1__svg_svg_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "svg", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "path", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function BoardComponent_tr_41_td_1__svg_svg_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "path", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "path", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function BoardComponent_tr_41_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("mousedown", function BoardComponent_tr_41_td_1_Template_div_mousedown_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r15); const node_r10 = ctx.$implicit; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r14.onMouseDown($event, node_r10); })("mousemove", function BoardComponent_tr_41_td_1_Template_div_mousemove_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r15); const node_r10 = ctx.$implicit; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r16.onMouseMove($event, node_r10); })("mouseup", function BoardComponent_tr_41_td_1_Template_div_mouseup_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r15); const node_r10 = ctx.$implicit; const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r17.onMouseUp($event, node_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, BoardComponent_tr_41_td_1__svg_svg_2_Template, 2, 0, "svg", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, BoardComponent_tr_41_td_1__svg_svg_3_Template, 3, 0, "svg", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const node_r10 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("@.disabled", ctx_r9.animationsDisabled)("@nodeType", node_r10.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", node_r10.x == ctx_r9.board.getInitalNode().x && node_r10.y == ctx_r9.board.getInitalNode().y);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", node_r10.x == ctx_r9.board.getDestinationNode().x && node_r10.y == ctx_r9.board.getDestinationNode().y);
} }
function BoardComponent_tr_41_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, BoardComponent_tr_41_td_1_Template, 4, 4, "td", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", row_r7);
} }
class BoardComponent {
    constructor() {
        this.board = new _models_board__WEBPACK_IMPORTED_MODULE_3__["Board"](45, 18);
        this.algorithms = new Array("Dijsktra's algorithm", "A* algorithm");
        this.activeAlgorithm = 0;
        this.algorithmsListShowed = false;
        this.dragActive = 'false';
        this.calculating = false;
        this.pathCalculated = false;
        this.animationsDisabled = false;
        this.algorithmDelay = 2;
    }
    ngOnInit() {
    }
    visualize(delay) {
        if (this.calculating)
            return;
        if (this.pathCalculated)
            this.board.clearPath();
        this.calculating = true;
        if (delay != 0)
            this.animationsDisabled = false;
        let result;
        switch (this.activeAlgorithm) {
            case 0:
                result = _models_algorithms_pathfinding_dijkstrasAlghorithm__WEBPACK_IMPORTED_MODULE_1__["DijkstrasAlgorithm"].calculatePath(this.board, delay);
                break;
            case 1:
                result = _models_algorithms_pathfinding_AStar__WEBPACK_IMPORTED_MODULE_0__["AStar"].calculatePath(this.board, delay);
                break;
            default:
                result = new Promise(resolve => resolve('done'));
                break;
        }
        result.then(value => {
            this.calculating = false;
            this.pathCalculated = true;
            this.animationsDisabled = true;
        });
    }
    clearBoard() {
        if (this.calculating)
            return;
        this.board.clearBoard();
        this.pathCalculated = false;
        this.animationsDisabled = false;
    }
    clearPath() {
        if (this.calculating)
            return;
        this.board.clearPath();
        this.pathCalculated = false;
        this.animationsDisabled = false;
    }
    generateStructures() {
        if (this.calculating || this.pathCalculated)
            return;
        _models_algorithms_procedural_generation_cellular_automata_CellularAutomata__WEBPACK_IMPORTED_MODULE_2__["CellularAutomata"].generateMap(this.board);
    }
    toggleDiagonalEdges() {
        this.board.diagonalEdges = !this.board.diagonalEdges;
        if (this.pathCalculated)
            this.visualize(this.algorithmDelay);
    }
    toggleAlgoritmsList() {
        if (this.calculating)
            return;
        this.algorithmsListShowed = !this.algorithmsListShowed;
    }
    setActiveAlgorithm(index) {
        this.activeAlgorithm = index;
        if (this.pathCalculated) {
            this.algorithmsListShowed = !this.algorithmsListShowed;
            this.visualize(this.algorithmDelay);
        }
    }
    contextMenuDisable(event) {
        event.preventDefault();
    }
    onMouseDown(event, node) {
        event.preventDefault();
        if (this.calculating)
            return;
        if (event.buttons == 1) {
            if (node == this.board.getInitalNode())
                this.dragActive = 'initial';
            else if (node == this.board.getDestinationNode())
                this.dragActive = 'destination';
            else if (node.type == 'open' && this.board.getInitalNode() != node && this.board.getDestinationNode() != node && !this.pathCalculated) {
                node.setWall();
                this.dragActive = "block";
            }
        }
        else if (event.buttons == 2 && node.type == 'wall' && !this.pathCalculated) {
            node.clearWall();
            this.dragActive = 'clear';
        }
    }
    onMouseMove(event, node) {
        event.preventDefault();
        if (this.calculating)
            return;
        switch (this.dragActive) {
            case 'false': break;
            case 'initial':
                if (node != this.board.getDestinationNode() && node.type != 'wall') {
                    if (node != this.board.getInitalNode()) {
                        this.board.setInitialNode(node.x, node.y);
                        if (this.pathCalculated)
                            this.visualize(0);
                    }
                }
                else
                    this.dragActive = 'false';
                break;
            case 'destination':
                if (node != this.board.getInitalNode() && node.type != 'wall') {
                    if (node != this.board.getDestinationNode()) {
                        this.board.setDestinationNode(node.x, node.y);
                        if (this.pathCalculated)
                            this.visualize(0);
                    }
                }
                else
                    this.dragActive = 'false';
                break;
            case 'block':
                if (event.buttons == 1 && node.type == 'open' && this.board.getInitalNode() != node && this.board.getDestinationNode() != node)
                    node.setWall();
                break;
            case 'clear':
                if (event.buttons == 2 && node.type == 'wall')
                    node.clearWall();
                break;
        }
    }
    onMouseUp(event, node) {
        event.preventDefault();
        if (this.dragActive != 'false') {
            this.dragActive = 'false';
        }
    }
    onMouseLeave() {
        this.dragActive = 'false';
    }
}
BoardComponent.ɵfac = function BoardComponent_Factory(t) { return new (t || BoardComponent)(); };
BoardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: BoardComponent, selectors: [["app-board"]], decls: 48, vars: 3, consts: [["id", "nav-bar", 1, "bar"], [1, "btn", "board-btn", 3, "click"], [1, "btn", "board-btn", "alorithm-list-btn", 3, "click"], ["class", "algorithm-list", 4, "ngIf"], ["id", "run-btn", 1, "btn", "board-btn", 3, "click"], [1, "checkbox"], ["type", "checkbox", "id", "diagonal", "name", "diagonal", "checked", "", 3, "click"], ["for", "diagonal"], ["id", "legend-bar", 1, "bar"], [1, "legend-element"], [1, "legend-tile", "legend-tile-icons"], ["xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "bi", "bi-arrow-right-circle"], ["fill-rule", "evenodd", "d", "M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"], ["xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "bi", "bi-stop-circle"], ["d", "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"], ["d", "M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"], [1, "legend-tile", "legend-tile-open"], [1, "legend-tile", "legend-tile-wall"], [1, "legend-tile", "legend-tile-checked"], [1, "legend-tile", "legend-tile-path"], [3, "mouseleave", "contextmenu"], [4, "ngFor", "ngForOf"], [1, "bar"], [1, "algorithm-list"], ["class", "algorithm-list-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "algorithm-list-item", 3, "click"], [1, "node", 3, "mousedown", "mousemove", "mouseup"], ["xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "fill", "currentColor", "class", "bi bi-arrow-right-circle", "viewBox", "0 0 16 16", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "fill", "currentColor", "class", "bi bi-stop-circle", "viewBox", "0 0 16 16", 4, "ngIf"]], template: function BoardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_1_listener() { return ctx.generateStructures(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Generate Walls");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_3_listener() { return ctx.toggleAlgoritmsList(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, BoardComponent_div_5_Template, 2, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_6_listener() { return ctx.visualize(ctx.algorithmDelay); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "Run Algorithm");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_8_listener() { return ctx.clearBoard(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "Clear Board");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_10_listener() { return ctx.clearPath(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "Clear Path");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function BoardComponent_Template_input_click_13_listener() { return ctx.toggleDiagonalEdges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15, "Diagonal edges");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "svg", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](20, "path", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, " Initial Node ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "svg", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](25, "path", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](26, "path", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](27, " Destination Node ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](29, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30, "Open Node");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](32, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](33, "Wall Node");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](35, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](36, "Checked Node");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](38, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](39, "Path Node");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](40, "table", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("mouseleave", function BoardComponent_Template_table_mouseleave_40_listener() { return ctx.onMouseLeave(); })("contextmenu", function BoardComponent_Template_table_contextmenu_40_listener($event) { return ctx.contextMenuDisable($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](41, BoardComponent_tr_41_Template, 2, 1, "tr", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](42, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](43, " Right mouse button - place wall : Left mouse button - clear wall ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](44, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](45, " (Blocks cannot be placed nor cleared while the path is calculated) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](46, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](47, " Initial and Destination nodes can be moved using right mouse button\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx.algorithms[ctx.activeAlgorithm], " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.algorithmsListShowed);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](36);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.board.nodes);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"]], styles: [".bar[_ngcontent-%COMP%] {\n  margin: auto;\n  padding: 0.5rem 0;\n  max-width: 68rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-flow: row wrap;\n  color: #fff;\n  text-align: center;\n}\n.bar[_ngcontent-%COMP%]   .alorithm-list-btn[_ngcontent-%COMP%] {\n  position: relative;\n  width: 12rem;\n}\n.bar[_ngcontent-%COMP%]   .alorithm-list-btn[_ngcontent-%COMP%]::after {\n  position: absolute;\n  top: 50%;\n  right: 2%;\n  display: inline-block;\n  margin-left: 0.25em;\n  vertical-align: 0.25em;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0;\n  border-left: 0.3em solid transparent;\n}\n.bar[_ngcontent-%COMP%]   .algorithm-list[_ngcontent-%COMP%] {\n  position: absolute;\n  display: block;\n  top: 0px;\n  left: 0px;\n  transform: translate3d(0px, 38px, 0px);\n  will-change: transform;\n  width: 12rem;\n  float: left;\n  min-width: 10rem;\n  padding: 0.6rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #b6c3cf;\n  text-align: left;\n  list-style: none;\n  background-color: #004a99;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  z-index: 1000;\n}\n.bar[_ngcontent-%COMP%]   .algorithm-list[_ngcontent-%COMP%]   .algorithm-list-item[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  padding: 0.25rem 0.5rem;\n  clear: both;\n  font-weight: 400;\n  color: #b6c3cf;\n  text-align: inherit;\n  white-space: nowrap;\n  background-color: transparent;\n  border: 0;\n}\n.bar[_ngcontent-%COMP%]   .algorithm-list[_ngcontent-%COMP%]   .algorithm-list-item[_ngcontent-%COMP%]:hover {\n  color: #b6c3cf;\n  text-decoration: none;\n  background-color: #003e80;\n}\n.bar[_ngcontent-%COMP%]   .legend-element[_ngcontent-%COMP%] {\n  width: 10rem;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n  justify-content: center;\n}\n.bar[_ngcontent-%COMP%]   .legend-tile[_ngcontent-%COMP%] {\n  padding: 0;\n  width: 1.7rem;\n  height: 1.7rem;\n  border: 1px solid #112544;\n}\n.bar[_ngcontent-%COMP%]   .legend-tile-open[_ngcontent-%COMP%] {\n  background-color: #d5dcec;\n}\n.bar[_ngcontent-%COMP%]   .legend-tile-wall[_ngcontent-%COMP%] {\n  background-color: #0a2957;\n}\n.bar[_ngcontent-%COMP%]   .legend-tile-checked[_ngcontent-%COMP%] {\n  background-color: #4dbae6;\n}\n.bar[_ngcontent-%COMP%]   .legend-tile-path[_ngcontent-%COMP%] {\n  background-color: #ecf74a;\n}\n.bar[_ngcontent-%COMP%]   .legend-tile-icons[_ngcontent-%COMP%] {\n  border: none;\n}\n.btn[_ngcontent-%COMP%] {\n  margin: 0 0.5rem;\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  border: 1px solid transparent;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n.board-btn[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.board-btn[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #006adb;\n  border-color: #0063cc;\n}\n#run-btn[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #003e80;\n  border-color: #003e80;\n}\n#run-btn[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #00254d;\n  border-color: #002c5c;\n}\n.checkbox[_ngcontent-%COMP%] {\n  color: #fff;\n}\ntable[_ngcontent-%COMP%] {\n  border: 2px solid #0c1a30;\n  border-collapse: collapse;\n  margin: auto;\n  background-color: #d5dcec;\n}\ntable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0;\n  width: 1.7rem;\n  height: 1.7rem;\n  border-collapse: collapse;\n}\ntable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .node[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  margin: auto;\n  cursor: pointer;\n  border: 1px solid #b2c9f0;\n}\nsvg[_ngcontent-%COMP%] {\n  height: 100%;\n  width: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUFDSjtBQUNJO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0FBQ1I7QUFFSTtFQUNJLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsdUJBQUE7RUFDQSxxQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esb0NBQUE7QUFBUjtBQUtJO0VBQ0ksa0JBQUE7RUFDQSxjQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxzQ0FBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLDRCQUFBO0VBQ0EscUNBQUE7RUFDQSxzQkFBQTtFQUNBLGFBQUE7QUFIUjtBQUtRO0VBQ0ksY0FBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsNkJBQUE7RUFDQSxTQUFBO0FBSFo7QUFNUTtFQUNJLGNBQUE7RUFDQSxxQkFBQTtFQUNBLHlCQUFBO0FBSlo7QUFRSTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBTlI7QUFTSTtFQUNJLFVBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0FBUFI7QUFVSTtFQUNJLHlCQUFBO0FBUlI7QUFXSTtFQUNJLHlCQUFBO0FBVFI7QUFZSTtFQUNJLHlCQUFBO0FBVlI7QUFhSTtFQUNJLHlCQUFBO0FBWFI7QUFjSTtFQUNJLFlBQUE7QUFaUjtBQWdCQTtFQUNJLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLDZCQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLHFJQUFBO0FBYko7QUFnQkE7RUFDSSxlQUFBO0FBYko7QUFnQkE7RUFDSSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQWJKO0FBZ0JBO0VBQ0ksV0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUFiSjtBQWdCQTtFQUNJLFdBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0FBYko7QUFnQkE7RUFDSSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQWJKO0FBZ0JBO0VBQ0ksV0FBQTtBQWJKO0FBaUJBO0VBQ0kseUJBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtBQWRKO0FBZUk7RUFDSSxVQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQWJSO0FBZVE7RUFDSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7QUFiWjtBQWtCQTtFQUNJLFlBQUE7RUFDQSxXQUFBO0FBZkoiLCJmaWxlIjoiYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYmFyIHtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAwO1xyXG4gICAgbWF4LXdpZHRoOiA2OHJlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gICAgLmFsb3JpdGhtLWxpc3QtYnRuIHtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgd2lkdGg6IDEycmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5hbG9yaXRobS1saXN0LWJ0bjo6YWZ0ZXIge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6IDUwJTtcclxuICAgICAgICByaWdodDogMiU7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwLjI1ZW07XHJcbiAgICAgICAgdmVydGljYWwtYWxpZ246IDAuMjVlbTtcclxuICAgICAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgICAgIGJvcmRlci10b3A6IC4zZW0gc29saWQ7XHJcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAuM2VtIHNvbGlkIHRyYW5zcGFyZW50O1xyXG4gICAgICAgIGJvcmRlci1ib3R0b206IDA7XHJcbiAgICAgICAgYm9yZGVyLWxlZnQ6IC4zZW0gc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcblxyXG4gICAgLmFsZ29yaXRobS1saXN0IHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgdG9wOiAwcHg7XHJcbiAgICAgICAgbGVmdDogMHB4O1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAzOHB4LCAwcHgpO1xyXG4gICAgICAgIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XHJcbiAgICAgICAgd2lkdGg6IDEycmVtO1xyXG4gICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgIG1pbi13aWR0aDogMTByZW07XHJcbiAgICAgICAgcGFkZGluZzogLjZyZW0gMDtcclxuICAgICAgICBtYXJnaW46IC4xMjVyZW0gMCAwO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgICAgICBjb2xvcjogI2I2YzNjZjtcclxuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIxMSwgMTAwJSwgMzAlKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwwLDAsLjE1KTtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAuMjVyZW07XHJcbiAgICAgICAgei1pbmRleDogMTAwMDtcclxuICAgIFxyXG4gICAgICAgIC5hbGdvcml0aG0tbGlzdC1pdGVtIHtcclxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAuMjVyZW0gMC41cmVtO1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgICAgICAgY29sb3I6ICNiNmMzY2Y7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGluaGVyaXQ7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICBib3JkZXI6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLmFsZ29yaXRobS1saXN0LWl0ZW06aG92ZXIge1xyXG4gICAgICAgICAgICBjb2xvcjogI2I2YzNjZjtcclxuICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMjExLCAxMDAlLCAyNSUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAubGVnZW5kLWVsZW1lbnQge1xyXG4gICAgICAgIHdpZHRoOiAxMHJlbTtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZmxvdzogY29sdW1uO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5sZWdlbmQtdGlsZSB7XHJcbiAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICB3aWR0aDogMS43cmVtO1xyXG4gICAgICAgIGhlaWdodDogMS43cmVtO1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigxNywgMzcsIDY4KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmxlZ2VuZC10aWxlLW9wZW4ge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgyMjIsIDM3JSwgODglKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmxlZ2VuZC10aWxlLXdhbGwge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgyMTYsIDc5JSwgMTklKTtcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIC5sZWdlbmQtdGlsZS1jaGVja2VkIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMTk3LCA3NSUsIDYwJSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5sZWdlbmQtdGlsZS1wYXRoIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woNjQsIDkyJSwgNjMlKTtcclxuICAgIH1cclxuXHJcbiAgICAubGVnZW5kLXRpbGUtaWNvbnMge1xyXG4gICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgIH1cclxufVxyXG5cclxuLmJ0biB7XHJcbiAgICBtYXJnaW46IDAgMC41cmVtO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICBwYWRkaW5nOiAuMzc1cmVtIC43NXJlbTtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAuMjVyZW07XHJcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAuMTVzIGVhc2UtaW4tb3V0LGJhY2tncm91bmQtY29sb3IgLjE1cyBlYXNlLWluLW91dCxib3JkZXItY29sb3IgLjE1cyBlYXNlLWluLW91dCxib3gtc2hhZG93IC4xNXMgZWFzZS1pbi1vdXQ7XHJcbn1cclxuXHJcbi5idG46aG92ZXIge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uYm9hcmQtYnRuIHtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIxMSwgMTAwJSwgNTAlKTtcclxuICAgIGJvcmRlci1jb2xvcjogaHNsKDIxMSwgMTAwJSwgNTAlKTtcclxufVxyXG5cclxuLmJvYXJkLWJ0bjpob3ZlciB7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgyMTEsIDEwMCUsIDQzJSk7XHJcbiAgICBib3JkZXItY29sb3I6IGhzbCgyMTEsIDEwMCUsIDQwJSk7XHJcbn1cclxuXHJcbiNydW4tYnRuIHtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIxMSwgMTAwJSwgMjUlKTtcclxuICAgIGJvcmRlci1jb2xvcjogaHNsKDIxMSwgMTAwJSwgMjUlKTtcclxufVxyXG5cclxuI3J1bi1idG46aG92ZXIge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMjExLCAxMDAlLCAxNSUpO1xyXG4gICAgYm9yZGVyLWNvbG9yOiBoc2woMjExLCAxMDAlLCAxOCUpO1xyXG59XHJcblxyXG4uY2hlY2tib3gge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbn1cclxuXHJcblxyXG50YWJsZSB7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMTIsIDI2LCA0OCk7XHJcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIyMiwgMzclLCA4OCUpO1xyXG4gICAgdGQge1xyXG4gICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgd2lkdGg6IDEuN3JlbTtcclxuICAgICAgICBoZWlnaHQ6IDEuN3JlbTtcclxuICAgICAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC5ub2RlIHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGhzbCgyMTgsIDY3JSwgODIlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbnN2Z3tcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiBhdXRvO1xyXG59XHJcblxyXG5cclxuIl19 */"], data: { animation: [_board_animations__WEBPACK_IMPORTED_MODULE_4__["BoardAnimations"].nodeType] } });


/***/ }),

/***/ "JKcU":
/*!***************************************************************!*\
  !*** ./src/app/visualizer/models/utility/UtilityFunctions.ts ***!
  \***************************************************************/
/*! exports provided: UtilityFunctions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilityFunctions", function() { return UtilityFunctions; });
class UtilityFunctions {
    static resolveWait(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, ms);
        });
    }
}


/***/ }),

/***/ "O64k":
/*!********************************************!*\
  !*** ./src/app/visualizer/models/board.ts ***!
  \********************************************/
/*! exports provided: Board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Board", function() { return Board; });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "j2if");

class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.nodes = [];
        this.diagonalEdges = true;
        for (let y = 0; y < this.height; y++) {
            this.nodes[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.nodes[y][x] = new _node__WEBPACK_IMPORTED_MODULE_0__["Node"](x, y, 'open');
            }
        }
        this.initialNodeCoords = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
        do {
            this.destinationNodeCoords = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
        } while (this.initialNodeCoords.x == this.destinationNodeCoords.x && this.initialNodeCoords.y == this.destinationNodeCoords.y);
        this.setInitialNode(this.initialNodeCoords.x, this.initialNodeCoords.y);
        this.setDestinationNode(this.destinationNodeCoords.x, this.destinationNodeCoords.y);
    }
    getNode(x, y) {
        return this.nodes[y][x];
    }
    getNodeList() {
        let list = new Array();
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++)
                list.push(this.nodes[y][x]);
        return list;
    }
    setNodeList(list) {
        for (let y = this.height - 1; y >= 0; y--)
            for (let x = this.width - 1; x >= 0; x--)
                this.nodes[y][x] = list.pop();
    }
    clearBoard() {
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++)
                this.nodes[y][x].type = 'open';
    }
    clearPath() {
        this.getNodeList().forEach(node => {
            if (node.type == 'path' || node.type == 'checked')
                node.type = 'open';
        });
    }
    getInitalNode() {
        return this.getNode(this.initialNodeCoords.x, this.initialNodeCoords.y);
    }
    getDestinationNode() {
        return this.getNode(this.destinationNodeCoords.x, this.destinationNodeCoords.y);
    }
    setInitialNode(x, y) {
        this.getNode(this.initialNodeCoords.x, this.initialNodeCoords.y).type = 'open';
        this.initialNodeCoords = { x: x, y: y };
    }
    setDestinationNode(x, y) {
        this.getNode(this.destinationNodeCoords.x, this.destinationNodeCoords.y).type = 'open';
        this.destinationNodeCoords = { x: x, y: y };
    }
    getEdgeWeight(node1, node2) {
        if (node1.type == 'wall' || node2.type == 'wall')
            return 0;
        let deltaX = node1.x - node2.x;
        let deltaY = node1.y - node2.y;
        if (deltaX == 0 && (deltaY == -1 || deltaY == 1))
            return 1;
        if (deltaY == 0 && (deltaX == -1 || deltaX == 1))
            return 1;
        //right now if there are walls placed diagonally crossing the potential path algorithm still will go through 
        if (this.diagonalEdges && (deltaX == -1 || deltaX == 1) && (deltaY == -1 || deltaY == 1))
            return 1.4142;
        return 0;
    }
    getNeighbours(node) {
        let nodeList = new Array();
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let n_x = node.x + j;
                let n_y = node.y + i;
                if (!(i == 0 && j == 0) && !(n_x < 0 || n_y < 0 || n_x >= this.width || n_y >= this.height))
                    nodeList.push(this.getNode(n_x, n_y));
            }
        }
        return nodeList;
    }
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visualizer/visualizer.component */ "fQaI");


class AppComponent {
    constructor() {
        this.title = 'pathfinding-visualizer';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-visualizer");
    } }, directives: [_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]], styles: ["[_nghost-%COMP%] {\n  display: inline;\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBQ0oiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gICAgZGlzcGxheTogaW5saW5lO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgfVxyXG4gICJdfQ== */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./visualizer/visualizer.module */ "sYfR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_2__["VisualizerModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_2__["VisualizerModule"]] }); })();


/***/ }),

/***/ "ep2X":
/*!************************************************************!*\
  !*** ./src/app/visualizer/models/utility/PriorityQueue.ts ***!
  \************************************************************/
/*! exports provided: PriorityQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriorityQueue", function() { return PriorityQueue; });
class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}
class PriorityQueue {
    constructor() {
        this.items = [];
        this.items = [];
    }
    add(element, priority) {
        let qElement = new QElement(element, priority);
        let highset = true;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                highset = false;
                break;
            }
        }
        if (highset)
            this.items.push(qElement);
    }
    dequeue() {
        var _a;
        if (this.isEmpty())
            return "No elements in Queue";
        return (_a = this.items.shift()) === null || _a === void 0 ? void 0 : _a.element;
    }
    remove(element) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].element == element) {
                this.items.splice(i, 1);
            }
        }
    }
    first() {
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0].element;
    }
    last() {
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[this.items.length - 1].element;
    }
    isEmpty() {
        return this.items.length == 0;
    }
    contains(element) {
        for (let i = 0; i < this.items.length; i++)
            if (this.items[i].element == element)
                return true;
        return false;
    }
}


/***/ }),

/***/ "fQaI":
/*!****************************************************!*\
  !*** ./src/app/visualizer/visualizer.component.ts ***!
  \****************************************************/
/*! exports provided: VisualizerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualizerComponent", function() { return VisualizerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_board_board_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/board/board.component */ "Izrw");


class VisualizerComponent {
    constructor() { }
    ngOnInit() {
    }
}
VisualizerComponent.ɵfac = function VisualizerComponent_Factory(t) { return new (t || VisualizerComponent)(); };
VisualizerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: VisualizerComponent, selectors: [["app-visualizer"]], decls: 1, vars: 0, template: function VisualizerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-board");
    } }, directives: [_components_board_board_component__WEBPACK_IMPORTED_MODULE_1__["BoardComponent"]], styles: ["*[_ngcontent-%COMP%] {\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\n}\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background-color: #393e49;\n  overflow-y: scroll;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHZpc3VhbGl6ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxnREFBQTtBQUNKOztBQUVBO0VBQ0ksY0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtBQUNKIiwiZmlsZSI6InZpc3VhbGl6ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIqIHtcclxuICAgIGZvbnQtZmFtaWx5OiBWZXJkYW5hLCBHZW5ldmEsIFRhaG9tYSwgc2Fucy1zZXJpZjtcclxufSBcclxuXHJcbjpob3N0IHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTcsIDYyLCA3Myk7XHJcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "j2if":
/*!*******************************************!*\
  !*** ./src/app/visualizer/models/node.ts ***!
  \*******************************************/
/*! exports provided: Node */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return Node; });
class Node {
    constructor(x, y, _type = 'open') {
        this.x = x;
        this.y = y;
        this.type = 'open';
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


/***/ }),

/***/ "pg/H":
/*!*****************************************************************!*\
  !*** ./src/app/visualizer/components/board/board.animations.ts ***!
  \*****************************************************************/
/*! exports provided: BoardAnimations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardAnimations", function() { return BoardAnimations; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "R0Ic");

const BoardAnimations = {
    nodeType: Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('nodeType', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('open', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            backgroundColor: 'hsl(222, 37%, 88%)',
            border: '1px solid hsl(218, 67%, 82%)'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('checked', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            backgroundColor: 'hsl(197, 75%, 60%)',
            border: '1px solid hsl(218, 67%, 82%)'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('path', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            backgroundColor: 'hsl(64, 92%, 63%)',
            border: 'none'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('wall', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            backgroundColor: 'hsl(216, 79%, 19%)',
            border: 'none'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('open => checked', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])(700, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["keyframes"])([
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    borderRadius: '50%',
                    height: '50%',
                    width: '50%',
                    margin: 'auto',
                    backgroundColor: 'hsl(197, 90%, 45%)',
                    offset: 0
                }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    borderRadius: '40%',
                    height: '60%',
                    width: '60%',
                    margin: 'auto',
                    backgroundColor: 'hsl(197, 87%, 48%)',
                    offset: 0.3
                }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    borderRadius: '30%',
                    height: '70%',
                    width: '70%',
                    margin: 'auto',
                    backgroundColor: 'hsl(197, 84%, 51%)',
                    offset: 0.55
                }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    borderRadius: '20%',
                    height: '80%',
                    width: '80%',
                    margin: 'auto',
                    backgroundColor: 'hsl(197, 81%, 54%)',
                    offset: 0.75
                }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    borderRadius: '10%',
                    height: '90%',
                    width: '90%',
                    margin: 'auto',
                    backgroundColor: 'hsl(197, 77%, 57%)',
                    offset: 0.9
                }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    borderRadius: '0%',
                    height: '100%',
                    width: '100%',
                    margin: 'auto',
                    backgroundColor: 'hsl(197, 75%, 60%)',
                    offset: 1
                })
            ]))
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('checked => path', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])(700, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["keyframes"])([
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                    border: 'none',
                    offset: 0
                })
            ]))
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('open <=> wall', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])(100)
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => *', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])(0)
        ]),
    ]),
};


/***/ }),

/***/ "sYfR":
/*!*************************************************!*\
  !*** ./src/app/visualizer/visualizer.module.ts ***!
  \*************************************************/
/*! exports provided: VisualizerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualizerModule", function() { return VisualizerModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_board_board_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/board/board.component */ "Izrw");
/* harmony import */ var _visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./visualizer.component */ "fQaI");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






class VisualizerModule {
}
VisualizerModule.ɵfac = function VisualizerModule_Factory(t) { return new (t || VisualizerModule)(); };
VisualizerModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: VisualizerModule });
VisualizerModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](VisualizerModule, { declarations: [_components_board_board_component__WEBPACK_IMPORTED_MODULE_1__["BoardComponent"],
        _visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"]], exports: [_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"]] }); })();


/***/ }),

/***/ "v1dJ":
/*!*******************************************************************!*\
  !*** ./src/app/visualizer/models/algorithms/pathfinding/AStar.ts ***!
  \*******************************************************************/
/*! exports provided: AStar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AStar", function() { return AStar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _utility_PriorityQueue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utility/PriorityQueue */ "ep2X");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utility/UtilityFunctions */ "JKcU");



class AStar {
    static calculatePath(board, delay) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let sourceIndex = board.getNodeList().indexOf(board.getInitalNode());
            let targetIndex = board.getNodeList().indexOf(board.getDestinationNode());
            let nodes = board.getNodeList();
            let openSet = new _utility_PriorityQueue__WEBPACK_IMPORTED_MODULE_1__["PriorityQueue"]();
            let parents = new Array(nodes.length);
            parents[sourceIndex] = AStar.NO_PARENT;
            let gScore = new Array(nodes.length);
            let fScore = new Array(nodes.length);
            for (let i = 0; i < nodes.length; i++) {
                gScore[i] = Number.POSITIVE_INFINITY;
                fScore[i] = Number.POSITIVE_INFINITY;
            }
            gScore[sourceIndex] = 0;
            fScore[sourceIndex] = AStar.calculateH(nodes[sourceIndex], nodes[targetIndex]);
            openSet.add(sourceIndex, fScore[sourceIndex]);
            nodes[sourceIndex].type = 'checked';
            while (!openSet.isEmpty()) {
                let current = openSet.dequeue();
                if (current == targetIndex) {
                    if (delay == 0) {
                        AStar.setPath(nodes, sourceIndex, targetIndex, parents, delay);
                        return new Promise(resolve => resolve(fScore[current]));
                    }
                    else {
                        yield AStar.setPath(nodes, sourceIndex, targetIndex, parents, delay * 8);
                        return new Promise(resolve => resolve(fScore[current]));
                    }
                }
                let neighbours = board.getNeighbours(nodes[current]);
                neighbours.forEach((node) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    let edgeWeight = board.getEdgeWeight(nodes[current], node);
                    if (edgeWeight != 0) {
                        let neighbour = nodes.indexOf(node);
                        let tentativeG = gScore[current] + edgeWeight;
                        if (tentativeG < gScore[neighbour]) {
                            parents[neighbour] = current;
                            gScore[neighbour] = tentativeG;
                            fScore[neighbour] = gScore[neighbour] + AStar.calculateH(nodes[neighbour], nodes[targetIndex]);
                            if (!openSet.contains(neighbour)) {
                                openSet.add(neighbour, fScore[neighbour]);
                                if (delay == 0)
                                    nodes[neighbour].type = 'checked';
                                else
                                    yield AStar.checkNode(nodes[neighbour], delay);
                            }
                            else {
                                openSet.remove(neighbour);
                                openSet.add(neighbour, fScore[neighbour]);
                            }
                        }
                    }
                }));
            }
            return new Promise(resolve => resolve(0));
        });
    }
    static calculateH(node1, node2) {
        return Math.sqrt(Math.pow((node1.x - node2.x), 2) + Math.pow((node1.y - node2.y), 2));
    }
    static setPath(nodes, sourceIndex, targetIndex, parents, delay) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let list = new Array();
            let newIndex = targetIndex;
            while (parents[newIndex] != AStar.NO_PARENT) {
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
                    const result = yield _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_2__["UtilityFunctions"].resolveWait(delay);
                    if (result == 'resolved')
                        list[i].type = 'path';
                }
            }
            return yield list;
        });
    }
    static checkNode(node, delay) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                const result = yield _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_2__["UtilityFunctions"].resolveWait(delay);
                if (result == 'resolved')
                    node.type = 'checked';
                resolve('resolved');
            }));
        });
    }
}
AStar.NO_PARENT = -1;


/***/ }),

/***/ "xrpj":
/*!**********************************************************************************************!*\
  !*** ./src/app/visualizer/models/algorithms/procedural-generation/cellular-automata/room.ts ***!
  \**********************************************************************************************/
/*! exports provided: Room */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Room", function() { return Room; });
class Room {
    constructor(roomTiles, board) {
        this.tiles = new Array();
        this.edgeTiles = new Array();
        this.connectedRooms = new Array();
        this.roomSize = 0;
        this.isAccessibleFromMainRoom = false;
        this.isMainRoom = false;
        this.tiles = roomTiles;
        this.roomSize = this.tiles.length;
        this.tiles.forEach(tile => {
            board.getNeighbours(tile).forEach(neighbour => {
                if ((tile.x == neighbour.x || tile.y == neighbour.y) && neighbour.type == 'wall')
                    this.edgeTiles.push(neighbour);
            });
        });
    }
    setAccessibleFromMainRoom() {
        if (!this.isAccessibleFromMainRoom) {
            this.isAccessibleFromMainRoom = true;
            this.connectedRooms.forEach(room => {
                room.setAccessibleFromMainRoom();
            });
        }
    }
    static connectRooms(roomA, roomB) {
        if (roomA.isAccessibleFromMainRoom) {
            roomB.setAccessibleFromMainRoom();
        }
        else if (roomB.isAccessibleFromMainRoom) {
            roomA.setAccessibleFromMainRoom();
        }
        roomA.connectedRooms.push(roomB);
        roomB.connectedRooms.push(roomA);
    }
    isConnected(otherRoom) {
        return this.connectedRooms.includes(otherRoom);
    }
}


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map