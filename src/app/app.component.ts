import { Component, OnInit } from '@angular/core';
import { Pic } from './pic/pic.model';
import { PicsService } from './pics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private picsService: PicsService) {}
  title = 'PicsGenerator';
  pics: Pic[] = [];
  private picsSub: Subscription;
  isLoading: boolean;
  ngOnInit() {
    this.isLoading = true;
    this.picsService.getPics();
    this.picsSub = this.picsService.getPicsUpdatedListener()
    .subscribe((picsData: Pic[]) => {
      this.isLoading = false;
      this.pics = picsData;
    });
  }

  generatePics(){
    this.isLoading = true;
    this.picsService.getPics();
    this.picsSub = this.picsService.getPicsUpdatedListener()
    .subscribe((picsData: Pic[]) => {
      this.isLoading = false;
      this.pics = picsData;
    });
  }
}
