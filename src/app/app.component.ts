import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'egg-timer';
  timeLeft: number = 0;
  timerSubscription?: Subscription;
  alarm = new Audio('assets/alarm.mp3'); // Ensure you add an alarm.mp3 file in assets folder

  startTimer(seconds: number) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Reset if already running
    }
    this.timeLeft = seconds;
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timerSubscription?.unsubscribe();
        this.alarm.play();
      }
    });
  }
}
