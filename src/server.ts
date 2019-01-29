import http from 'http';
import url from 'url';
import Prometheus from 'prom-client';

class PrometheusServer {
    public register: Prometheus.Registry;
    
    constructor() {
        this.register = Prometheus.register;
    }

    start() {
        http
            .createServer((req, res) => {
                if (url.parse(req.url!).pathname === '/metrics') {
                    res.writeHead(200, {
                        'Content-Type': this.register.contentType
                    });
                    res.write(this.register.metrics());
                }
            }).listen(3100);
    }
}

const prom = new PrometheusServer();
prom.start();