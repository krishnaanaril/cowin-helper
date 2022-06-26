import { of } from "rxjs";
import { CenterForWeek } from "../models/center-for-week";
import { WatchInfo } from "../models/watch-info";

export class WatchServiceMock {
    updateDeltaValues(centers: CenterForWeek[], watchInfo: WatchInfo): WatchInfo {
        return null;
    }

    addWatch(newWatch: WatchInfo, centers: CenterForWeek[]) {
        return of();
    }
}