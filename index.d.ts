import http from 'http'

export default class Icebolt {}

declare namespace Icebolt {
    export interface DefaultOptions {
        strictMode?: boolean;
    }

    export enum Method {
        '*',
        'GET',
        'POST',
        '',
    }

    export var _options: Icebolt.DefaultOptions
    export var _httpServer: http.Server
    export var _nodeMap: Map

    export function constructor(port: number, callback?: (port: number) => void, options?: Icebolt.DefaultOptions): void

    export function handleRequest(req: http.IncomingMessage, res: http.ServerResponse): void
    export function node (route: string, method?: string, listener: (req: any, res: any) => any): void
}

declare module 'http' {
    export interface ServerResponse {
      send(payload: string): void;
    }
}