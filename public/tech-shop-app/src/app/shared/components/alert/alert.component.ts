import { Component, OnInit, Input } from '@angular/core';
import { flyInOut } from '../../animations/animations';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css'],
    animations: [
        flyInOut
    ]
})

export class AlertComponent implements OnInit {

    @Input() messageAlert;

    constructor() { }

    ngOnInit() {

     }
}