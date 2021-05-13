import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CenterForWeek } from '../models/center-for-week';
import { WatchService } from '../watch.service';

@Component({
  selector: 'ch-watch-details',
  templateUrl: './watch-details.component.html',
  styleUrls: ['./watch-details.component.scss']
})
export class WatchDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private watchService: WatchService
  ) { }

  watchDetails: Observable<CenterForWeek[]>

  ngOnInit(): void {
    this.watchDetails = this.route.paramMap.pipe(
      switchMap(params => {
        const watchId = params.get('id');
        return this.watchService.getWatchDetails(watchId);
      })
    );
  }

}
