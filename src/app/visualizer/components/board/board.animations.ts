import { style, animate, trigger, transition, state } from '@angular/animations';

export const BoardAnimations = {
  nodeType: trigger('nodeType', [
    state('open', style({
        backgroundColor: 'rgb(200, 209, 223)'
    })),
    state('checked', style({
        backgroundColor: 'rgb(138, 163, 204)'
    })),
    state('path', style({
        backgroundColor: 'rgb(178, 224, 92)'
    })),
    state('wall', style({
        backgroundColor: 'rgb(25, 68, 133)'
    })),
    state('initial', style({
        backgroundColor: 'rgb(13, 99, 25)'
    })),
    state('destination', style({
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
    transition('* => *', [
      animate(0)
    ]),
  ]),    
};