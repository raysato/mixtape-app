import { stringify } from "postcss";

export const useFetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const tokenElement = document.querySelector('meta[name="csrf-token"]') as unknown as {content: string}
    const token = tokenElement.content
    if (init?.headers) {
        (init.headers as any)['X-CSRF-Token'] = token;
        return fetch(input, init)
    }
    const headers = new Headers();
    headers.append('X-CSRF-Token', tokenElement.content);
    const reqInit = init ?? {}
    reqInit.headers = headers
    return fetch(input, reqInit)
}