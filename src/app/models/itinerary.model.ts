export interface Itinerary {
    ItineraryID?: number;
    TravelId?: number;
    Day: number;
    Activity: string;
    StartTime: string;
    EndTime: string;
}

export interface ItineraryDetail {
    Id?: number;
    ItineraryId: number;
    Type: 'Stay' | 'Travel';
    StartTime: Date;
    EndTime: Date;
    CompletionStatus: 'Pending' | 'Completed' | 'InProgress';
    ManagedStatus: 'Managed' | 'Unmanaged';
    Description?: string;
    CreatedAt?: Date;
    UpdatedAt?: Date;
} 