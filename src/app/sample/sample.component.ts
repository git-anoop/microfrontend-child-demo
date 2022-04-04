import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-sample',
  template: `<div style="border: blue solid 1px">
    <p>Micro App</p>
    <p>Data from Parent via EventEmitter: {{dataFromParent}}</p>
    <p>Data from Parent from LocalStorage:</p>
    <p>Workstation Id: {{workstationid}}</p>
    <p>Office Id: {{officeid}}</p>
    <input [(ngModel)]="input" [value]="input" (keydown.enter)="send()">
  </div>`,
  styles: []
})
export class SampleComponent implements OnChanges, OnInit {
  @Input() dataFromParent: string;
  @Output() emitDataToParent = new EventEmitter<string>();
  workstationid: string;
  officeid: string;
  input: string;
  ifLoaded = false;
  constructor() { }

  send() {
    this.emitDataToParent.emit(this.input);
    this.input = '';
  }

  ngOnInit(): void {
    if (this.ifLoaded) {
      // this code is only going to be run once
      console.log(this.dataFromParent);
      this.workstationid = localStorage.getItem('WorkStationId');
      this.officeid = localStorage.getItem('OfficeId');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.ifLoaded) {
      this.ifLoaded = true;
      this.ngOnInit();
    }
    // any code that needs to be run every time a change is made
  }
}
