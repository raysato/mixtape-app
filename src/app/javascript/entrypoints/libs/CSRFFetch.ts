export const useFetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers();
    const tokenElement = document.querySelector('meta[name="csrf-token"]') as unknown as {content: string}
    headers.append('X-CSRF-Token', tokenElement.content);
    if (init) {
        init.headers = headers;
    }
    return fetch(input, init)
}