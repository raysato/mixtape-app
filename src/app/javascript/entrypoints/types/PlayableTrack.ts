export default interface PlayableTrack {
    name: string;
    play_at: number;
    start_at: number;
    end_at: number;
    resource_id?: number;
}