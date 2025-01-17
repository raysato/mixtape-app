export default interface TapeCreateRequest {
    name: string;
    description: string;
    thumbnail_url: number; // public url of the tape's corresponding resource model
    tracks: {
        name: string;
        play_at: number;
        start_at: number;
        end_at: number;
        audiofile_url: string; // public url of tracks's corresponding resource model
    }[]
}