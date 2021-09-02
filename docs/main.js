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
                for (let i = 0; i < nodes.length; i++) {
                    let edgeWeight = board.getEdgeWeight(nodes[nearestNodeIndex], nodes[i]);
                    if (edgeWeight > 0 && ((shortestDistance + edgeWeight) < shortestDistances[i])) {
                        parents[i] = nearestNodeIndex;
                        shortestDistances[i] = shortestDistance + edgeWeight;
                    }
                }
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
/* harmony import */ var _models_board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/board */ "O64k");
/* harmony import */ var _board_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./board.animations */ "pg/H");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






function BoardComponent_div_3_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function BoardComponent_div_3_div_1_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6); const i_r4 = ctx.index; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r5.setActiveAlgorithm(i_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const algorithm_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", algorithm_r3, " ");
} }
function BoardComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, BoardComponent_div_3_div_1_Template, 2, 1, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r0.algorithms);
} }
function BoardComponent_tr_39_td_1__svg_svg_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "svg", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "path", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function BoardComponent_tr_39_td_1__svg_svg_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "svg", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "path", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "path", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function BoardComponent_tr_39_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("mousedown", function BoardComponent_tr_39_td_1_Template_div_mousedown_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r15); const node_r10 = ctx.$implicit; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r14.onMouseDown($event, node_r10); })("mousemove", function BoardComponent_tr_39_td_1_Template_div_mousemove_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r15); const node_r10 = ctx.$implicit; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r16.onMouseMove($event, node_r10); })("mouseup", function BoardComponent_tr_39_td_1_Template_div_mouseup_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r15); const node_r10 = ctx.$implicit; const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r17.onMouseUp($event, node_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, BoardComponent_tr_39_td_1__svg_svg_2_Template, 2, 0, "svg", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, BoardComponent_tr_39_td_1__svg_svg_3_Template, 3, 0, "svg", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const node_r10 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("@.disabled", ctx_r9.animationsDisabled)("@nodeType", node_r10.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", node_r10.x == ctx_r9.board.getInitalNode().x && node_r10.y == ctx_r9.board.getInitalNode().y);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", node_r10.x == ctx_r9.board.getDestinationNode().x && node_r10.y == ctx_r9.board.getDestinationNode().y);
} }
function BoardComponent_tr_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, BoardComponent_tr_39_td_1_Template, 4, 4, "td", 21);
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
        this.algorithmDelay = 1;
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
            console.log(this.calculating);
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
BoardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: BoardComponent, selectors: [["app-board"]], decls: 44, vars: 3, consts: [["id", "nav-bar", 1, "bar"], [1, "btn", "board-btn", "alorithm-list-btn", 3, "click"], ["class", "algorithm-list", 4, "ngIf"], ["id", "run-btn", 1, "btn", "board-btn", 3, "click"], [1, "btn", "board-btn", 3, "click"], [1, "checkbox"], ["type", "checkbox", "id", "diagonal", "name", "diagonal", "checked", "", 3, "click"], ["for", "diagonal"], ["id", "legend-bar", 1, "bar"], [1, "legend-element"], [1, "legend-tile", "legend-tile-open"], [1, "legend-tile", "legend-tile-wall"], [1, "legend-tile", "legend-tile-checked"], [1, "legend-tile", "legend-tile-path"], [1, "legend-tile", "legend-tile-icons"], ["xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "bi", "bi-arrow-right-circle"], ["fill-rule", "evenodd", "d", "M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"], ["xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "bi", "bi-stop-circle"], ["d", "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"], ["d", "M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"], [3, "mouseleave", "contextmenu"], [4, "ngFor", "ngForOf"], [1, "bar"], [1, "algorithm-list"], ["class", "algorithm-list-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "algorithm-list-item", 3, "click"], [1, "node", 3, "mousedown", "mousemove", "mouseup"], ["class", "svg-node", "xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "fill", "currentColor", "class", "bi bi-arrow-right-circle", "viewBox", "0 0 16 16", 4, "ngIf"], ["class", "svg-node", "xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "fill", "currentColor", "class", "bi bi-stop-circle", "viewBox", "0 0 16 16", 4, "ngIf"]], template: function BoardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_1_listener() { return ctx.toggleAlgoritmsList(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, BoardComponent_div_3_Template, 2, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_4_listener() { return ctx.visualize(ctx.algorithmDelay); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Checked");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](25, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26, "Path");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "svg", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](30, "path", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](31, " Initial Node ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "svg", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](35, "path", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](36, "path", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37, " Destination Node ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "table", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("mouseleave", function BoardComponent_Template_table_mouseleave_38_listener() { return ctx.onMouseLeave(); })("contextmenu", function BoardComponent_Template_table_contextmenu_38_listener($event) { return ctx.contextMenuDisable($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](39, BoardComponent_tr_39_Template, 2, 1, "tr", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](41, " Right mouse button - place wall : Left mouse button - clear wall ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](42, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](43, " Initial and Destination nodes can be moved using right mouse button\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx.algorithms[ctx.activeAlgorithm], " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.algorithmsListShowed);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](36);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.board.nodes);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"]], styles: [".bar[_ngcontent-%COMP%] {\n  margin: auto;\n  padding: 0.5rem 0;\n  max-width: 68rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-flow: row wrap;\n  color: #fff;\n  text-align: center;\n}\n.bar[_ngcontent-%COMP%]   .alorithm-list-btn[_ngcontent-%COMP%] {\n  position: relative;\n  width: 12rem;\n}\n.bar[_ngcontent-%COMP%]   .algorithm-list[_ngcontent-%COMP%] {\n  position: absolute;\n  display: block;\n  top: 0px;\n  left: 0px;\n  transform: translate3d(0px, 38px, 0px);\n  will-change: transform;\n  width: 12rem;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #b6c3cf;\n  text-align: left;\n  list-style: none;\n  background-color: #004a99;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  z-index: 1000;\n}\n.bar[_ngcontent-%COMP%]   .algorithm-list[_ngcontent-%COMP%]   .algorithm-list-item[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  padding: 0.25rem 0.5rem;\n  clear: both;\n  font-weight: 400;\n  color: #b6c3cf;\n  text-align: inherit;\n  white-space: nowrap;\n  background-color: transparent;\n  border: 0;\n}\n.bar[_ngcontent-%COMP%]   .algorithm-list[_ngcontent-%COMP%]   .algorithm-list-item[_ngcontent-%COMP%]:hover {\n  color: #b6c3cf;\n  text-decoration: none;\n  background-color: #003e80;\n}\n.bar[_ngcontent-%COMP%]   .legend-element[_ngcontent-%COMP%] {\n  width: 10rem;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n  justify-content: center;\n}\n.bar[_ngcontent-%COMP%]   .legend-tile[_ngcontent-%COMP%] {\n  padding: 0;\n  width: 1.7rem;\n  height: 1.7rem;\n  border: 1px solid #112544;\n}\n.bar[_ngcontent-%COMP%]   .legend-tile-open[_ngcontent-%COMP%] {\n  background-color: #d5dcec;\n}\n.bar[_ngcontent-%COMP%]   .legend-tile-wall[_ngcontent-%COMP%] {\n  background-color: #0a2957;\n}\n.bar[_ngcontent-%COMP%]   .legend-tile-checked[_ngcontent-%COMP%] {\n  background-color: #4dbae6;\n}\n.bar[_ngcontent-%COMP%]   .legend-tile-path[_ngcontent-%COMP%] {\n  background-color: #ecf74a;\n}\n.bar[_ngcontent-%COMP%]   .legend-tile-icons[_ngcontent-%COMP%] {\n  border: none;\n}\n.btn[_ngcontent-%COMP%] {\n  margin: 0 0.5rem;\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  border: 1px solid transparent;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n.board-btn[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.board-btn[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #006adb;\n  border-color: #0063cc;\n}\n#run-btn[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #003e80;\n  border-color: #003e80;\n}\n#run-btn[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #00254d;\n  border-color: #002c5c;\n}\n.checkbox[_ngcontent-%COMP%] {\n  color: #fff;\n}\ntable[_ngcontent-%COMP%] {\n  box-sizing: content-box;\n  border: 2px solid #0c1a30;\n  border-collapse: collapse;\n  margin: auto;\n  background-color: #d5dcec;\n}\ntable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0;\n  width: 1.7rem;\n  height: 1.7rem;\n  border-collapse: collapse;\n}\ntable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .node[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  margin: auto;\n  cursor: pointer;\n  border: 1px solid #b2c9f0;\n}\nsvg[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUFDSjtBQUNJO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0FBQ1I7QUFFSTtFQUNJLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0Esc0NBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSw0QkFBQTtFQUNBLHFDQUFBO0VBQ0Esc0JBQUE7RUFDQSxhQUFBO0FBQVI7QUFFUTtFQUNJLGNBQUE7RUFDQSxXQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLDZCQUFBO0VBQ0EsU0FBQTtBQUFaO0FBR1E7RUFDSSxjQUFBO0VBQ0EscUJBQUE7RUFDQSx5QkFBQTtBQURaO0FBS0k7RUFDSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQUhSO0FBTUk7RUFDSSxVQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQUpSO0FBT0k7RUFDSSx5QkFBQTtBQUxSO0FBUUk7RUFDSSx5QkFBQTtBQU5SO0FBU0k7RUFDSSx5QkFBQTtBQVBSO0FBVUk7RUFDSSx5QkFBQTtBQVJSO0FBV0k7RUFDSSxZQUFBO0FBVFI7QUFhQTtFQUNJLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLDZCQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLHFJQUFBO0FBVko7QUFhQTtFQUNJLGVBQUE7QUFWSjtBQWFBO0VBQ0ksV0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUFWSjtBQWFBO0VBQ0ksV0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUFWSjtBQWFBO0VBQ0ksV0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUFWSjtBQWFBO0VBQ0ksV0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUFWSjtBQWFBO0VBQ0ksV0FBQTtBQVZKO0FBY0E7RUFDSSx1QkFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7QUFYSjtBQVlJO0VBQ0ksVUFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7QUFWUjtBQVlRO0VBQ0ksWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBVlo7QUFlQTtFQUNJLFlBQUE7RUFDQSxXQUFBO0FBWkoiLCJmaWxlIjoiYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYmFyIHtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAwO1xyXG4gICAgbWF4LXdpZHRoOiA2OHJlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gICAgLmFsb3JpdGhtLWxpc3QtYnRuIHtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgd2lkdGg6IDEycmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5hbGdvcml0aG0tbGlzdCB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIHRvcDogMHB4O1xyXG4gICAgICAgIGxlZnQ6IDBweDtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMzhweCwgMHB4KTtcclxuICAgICAgICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xyXG4gICAgICAgIHdpZHRoOiAxMnJlbTtcclxuICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICBtaW4td2lkdGg6IDEwcmVtO1xyXG4gICAgICAgIHBhZGRpbmc6IC41cmVtIDA7XHJcbiAgICAgICAgbWFyZ2luOiAuMTI1cmVtIDAgMDtcclxuICAgICAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICAgICAgY29sb3I6ICNiNmMzY2Y7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgICAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgyMTEsIDEwMCUsIDMwJSk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsMCwwLC4xNSk7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogLjI1cmVtO1xyXG4gICAgICAgIHotaW5kZXg6IDEwMDA7XHJcbiAgICBcclxuICAgICAgICAuYWxnb3JpdGhtLWxpc3QtaXRlbSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgcGFkZGluZzogLjI1cmVtIDAuNXJlbTtcclxuICAgICAgICAgICAgY2xlYXI6IGJvdGg7XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjYjZjM2NmO1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBpbmhlcml0O1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgICAgICAgICAgYm9yZGVyOiAwO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC5hbGdvcml0aG0tbGlzdC1pdGVtOmhvdmVyIHtcclxuICAgICAgICAgICAgY29sb3I6ICNiNmMzY2Y7XHJcbiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIxMSwgMTAwJSwgMjUlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmxlZ2VuZC1lbGVtZW50IHtcclxuICAgICAgICB3aWR0aDogMTByZW07XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWZsb3c6IGNvbHVtbjtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAubGVnZW5kLXRpbGUge1xyXG4gICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgd2lkdGg6IDEuN3JlbTtcclxuICAgICAgICBoZWlnaHQ6IDEuN3JlbTtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTcsIDM3LCA2OCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5sZWdlbmQtdGlsZS1vcGVuIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMjIyLCAzNyUsIDg4JSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5sZWdlbmQtdGlsZS13YWxsIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMjE2LCA3OSUsIDE5JSk7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAubGVnZW5kLXRpbGUtY2hlY2tlZCB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDE5NywgNzUlLCA2MCUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAubGVnZW5kLXRpbGUtcGF0aCB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDY0LCA5MiUsIDYzJSk7XHJcbiAgICB9XHJcblxyXG4gICAgLmxlZ2VuZC10aWxlLWljb25zIHtcclxuICAgICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5idG4ge1xyXG4gICAgbWFyZ2luOiAwIDAuNXJlbTtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xyXG4gICAgcGFkZGluZzogLjM3NXJlbSAuNzVyZW07XHJcbiAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICBsaW5lLWhlaWdodDogMS41O1xyXG4gICAgYm9yZGVyLXJhZGl1czogLjI1cmVtO1xyXG4gICAgdHJhbnNpdGlvbjogY29sb3IgLjE1cyBlYXNlLWluLW91dCxiYWNrZ3JvdW5kLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsYm9yZGVyLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsYm94LXNoYWRvdyAuMTVzIGVhc2UtaW4tb3V0O1xyXG59XHJcblxyXG4uYnRuOmhvdmVyIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmJvYXJkLWJ0biB7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgyMTEsIDEwMCUsIDUwJSk7XHJcbiAgICBib3JkZXItY29sb3I6IGhzbCgyMTEsIDEwMCUsIDUwJSk7XHJcbn1cclxuXHJcbi5ib2FyZC1idG46aG92ZXIge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMjExLCAxMDAlLCA0MyUpO1xyXG4gICAgYm9yZGVyLWNvbG9yOiBoc2woMjExLCAxMDAlLCA0MCUpO1xyXG59XHJcblxyXG4jcnVuLWJ0biB7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgyMTEsIDEwMCUsIDI1JSk7XHJcbiAgICBib3JkZXItY29sb3I6IGhzbCgyMTEsIDEwMCUsIDI1JSk7XHJcbn1cclxuXHJcbiNydW4tYnRuOmhvdmVyIHtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIxMSwgMTAwJSwgMTUlKTtcclxuICAgIGJvcmRlci1jb2xvcjogaHNsKDIxMSwgMTAwJSwgMTglKTtcclxufVxyXG5cclxuLmNoZWNrYm94IHtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG5cclxudGFibGUge1xyXG4gICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMTIsIDI2LCA0OCk7XHJcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIyMiwgMzclLCA4OCUpO1xyXG4gICAgdGQge1xyXG4gICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgd2lkdGg6IDEuN3JlbTtcclxuICAgICAgICBoZWlnaHQ6IDEuN3JlbTtcclxuICAgICAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC5ub2RlIHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGhzbCgyMTgsIDY3JSwgODIlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbnN2Z3tcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG5cclxuIl19 */"], data: { animation: [_board_animations__WEBPACK_IMPORTED_MODULE_3__["BoardAnimations"].nodeType] } });


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
            backgroundColor: 'hsl(222, 37%, 88%)'
        })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('checked', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
            backgroundColor: 'hsl(197, 75%, 60%)'
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
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])(700)
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
                        yield AStar.setPath(nodes, sourceIndex, targetIndex, parents, delay * 5);
                        return new Promise(resolve => resolve(fScore[current]));
                    }
                }
                nodes.forEach((node) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
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