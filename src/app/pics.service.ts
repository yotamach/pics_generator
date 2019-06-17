import { Injectable } from '@angular/core';
import { Pic } from './pic/pic.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PicsService {

  constructor(private httpClient: HttpClient) { }
  pics: Pic[] = [];
  private picsUpdated = new Subject<Pic[]>();
  displayedPics: Pic[] = [];

  getPics(greyScaleEnable){
    let page = Math.floor(Math.random() * (33 - 1) ) + 1;
    this.httpClient.get<any>('https://picsum.photos/v2/list?page=' + page)
    .pipe(
      map((picsData) => {
        return picsData.map((pic) => {
          var urlArr = pic.download_url.split('/');
          urlArr.pop();
          urlArr.pop();
          let gSstr = greyScaleEnable ? '?grayscale' : '';
          return { author: pic.author , url: urlArr.join('/') + '/300' + gSstr }
        })
      })
    )
    .subscribe((transformedPics) => {
        this.pics = transformedPics;
        this.displayedPics = this.pics;
        this.picsUpdated.next(this.pics);

      }
    )

  }

  getPicsUpdatedListener() {
    return this.picsUpdated.asObservable();
  }

  getGrayscalePics(greyScaleEnable: boolean) {
    if(greyScaleEnable){
      this.displayedPics = this.displayedPics.map((pic) => {
        return { author: pic.author , url: pic.url + '?grayscale' };
      });
    }else{
      this.displayedPics = this.displayedPics.map((pic) => {
        return { author: pic.author , url: pic.url.replace('?grayscale', '') };
      });
    }
    this.picsUpdated.next(this.displayedPics);
  }

  getSearchedPics(keyword){
    if(keyword === ''){
      this.displayedPics = this.pics;
    }
    this.displayedPics = this.displayedPics.filter((pic) => {
      return (pic.author).includes(keyword);
    });
    this.picsUpdated.next(this.displayedPics);
  }

}
