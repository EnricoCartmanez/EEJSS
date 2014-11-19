/**
 * Created by enikshk on 18.11.14.
 */

var dhcpd = require('./dhcpd');
var tftpd = require('tftp');
var app = require('../app');

function EEJSCore (opts) {
    var self = this;
    self.initialize_tftpd();
    self.initialize_httpd();
    //self.initialize_dhcpd(opts);
}

EEJSCore.prototype.initialize_tftpd = function initialize_tftpd () {
    var self = this;
    self.tftpd = tftpd.createServer({
        host: '127.0.0.1',
        port: 69,
        root: './uploads/',
        denyPUT: true
    }).listen();
};

EEJSCore.prototype.initialize_dhcpd = function initialize_dhcpd (opts) {
    var self = this;
    self.dhcpd = new dhcpd({
        subnet:           opts.subnet,
        range_start:      opts.range_start,
        range_end:        opts.range_end,
        routers:          opts.routers,
        nameservers:      opts.nameservers,
        save_lease:       opts.save_lease,
        get_lease:        opts.get_lease,
        get_lease_by_ip:  opts.get_lease_by_ip,
        get_next_ip:      opts.get_next_ip,
        remove_lease:     opts.remove_lease,
        host:             opts.host
    });
};

EEJSCore.prototype.initialize_httpd = function initialize_httpd () {
    var self = this;
    app.set('port', process.env.PORT || 3000);
    self.httpd = app.listen(app.get('port'), function() {
        console.log('The magic happens on port', app.get('port'));
    });
}


module.exports = EEJSCore;