(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\DISK\Projects\pathifinding-visualizer\pathfinding-visualizer\src\main.ts */"zUnb");


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
            //constructor
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
            let promises = [];
            //async?
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
                if (nearestNodeIndex != sourceIndex && nearestNodeIndex != targetIndex) {
                    promises.push(DijkstrasAlgorithm.checkNode(nodes[nearestNodeIndex], delay));
                }
                if (nearestNodeIndex == targetIndex) {
                    DijkstrasAlgorithm.setPath(nodes, targetIndex, parents, delay * 50);
                    return Promise.all(promises).then((values) => console.log(shortestDistances[targetIndex]));
                    // return new Promise(resolve => resolve(shortestDistances[targetIndex]));
                }
                for (let i = 0; i < nodes.length; i++) {
                    let edgeWeight = board.getEdgeWeight(nodes[nearestNodeIndex], nodes[i]);
                    if (edgeWeight > 0 && ((shortestDistance + edgeWeight) < shortestDistances[i])) {
                        parents[i] = nearestNodeIndex;
                        shortestDistances[i] = shortestDistance + edgeWeight;
                    }
                }
            }
            return Promise.all(promises).then((values) => console.log(0));
        });
    }
    static setPath(nodes, targetIndex, parents, delay) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let list = new Array();
            let newIndex = targetIndex;
            while (parents[newIndex] != DijkstrasAlgorithm.NO_PARENT) {
                let node = nodes[parents[newIndex]];
                list.push(node);
                newIndex = parents[newIndex];
            }
            list.pop();
            list = list.reverse();
            list.forEach((element) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                const result = yield _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_1__["UtilityFunctions"].resolveWait(delay);
                if (result == 'resolved')
                    element.type = 'path';
            }));
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
/* harmony import */ var _models_board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/board */ "O64k");
/* harmony import */ var _board_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./board.animations */ "pg/H");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






function BoardComponent_div_3_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function BoardComponent_div_3_div_1_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6); const i_r4 = ctx.index; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r5.setActiveAlgorithm(i_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const algorithm_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", algorithm_r3, " ");
} }
function BoardComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, BoardComponent_div_3_div_1_Template, 2, 1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r0.algorithms);
} }
function BoardComponent_tr_34_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("mousedown", function BoardComponent_tr_34_td_1_Template_div_mousedown_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r13); const node_r10 = ctx.$implicit; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r12.onMouseDown($event, node_r10); })("mousemove", function BoardComponent_tr_34_td_1_Template_div_mousemove_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r13); const node_r10 = ctx.$implicit; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r14.onMouseMove($event, node_r10); })("mouseup", function BoardComponent_tr_34_td_1_Template_div_mouseup_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r13); const node_r10 = ctx.$implicit; const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r15.onMouseUp($event, node_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const node_r10 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("@.disabled", ctx_r9.animationsDisabled)("@nodeType", node_r10.type);
} }
function BoardComponent_tr_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, BoardComponent_tr_34_td_1_Template, 2, 2, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", row_r7);
} }
class BoardComponent {
    constructor() {
        this.board = new _models_board__WEBPACK_IMPORTED_MODULE_2__["Board"](40, 17);
        this.algorithms = new Array("Dijsktra's algorithm", "A* algorithm");
        this.activeAlgorithm = 0;
        this.algorithmsListShowed = false;
        this.dragActive = 'false';
        this.calculating = false;
        this.pathCalculated = false;
        this.animationsDisabled = false;
    }
    ngOnInit() {
    }
    visualize(delay) {
        if (this.calculating)
            return;
        this.board.clearPath();
        if (this.pathCalculated)
            this.board.clearPath();
        this.calculating = true;
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
            console.log(this.calculating);
        });
        this.pathCalculated = true;
        this.animationsDisabled = true;
    }
    clearBoard() {
        this.board.clearBoard();
        this.pathCalculated = false;
    }
    clearPath() {
        this.board.clearPath();
        this.pathCalculated = false;
    }
    toggleDiagonalEdges() {
        this.board.diagonalEdges = !this.board.diagonalEdges;
        if (this.pathCalculated)
            this.visualize(5);
    }
    toggleAlgoritmsList() {
        this.algorithmsListShowed = !this.algorithmsListShowed;
    }
    setActiveAlgorithm(index) {
        this.activeAlgorithm = index;
        if (this.pathCalculated)
            this.visualize(5);
    }
    contextMenuDisable(event) {
        event.preventDefault();
    }
    onMouseDown(event, node) {
        event.preventDefault();
        if (event.buttons == 1) {
            if (node.type == 'initial')
                this.dragActive = 'initial';
            else if (node.type == 'destination')
                this.dragActive = 'destination';
            else if (node.type == 'open' && !this.pathCalculated) {
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
        switch (this.dragActive) {
            case 'false': break;
            case 'initial':
                if (node.type != 'destination' && node.type != 'wall') {
                    if (node.type != 'initial') {
                        this.board.setInitialNode(node.x, node.y);
                        if (this.pathCalculated)
                            this.visualize(0);
                    }
                }
                else
                    this.dragActive = 'false';
                break;
            case 'destination':
                if (node.type != 'initial' && node.type != 'wall') {
                    if (node.type != 'destination') {
                        this.board.setDestinationNode(node.x, node.y);
                        if (this.pathCalculated)
                            this.visualize(0);
                    }
                }
                else
                    this.dragActive = 'false';
                break;
            case 'block':
                if (event.buttons == 1 && node.type == 'open')
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
BoardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: BoardComponent, selectors: [["app-board"]], decls: 39, vars: 3, consts: [["id", "nav-bar", 1, "bar"], [1, "btn", "board-btn", "alorithm-list-btn", 3, "click"], ["class", "algorithm-list", 4, "ngIf"], ["id", "run-btn", 1, "btn", "board-btn", 3, "click"], [1, "btn", "board-btn", 3, "click"], [1, "checkbox"], ["type", "checkbox", "id", "diagonal", "name", "diagonal", "checked", "", 3, "click"], ["for", "diagonal"], ["id", "legend-bar", 1, "bar"], [1, "legend-element"], [1, "legend-tile", "legend-tile-open"], [1, "legend-tile", "legend-tile-wall"], [1, "legend-tile", "legend-tile-initial"], [1, "legend-tile", "legend-tile-destination"], [1, "legend-tile", "legend-tile-checked"], [1, "legend-tile", "legend-tile-path"], [3, "mouseleave", "contextmenu"], [4, "ngFor", "ngForOf"], [1, "bar"], [1, "algorithm-list"], ["class", "algorithm-list-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "algorithm-list-item", 3, "click"], [1, "node", 3, "mousedown", "mousemove", "mouseup"]], template: function BoardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_1_listener() { return ctx.toggleAlgoritmsList(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, BoardComponent_div_3_Template, 2, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_4_listener() { return ctx.visualize(5); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Run Algorithm");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_6_listener() { return ctx.clearBoard(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Clear Board");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_8_listener() { return ctx.clearPath(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "Clear Path");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function BoardComponent_Template_input_click_11_listener() { return ctx.toggleDiagonalEdges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "Diagonal edges");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](16, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Open");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](19, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "Wall");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](22, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Initial");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](25, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26, "Destination");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](28, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](29, "Checked");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](31, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32, "Path");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "table", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("mouseleave", function BoardComponent_Template_table_mouseleave_33_listener() { return ctx.onMouseLeave(); })("contextmenu", function BoardComponent_Template_table_contextmenu_33_listener($event) { return ctx.contextMenuDisable($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](34, BoardComponent_tr_34_Template, 2, 1, "tr", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](36, " Right mouse button - place wall : Left mouse button - clear wall ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](37, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](38, " Initial and Destination nodes can be moved using right mouse button\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx.algorithms[ctx.activeAlgorithm], " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.algorithmsListShowed);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.board.nodes);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"]], styles: [".alorithm-list-btn[_ngcontent-%COMP%] {\n  position: relative;\n  width: 12rem;\n}\n\n.algorithm-list[_ngcontent-%COMP%] {\n  position: absolute;\n  display: block;\n  top: 0px;\n  left: 0px;\n  transform: translate3d(0px, 38px, 0px);\n  will-change: transform;\n  width: 12rem;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #b6c3cf;\n  text-align: left;\n  list-style: none;\n  background-color: #004a99;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  z-index: 1000;\n}\n\n.algorithm-list-item[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  padding: 0.25rem 0.5rem;\n  clear: both;\n  font-weight: 400;\n  color: #b6c3cf;\n  text-align: inherit;\n  white-space: nowrap;\n  background-color: transparent;\n  border: 0;\n}\n\n.algorithm-list-item[_ngcontent-%COMP%]:hover {\n  color: #b6c3cf;\n  text-decoration: none;\n  background-color: #003e80;\n}\n\n.bar[_ngcontent-%COMP%] {\n  margin: auto;\n  padding: 0.5rem 0;\n  max-width: 68rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-flow: row wrap;\n  color: #fff;\n  text-align: center;\n}\n\n.legend-element[_ngcontent-%COMP%] {\n  width: 10rem;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.legend-tile[_ngcontent-%COMP%] {\n  padding: 0;\n  width: 1.7rem;\n  height: 1.7rem;\n  border: 1px solid #112544;\n}\n\n.legend-tile-open[_ngcontent-%COMP%] {\n  background-color: #c8d1df;\n}\n\n.legend-tile-wall[_ngcontent-%COMP%] {\n  background-color: #194485;\n}\n\n.legend-tile-initial[_ngcontent-%COMP%] {\n  background-color: #0d6319;\n}\n\n.legend-tile-destination[_ngcontent-%COMP%] {\n  background-color: #960a0a;\n}\n\n.legend-tile-checked[_ngcontent-%COMP%] {\n  background-color: #8aa3cc;\n}\n\n.legend-tile-path[_ngcontent-%COMP%] {\n  background-color: #b2e05c;\n}\n\ntable[_ngcontent-%COMP%] {\n  box-sizing: content-box;\n  border: 2px solid #0c1a30;\n  border-collapse: collapse;\n  margin: auto;\n}\n\ntd[_ngcontent-%COMP%] {\n  padding: 0;\n  width: 1.7rem;\n  height: 1.7rem;\n  border: 1px solid #112544;\n  border-collapse: collapse;\n}\n\n.node[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  cursor: pointer;\n}\n\n.btn[_ngcontent-%COMP%] {\n  margin: 0 0.5rem;\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  border: 1px solid transparent;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n\n.btn[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n\n.board-btn[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n\n.board-btn[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #006adb;\n  border-color: #0063cc;\n}\n\n#run-btn[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #003e80;\n  border-color: #003e80;\n}\n\n#run-btn[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #00254d;\n  border-color: #002c5c;\n}\n\n.checkbox[_ngcontent-%COMP%] {\n  color: #fff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0Esc0NBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSw0QkFBQTtFQUNBLHFDQUFBO0VBQ0Esc0JBQUE7RUFDQSxhQUFBO0FBQ0o7O0FBRUE7RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSw2QkFBQTtFQUNBLFNBQUE7QUFDSjs7QUFFQTtFQUNJLGNBQUE7RUFDQSxxQkFBQTtFQUNBLHlCQUFBO0FBQ0o7O0FBRUE7RUFDSSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBQ0o7O0FBRUE7RUFDSSxVQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQUNKOztBQUVBO0VBQ0kseUJBQUE7QUFDSjs7QUFFQTtFQUNJLHlCQUFBO0FBQ0o7O0FBRUE7RUFDSSx5QkFBQTtBQUNKOztBQUVBO0VBQ0kseUJBQUE7QUFDSjs7QUFFQTtFQUNJLHlCQUFBO0FBQ0o7O0FBRUE7RUFDSSx5QkFBQTtBQUNKOztBQUVBO0VBQ0ksdUJBQUE7RUFDQSx5QkFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUVBO0VBQ0ksVUFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtBQUNKOztBQUVBO0VBQ0ksWUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSw2QkFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxSUFBQTtBQUNKOztBQUVBO0VBQ0ksZUFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0FBQ0o7O0FBRUE7RUFDSSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7QUFDSiIsImZpbGUiOiJib2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hbG9yaXRobS1saXN0LWJ0biB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB3aWR0aDogMTJyZW07XHJcbn1cclxuXHJcbi5hbGdvcml0aG0tbGlzdCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHRvcDogMHB4O1xyXG4gICAgbGVmdDogMHB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDM4cHgsIDBweCk7XHJcbiAgICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xyXG4gICAgd2lkdGg6IDEycmVtO1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICBtaW4td2lkdGg6IDEwcmVtO1xyXG4gICAgcGFkZGluZzogLjVyZW0gMDtcclxuICAgIG1hcmdpbjogLjEyNXJlbSAwIDA7XHJcbiAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICBjb2xvcjogI2I2YzNjZjtcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIxMSwgMTAwJSwgMzAlKTtcclxuICAgIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsMCwwLC4xNSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiAuMjVyZW07XHJcbiAgICB6LWluZGV4OiAxMDAwO1xyXG59XHJcblxyXG4uYWxnb3JpdGhtLWxpc3QtaXRlbSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogLjI1cmVtIDAuNXJlbTtcclxuICAgIGNsZWFyOiBib3RoO1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIGNvbG9yOiAjYjZjM2NmO1xyXG4gICAgdGV4dC1hbGlnbjogaW5oZXJpdDtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgIGJvcmRlcjogMDtcclxufVxyXG5cclxuLmFsZ29yaXRobS1saXN0LWl0ZW06aG92ZXIge1xyXG4gICAgY29sb3I6ICNiNmMzY2Y7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMjExLCAxMDAlLCAyNSUpO1xyXG59XHJcblxyXG4uYmFyIHtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAwO1xyXG4gICAgbWF4LXdpZHRoOiA2OHJlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5sZWdlbmQtZWxlbWVudCB7XHJcbiAgICB3aWR0aDogMTByZW07XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1mbG93OiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5sZWdlbmQtdGlsZSB7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgd2lkdGg6IDEuN3JlbTtcclxuICAgIGhlaWdodDogMS43cmVtO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDE3LCAzNywgNjgpO1xyXG59XHJcblxyXG4ubGVnZW5kLXRpbGUtb3BlbiB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjAwLCAyMDksIDIyMyk7XHJcbn1cclxuXHJcbi5sZWdlbmQtdGlsZS13YWxsIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNSwgNjgsIDEzMyk7XHJcbn1cclxuXHJcbi5sZWdlbmQtdGlsZS1pbml0aWFsIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMywgOTksIDI1KTtcclxufVxyXG5cclxuLmxlZ2VuZC10aWxlLWRlc3RpbmF0aW9uIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxNTAsIDEwLCAxMCk7XHJcbn1cclxuXHJcbi5sZWdlbmQtdGlsZS1jaGVja2VkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMzgsIDE2MywgMjA0KTtcclxufVxyXG5cclxuLmxlZ2VuZC10aWxlLXBhdGgge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE3OCwgMjI0LCA5Mik7XHJcbn1cclxuXHJcbnRhYmxlIHtcclxuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgcmdiKDEyLCAyNiwgNDgpO1xyXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuICAgIG1hcmdpbjogYXV0bztcclxufVxyXG5cclxudGQge1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIHdpZHRoOiAxLjdyZW07XHJcbiAgICBoZWlnaHQ6IDEuN3JlbTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigxNywgMzcsIDY4KTtcclxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbn1cclxuXHJcbi5ub2RlIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uYnRuIHtcclxuICAgIG1hcmdpbjogMCAwLjVyZW07XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICAgIHBhZGRpbmc6IC4zNzVyZW0gLjc1cmVtO1xyXG4gICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcclxuICAgIGJvcmRlci1yYWRpdXM6IC4yNXJlbTtcclxuICAgIHRyYW5zaXRpb246IGNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsYmFja2dyb3VuZC1jb2xvciAuMTVzIGVhc2UtaW4tb3V0LGJvcmRlci1jb2xvciAuMTVzIGVhc2UtaW4tb3V0LGJveC1zaGFkb3cgLjE1cyBlYXNlLWluLW91dDtcclxufVxyXG5cclxuLmJ0bjpob3ZlciB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5ib2FyZC1idG4ge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMjExLCAxMDAlLCA1MCUpO1xyXG4gICAgYm9yZGVyLWNvbG9yOiBoc2woMjExLCAxMDAlLCA1MCUpO1xyXG59XHJcblxyXG4uYm9hcmQtYnRuOmhvdmVyIHtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIxMSwgMTAwJSwgNDMlKTtcclxuICAgIGJvcmRlci1jb2xvcjogaHNsKDIxMSwgMTAwJSwgNDAlKTtcclxufVxyXG5cclxuI3J1bi1idG4ge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMjExLCAxMDAlLCAyNSUpO1xyXG4gICAgYm9yZGVyLWNvbG9yOiBoc2woMjExLCAxMDAlLCAyNSUpO1xyXG59XHJcblxyXG4jcnVuLWJ0bjpob3ZlciB7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgyMTEsIDEwMCUsIDE1JSk7XHJcbiAgICBib3JkZXItY29sb3I6IGhzbCgyMTEsIDEwMCUsIDE4JSk7XHJcbn1cclxuXHJcbi5jaGVja2JveCB7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxufVxyXG5cclxuXHJcbiJdfQ== */"], data: { animation: [_board_animations__WEBPACK_IMPORTED_MODULE_3__["BoardAnimations"].nodeType] } });


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
                this.nodes[y][x] = new _node__WEBPACK_IMPORTED_MODULE_0__["Node"](x, y);
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
    clearBoard() {
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++)
                this.nodes[y][x].type = 'open';
        this.getInitalNode().type = 'initial';
        this.getDestinationNode().type = 'destination';
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
        this.getNode(x, y).type = 'initial';
    }
    setDestinationNode(x, y) {
        this.getNode(this.destinationNodeCoords.x, this.destinationNodeCoords.y).type = 'open';
        this.destinationNodeCoords = { x: x, y: y };
        this.getNode(x, y).type = 'destination';
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
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = 'open';
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
            backgroundColor: 'rgb(200, 209, 223)'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('checked', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            backgroundColor: 'rgb(138, 163, 204)'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('path', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            backgroundColor: 'rgb(178, 224, 92)'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('wall', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            backgroundColor: 'rgb(25, 68, 133)'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('initial', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            backgroundColor: 'rgb(13, 99, 25)'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('destination', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            backgroundColor: 'rgb(150, 10, 10)'
        })),
        /*
        transition('initial <=> *', [
          animate(0)
        ]),
        transition('destination <=> *', [
          animate(0)
        ]),
        transition('open => checked', [
          animate(500)
        ]),
        transition('checked => *', [
          animate(0)
        ]),
        transition('path=> *', [
          animate(0)
        ]),
        transition('void => *', [
          animate(0)
        ]),*/
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
        let promises = [];
        while (!openSet.isEmpty()) {
            let current = openSet.dequeue();
            if (current == targetIndex) {
                this.setPath(nodes, targetIndex, parents, 50 * delay);
                return Promise.all(promises).then((values) => console.log(fScore[current]));
            }
            nodes.forEach(node => {
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
                            if (nodes[neighbour].type != 'initial' && nodes[neighbour].type != 'destination')
                                promises.push(AStar.checkNode(nodes[neighbour], delay));
                        }
                        else {
                            openSet.remove(neighbour);
                            openSet.add(neighbour, fScore[neighbour]);
                        }
                    }
                }
            });
        }
        return Promise.all(promises).then((values) => console.log(0));
    }
    static calculateH(node1, node2) {
        return Math.sqrt(Math.pow((node1.x - node2.x), 2) + Math.pow((node1.y - node2.y), 2));
    }
    static setPath(nodes, targetIndex, parents, delay) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let list = new Array();
            let newIndex = targetIndex;
            while (parents[newIndex] != AStar.NO_PARENT) {
                let node = nodes[parents[newIndex]];
                list.push(node);
                newIndex = parents[newIndex];
            }
            list.pop();
            list = list.reverse();
            list.forEach((element) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                const result = yield _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_2__["UtilityFunctions"].resolveWait(delay);
                if (result == 'resolved')
                    element.type = 'path';
            }));
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