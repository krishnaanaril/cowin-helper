import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CenterForWeek } from '../models/center-for-week';
import { WatchService } from '../services/watch.service';

@Component({
  selector: 'ch-watch-details',
  templateUrl: './watch-details.component.html',
  styleUrls: ['./watch-details.component.scss']
})
export class WatchDetailsComponent implements OnInit {

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private watchService: WatchService
  ) { }

  watchDetails: Observable<CenterForWeek[]>
  showNoCenters: boolean = false;

  ngOnInit(): void {
    this.watchDetails = this.route.paramMap.pipe(
      switchMap(params => {
        const watchId = params.get('id');
        return this.watchService.getWatchDetails(watchId);
      }),
      tap((centers: CenterForWeek[])=>{
        this.showNoCenters = centers?.length <= 0 ;
      })
    );
  }

  trackByCenterId(index: number, item: CenterForWeek) {
    return item.center_id;
  }

  goBack() {
    this.location.back();
  }
}
