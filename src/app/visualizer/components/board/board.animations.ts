import { style, animate, trigger, transition, state, keyframes, AUTO_STYLE } from '@angular/animations';

export const BoardAnimations = {
  nodeType: trigger('nodeType', [
    state('open', style({
        backgroundColor: 'hsl(222, 37%, 88%)',
        border: '1px solid hsl(218, 67%, 82%)'
    })),
    state('checked', style({
        backgroundColor: 'hsl(197, 75%, 60%)',
        border: '1px solid hsl(218, 67%, 82%)'
    })),
    state('path', style({
        backgroundColor: 'hsl(64, 92%, 63%)',
        border: 'none'
    })),
    state('wall', style({
        backgroundColor: 'hsl(216, 79%, 19%)',
        border: 'none'
    })),

    transition('open => checked', [
      animate(700, keyframes([
        style({ 
          borderRadius: '50%',
          height: '50%',
          width: '50%',
          margin: 'auto',
          backgroundColor: 'hsl(197, 90%, 45%)',
          offset: 0
        }),
        style({ 
          borderRadius: '40%',
          height: '60%',
          width: '60%',
          margin: 'auto',
          backgroundColor: 'hsl(197, 87%, 48%)',
          offset: 0.3
        }),
        style({ 
          borderRadius: '30%',
          height: '70%',
          width: '70%',
          margin: 'auto',
          backgroundColor: 'hsl(197, 84%, 51%)',
          offset: 0.55
        }),
        style({ 
          borderRadius: '20%',
          height: '80%',
          width: '80%',
          margin: 'auto',
          backgroundColor: 'hsl(197, 81%, 54%)',
          offset: 0.75
        }),
        style({ 
          borderRadius: '10%',
          height: '90%',
          width: '90%',
          margin: 'auto',
          backgroundColor: 'hsl(197, 77%, 57%)',
          offset: 0.9
        }),
        style({ 
          borderRadius: '0%',
          height: '100%',
          width: '100%',
          margin: 'auto',
          backgroundColor: 'hsl(197, 75%, 60%)',
          offset: 1
        })
      ]))
    ]),
    transition('checked => path', [
      animate(700, keyframes([
        style({
          border: 'none',
          offset: 0
        })
      ]))
    ]),
    transition('open <=> wall', [
      animate(100)
    ]),
    transition('* => *', [
      animate(0)
    ]),
  ]),    
};