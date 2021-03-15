import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  @Input() checked = false;
  @Input() disabled = false;
  @Output() changeValue = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public changeToggle(event): void {
    this.changeValue.emit(event.srcElement.checked);
  }

}
