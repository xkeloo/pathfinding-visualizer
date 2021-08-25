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
class DijkstrasAlgorithm {
    static calculatePath(board, sourceIndex, targetIndex) {
        let nodes = board.getNodeList();
        let shortestDistances = new Array(nodes.length);
        let added = new Array(nodes.length);
        for (let i = 0; i < nodes.length; i++) {
            shortestDistances[i] = Number.POSITIVE_INFINITY;
            added[i] = false;
        }
        shortestDistances[sourceIndex] = 0;
        let parents = new Array(nodes.length);
        parents[sourceIndex] = DijkstrasAlgorithm.NO_PARENT;
        for (let i = 0; i < nodes.length; i++) {
            let nearestNodeIndex = -1;
            let shortestDistance = Number.POSITIVE_INFINITY;
            for (let i = 0; i < nodes.length; i++) {
                if (!added[i] && shortestDistances[i] < shortestDistance) {
                    shortestDistance = shortestDistances[i];
                    nearestNodeIndex = i;
                }
            }
            added[nearestNodeIndex] = true;
            if (nearestNodeIndex != sourceIndex && nearestNodeIndex != targetIndex) {
                nodes[nearestNodeIndex].type = 'checked';
            }
            if (nearestNodeIndex == targetIndex) {
                DijkstrasAlgorithm.setPath(nodes, targetIndex, parents);
                return shortestDistances[targetIndex];
            }
            for (let i = 0; i < nodes.length; i++) {
                let edgeWeight = board.getEdgeWeight(nodes[nearestNodeIndex], nodes[i]);
                if (edgeWeight > 0 && ((shortestDistance + edgeWeight) < shortestDistances[i])) {
                    parents[i] = nearestNodeIndex;
                    shortestDistances[i] = shortestDistance + edgeWeight;
                }
            }
        }
        return 0;
    }
    static setPath(nodes, targetIndex, parents) {
        let list = new Array();
        let newIndex = targetIndex;
        while (parents[newIndex] != DijkstrasAlgorithm.NO_PARENT) {
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
/* harmony import */ var _models_algorithms_pathfinding_dijkstrasAlghorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/algorithms/pathfinding/dijkstrasAlghorithm */ "CR74");
/* harmony import */ var _models_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/board */ "O64k");
/* harmony import */ var _board_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./board.animations */ "pg/H");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");





function BoardComponent_tr_31_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mousedown", function BoardComponent_tr_31_td_1_Template_div_mousedown_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7); const node_r4 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r6.onMouseDown($event, node_r4); })("mousemove", function BoardComponent_tr_31_td_1_Template_div_mousemove_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7); const node_r4 = ctx.$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r8.onMouseMove($event, node_r4); })("mouseup", function BoardComponent_tr_31_td_1_Template_div_mouseup_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7); const node_r4 = ctx.$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r9.onMouseUp($event, node_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const node_r4 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@.disabled", ctx_r3.animationsDisabled)("@nodeType", node_r4.type);
} }
function BoardComponent_tr_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, BoardComponent_tr_31_td_1_Template, 2, 2, "td", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", row_r1);
} }
class BoardComponent {
    constructor() {
        this.board = new _models_board__WEBPACK_IMPORTED_MODULE_1__["Board"](40, 17);
        this.dragActive = 'false';
        this.pathCalculated = false;
        this.animationsDisabled = false;
    }
    ngOnInit() {
    }
    visualize() {
        this.board.clearPath();
        console.log(_models_algorithms_pathfinding_dijkstrasAlghorithm__WEBPACK_IMPORTED_MODULE_0__["DijkstrasAlgorithm"].calculatePath(this.board, this.board.getNodeList().indexOf(this.board.getInitalNode()), this.board.getNodeList().indexOf(this.board.getDestinationNode())));
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
            this.visualize();
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
                    this.board.setInitialNode(node.x, node.y);
                    if (this.pathCalculated)
                        this.visualize();
                }
                else
                    this.dragActive = 'false';
                break;
            case 'destination':
                if (node.type != 'initial' && node.type != 'wall') {
                    this.board.setDestinationNode(node.x, node.y);
                    if (this.pathCalculated)
                        this.visualize();
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
BoardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: BoardComponent, selectors: [["app-board"]], decls: 36, vars: 1, consts: [["id", "nav-bar", 1, "bar"], ["id", "run-btn", 1, "btn", "board-btn", 3, "click"], [1, "btn", "board-btn", 3, "click"], [1, "checkbox"], ["type", "checkbox", "id", "diagonal", "name", "diagonal", "checked", "", 3, "click"], ["for", "diagonal"], ["id", "legend-bar", 1, "bar"], [1, "legend-element"], [1, "legend-tile", "legend-tile-open"], [1, "legend-tile", "legend-tile-wall"], [1, "legend-tile", "legend-tile-initial"], [1, "legend-tile", "legend-tile-destination"], [1, "legend-tile", "legend-tile-checked"], [1, "legend-tile", "legend-tile-path"], [3, "mouseleave", "contextmenu"], [4, "ngFor", "ngForOf"], [1, "bar"], [1, "node", 3, "mousedown", "mousemove", "mouseup"]], template: function BoardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_1_listener() { return ctx.visualize(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Run Algorithm");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_3_listener() { return ctx.clearBoard(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Clear Board");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BoardComponent_Template_div_click_5_listener() { return ctx.clearPath(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Clear Path");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BoardComponent_Template_input_click_8_listener() { return ctx.toggleDiagonalEdges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Diagonal edges");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Open");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](16, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Wall");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](19, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "Initial");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](22, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Destination");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](25, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "Checked");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](28, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29, "Path");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "table", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseleave", function BoardComponent_Template_table_mouseleave_30_listener() { return ctx.onMouseLeave(); })("contextmenu", function BoardComponent_Template_table_contextmenu_30_listener($event) { return ctx.contextMenuDisable($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, BoardComponent_tr_31_Template, 2, 1, "tr", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, " Right mouse button - place wall : Left mouse button - clear wall ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](34, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, " Initial and Destination nodes can be moved using right mouse button\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.board.nodes);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]], styles: [".bar[_ngcontent-%COMP%] {\n  margin: auto;\n  padding: 0.5rem 0;\n  max-width: 68rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-flow: row wrap;\n  color: #fff;\n  text-align: center;\n}\n\n.legend-element[_ngcontent-%COMP%] {\n  width: 10rem;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.legend-tile[_ngcontent-%COMP%] {\n  padding: 0;\n  width: 1.7rem;\n  height: 1.7rem;\n  border: 1px solid #112544;\n}\n\n.legend-tile-open[_ngcontent-%COMP%] {\n  background-color: #c8d1df;\n}\n\n.legend-tile-wall[_ngcontent-%COMP%] {\n  background-color: #194485;\n}\n\n.legend-tile-initial[_ngcontent-%COMP%] {\n  background-color: #0d6319;\n}\n\n.legend-tile-destination[_ngcontent-%COMP%] {\n  background-color: #960a0a;\n}\n\n.legend-tile-checked[_ngcontent-%COMP%] {\n  background-color: #8aa3cc;\n}\n\n.legend-tile-path[_ngcontent-%COMP%] {\n  background-color: #b2e05c;\n}\n\ntable[_ngcontent-%COMP%] {\n  box-sizing: content-box;\n  border: 2px solid #0c1a30;\n  border-collapse: collapse;\n  margin: auto;\n}\n\ntd[_ngcontent-%COMP%] {\n  padding: 0;\n  width: 1.7rem;\n  height: 1.7rem;\n  border: 1px solid #112544;\n  border-collapse: collapse;\n}\n\n.node[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  cursor: pointer;\n}\n\n.btn[_ngcontent-%COMP%] {\n  margin: 0 0.5rem;\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  border: 1px solid transparent;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n\n.btn[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n\n.board-btn[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n\n.board-btn[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #006adb;\n  border-color: #0063cc;\n}\n\n#run-btn[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #003e80;\n  border-color: #003e80;\n}\n\n#run-btn[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #00254d;\n  border-color: #002c5c;\n}\n\n.checkbox[_ngcontent-%COMP%] {\n  color: #fff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBQ0o7O0FBRUE7RUFDSSxVQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQUNKOztBQUVBO0VBQ0kseUJBQUE7QUFDSjs7QUFFQTtFQUNJLHlCQUFBO0FBQ0o7O0FBRUE7RUFDSSx5QkFBQTtBQUNKOztBQUVBO0VBQ0kseUJBQUE7QUFDSjs7QUFFQTtFQUNJLHlCQUFBO0FBQ0o7O0FBRUE7RUFDSSx5QkFBQTtBQUNKOztBQUVBO0VBQ0ksdUJBQUE7RUFDQSx5QkFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUVBO0VBQ0ksVUFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtBQUNKOztBQUVBO0VBQ0ksWUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSw2QkFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxSUFBQTtBQUNKOztBQUVBO0VBQ0ksZUFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0FBQ0o7O0FBRUE7RUFDSSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7QUFDSiIsImZpbGUiOiJib2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5iYXIge1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgcGFkZGluZzogMC41cmVtIDA7XHJcbiAgICBtYXgtd2lkdGg6IDY4cmVtO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGZsZXgtZmxvdzogcm93IHdyYXA7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmxlZ2VuZC1lbGVtZW50IHtcclxuICAgIHdpZHRoOiAxMHJlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWZsb3c6IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmxlZ2VuZC10aWxlIHtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICB3aWR0aDogMS43cmVtO1xyXG4gICAgaGVpZ2h0OiAxLjdyZW07XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTcsIDM3LCA2OCk7XHJcbn1cclxuXHJcbi5sZWdlbmQtdGlsZS1vcGVuIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMDAsIDIwOSwgMjIzKTtcclxufVxyXG5cclxuLmxlZ2VuZC10aWxlLXdhbGwge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1LCA2OCwgMTMzKTtcclxufVxyXG5cclxuLmxlZ2VuZC10aWxlLWluaXRpYWwge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEzLCA5OSwgMjUpO1xyXG59XHJcblxyXG4ubGVnZW5kLXRpbGUtZGVzdGluYXRpb24ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE1MCwgMTAsIDEwKTtcclxufVxyXG5cclxuLmxlZ2VuZC10aWxlLWNoZWNrZWQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEzOCwgMTYzLCAyMDQpO1xyXG59XHJcblxyXG4ubGVnZW5kLXRpbGUtcGF0aCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTc4LCAyMjQsIDkyKTtcclxufVxyXG5cclxudGFibGUge1xyXG4gICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMTIsIDI2LCA0OCk7XHJcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG59XHJcblxyXG50ZCB7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgd2lkdGg6IDEuN3JlbTtcclxuICAgIGhlaWdodDogMS43cmVtO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDE3LCAzNywgNjgpO1xyXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxufVxyXG5cclxuLm5vZGUge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5idG4ge1xyXG4gICAgbWFyZ2luOiAwIDAuNXJlbTtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xyXG4gICAgcGFkZGluZzogLjM3NXJlbSAuNzVyZW07XHJcbiAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICBsaW5lLWhlaWdodDogMS41O1xyXG4gICAgYm9yZGVyLXJhZGl1czogLjI1cmVtO1xyXG4gICAgdHJhbnNpdGlvbjogY29sb3IgLjE1cyBlYXNlLWluLW91dCxiYWNrZ3JvdW5kLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsYm9yZGVyLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsYm94LXNoYWRvdyAuMTVzIGVhc2UtaW4tb3V0O1xyXG59XHJcblxyXG4uYnRuOmhvdmVyIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmJvYXJkLWJ0biB7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgyMTEsIDEwMCUsIDUwJSk7XHJcbiAgICBib3JkZXItY29sb3I6IGhzbCgyMTEsIDEwMCUsIDUwJSk7XHJcbn1cclxuXHJcbi5ib2FyZC1idG46aG92ZXIge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMjExLCAxMDAlLCA0MyUpO1xyXG4gICAgYm9yZGVyLWNvbG9yOiBoc2woMjExLCAxMDAlLCA0MCUpO1xyXG59XHJcblxyXG4jcnVuLWJ0biB7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCgyMTEsIDEwMCUsIDI1JSk7XHJcbiAgICBib3JkZXItY29sb3I6IGhzbCgyMTEsIDEwMCUsIDI1JSk7XHJcbn1cclxuXHJcbiNydW4tYnRuOmhvdmVyIHtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIxMSwgMTAwJSwgMTUlKTtcclxuICAgIGJvcmRlci1jb2xvcjogaHNsKDIxMSwgMTAwJSwgMTglKTtcclxufVxyXG5cclxuLmNoZWNrYm94IHtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG5cclxuIl19 */"], data: { animation: [_board_animations__WEBPACK_IMPORTED_MODULE_2__["BoardAnimations"].nodeType] } });


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