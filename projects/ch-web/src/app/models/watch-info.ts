export enum WatchType {
    Pin, 
    District
}

export interface WatchInfo {
    id: string;
    type: WatchType;
    pin: string;
    state: string;
    district: string;
    deltaCenters: number;
    deltaJabs: number;
    lastUpdated?: Date;
    modifiedAt?: Date;
    createdAt: Date;
}
