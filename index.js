import http from 'http'

export default class Icebolt {

    /**
     * @author liquiddevelopmentnet
     * @param {*} port 
     * @param {*} callback 
     * @param {*} options 
     */
    constructor (port, callback, options = { strictMode: false }) {
        this._options = options;

        this._httpServer = http.createServer((req, res) => this.handleRequest(req, res))
        this._httpServer.listen(port)

        this._nodeMap = new Map();

        if(callback)
            callback(port)
    }

    /**
     * Function that handles all incoming requests through the http server.
     * @author liquiddevelopmentnet
     * @param http.IncomingMessage req 
     * @param http.ServerResponse res 
     */
    handleRequest (req, res) {

        res.send = (payload) => {
            res.write(payload)
            res.end()
        }

        const fu = this._nodeMap.get(req.url)
        if(fu[0])
            fu[0](req, res)
        else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            const arr = this.getErrorPage('404', 'Not Found', 'The endpoint you requested is\'nt available in this scope.', 'Icebolt/0.0.1-stub').replace(/\r\n/g,'\n').split('\n');

            for(let i of arr) {
                res.write(i)
            }
            res.end()
        }
    }

    /**
     * Register a universal Node
     * @author liquiddevelopmentnet
     * @param {*} route 
     * @param {*} listener 
     */
    node (route, method = '*', listener) {
        this._nodeMap.set(route, [listener, method])
    }

    getErrorPage(title, error, message, footer) {
        const str = `
        <html>
            <head>
                <title>${title}</title>
            </head>
            <body>
                <h1>${error}</h1>
                <p>${message}</p>
                <hr>
                <address>${footer}</address>
            </body>
        </html>
        `
        return str
    }
}