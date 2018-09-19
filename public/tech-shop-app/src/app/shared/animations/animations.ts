import { trigger, transition, animate, style, state } from '@angular/animations';

export let flyInOut = trigger('flyInOut', [
                        state('in', style({opacity: 1, transform: 'translateY(0)'})),
                        transition('void => *', [
                            style({
                                opacity: 0,
                                transform: 'translateY(-100%)'
                            }),
                            animate('0.2s ease-in')
                        ]),
                        transition('* => void', [
                            animate('0.2s ease-out', 
                                style({
                                    opacity: 0,
                                    transform: 'translateY(100%)'
                                })
                            )
                        ])
                    ]);
export let fade = trigger('fade', [
    state('void', style({opacity: 0})),

    transition(':enter, :leave', [
        animate(1000)
    ])
]);

