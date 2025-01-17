import PlayableTrack from "./PlayableTrack";

export default interface TapeCreateRequest {
    name: string;
    description: string;
    customURL: string;
    password: string;
    thumbnailResourceID: number;
    tracks: PlayableTrack[]
}