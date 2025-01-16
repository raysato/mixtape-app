export default interface TapeInfo {
    title: string;
    description: string;
    customURL: string;
    password: string;
    thumbnailImage: File | null;
    thumbnailResourceID?: number
}