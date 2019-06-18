import { Component, OnInit } from '@angular/core';
import { Pic } from './pic/pic.model';
import { PicsService } from './pics.service';
import { Subscription, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';


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
  searchField: String = '';
  greyScaleEnable: boolean = false;
  isLoading: boolean;
  namesToSearch = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.isLoading = true;
    this.picsService.getPics(this.greyScaleEnable);
    this.picsSub = this.picsService.getPicsUpdatedListener()
    .subscribe((picsData: Pic[]) => {
      this.isLoading = false;
      this.pics = picsData;
      this.namesToSearch = picsData.map((pic) => { return pic.author; });
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }


  generatePics(){
    this.picsService.getPics(this.greyScaleEnable);
  }

  searchPics(){
    if(this.searchField === ''){
      alert('There is no key entered to search!');
      return;
    }
    this.picsService.getSearchedPics(this.searchField);
    this.searchField = '';
  }

  changePicsVisual(){
    this.picsService.getGrayscalePics(this.greyScaleEnable);
  }
  showAllPics(){
    this.picsService.getAllDisplayedList(this.greyScaleEnable);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.namesToSearch.filter(nameToSearch => nameToSearch.toLowerCase().indexOf(filterValue) === 0);
  }
}
