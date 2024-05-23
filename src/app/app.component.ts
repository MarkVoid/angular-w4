import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

type Direction = 'top' | 'left' | 'right' | 'bottom';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  lightStates: Record<Direction, string> = { top: 'red', left: 'red', right: 'red', bottom: 'red' };
  lightIndex: number = 0;
  intervalId: any;
  isAccident: boolean = false;
  isAccidentButtonDisabled: boolean = false;
  lightColors = ['red', 'yellow', 'green'];
  intervals = [5000, 2000, 5000];

  ngOnInit() {
    this.startTrafficLights();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startTrafficLights() {
    this.switchingLights();
    this.intervalId = setInterval(() => this.switchingLights(), this.intervals[this.lightIndex]);
  }

  switchingLights() {
    this.lightIndex = (this.lightIndex + 1) % 3;
    if (this.lightIndex === 0) {
      this.lightStates = { top: 'green', left: 'red', right: 'red', bottom: 'green' };
    } else if (this.lightIndex === 1) {
      this.lightStates = { top: 'yellow', left: 'yellow', right: 'yellow', bottom: 'yellow' };
    } else {
      this.lightStates = { top: 'red', left: 'green', right: 'green', bottom: 'red' };
    }
  }

  crossStreet(direction: Direction) {
    if (this.lightStates[direction] === 'yellow') {
      alert('Неправилно пресичане');
    } else if (this.lightStates[direction] === 'green') {
      alert('Премина успешно');
    }
  }

  AccidentButton() {
    clearInterval(this.intervalId);
    this.isAccident = true;
    this.isAccidentButtonDisabled = true;
    this.lightStates = { top: 'yellow', left: 'yellow', right: 'yellow', bottom: 'yellow' };
    this.lightIndex = 1;
    alert('Има авария 10 секунди');

    setTimeout(() => {
      this.isAccident = false;
      this.startTrafficLights();
      setTimeout(() => {
        this.isAccidentButtonDisabled = false;
      }, 10000);
    }, 10000);
  }

  getButtonState(direction: Direction): boolean {
    return this.lightStates[direction] === 'red';
  }
}
