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

  getPics(){
    let page = Math.floor(Math.random() * (33 - 1) ) + 1;
    this.httpClient.get<any>('https://picsum.photos/v2/list?page=' + page)
    .pipe(
      map((picsData) => {
        return picsData.map((pic) => {
          var urlArr = pic.download_url.split('/');
          urlArr.pop();
          urlArr.pop();
          return { author: pic.author , url: urlArr.join('/') + '/300' }
        })
      })
    )
    .subscribe((transformedPics) => {
        this.pics = transformedPics;
        this.picsUpdated.next(this.pics);

      }
    )

  }

  getPicsUpdatedListener() {
    return this.picsUpdated.asObservable();
  }

}
