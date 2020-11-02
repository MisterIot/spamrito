var request = require('request');

/*
Functions:
Random caracteres: utils.str_shuffle("0123456789abcdefghijklmnopqrstuvwxyz").repeat(8).substr(0, 10);
*/

const sleep = (ms) => {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const str_shuffle = (str) => {
    var parts = str.split('');
    for (var i = parts.length; i > 0;) {
        var random = parseInt(Math.random() * i);
        var temp = parts[--i];
        parts[i] = parts[random];
        parts[random] = temp;
    }
    return parts.join('');
}

const getstr = (string, start, end, i = 0) => {
	i++;
    try {
        var str = string.split(start);
        var str = str[i].split(end);
        return str[0];
    } catch (ex) {
        return '';
    }
}

const curl = async (uri, postdata, headers = {}, method, followallredirects = false, proxy = false, cookiejar = false) => {

    let resolve;
    let reject;
    const promise = new Promise((a, b) => {
        resolve = a;
        reject = b;
    });

    var h = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
    };

    if (postdata) {
        h['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }
    try {
        JSON.parse(postdata);
        h['Content-Type'] = 'application/json; charset=UTF-8';
    } catch (ex) {

    }

    Object.keys(headers).forEach((value) => {
        h[value] = headers[value];
    });

    var opts = {
        method: method,
        url: uri,
        headers: h,
        body: postdata
    }

    opts["rejectUnauthorized"] = false;
    
    if (followallredirects) {
    	opts.followAllRedirects = true;
    }
    if (proxy) {
        opts.proxy = 'http://ca42cc73d096405fbb2abf4b4d943c31:@proxy.crawlera.com:8010';
    }
    if (cookiejar) {
    	opts.jar = cookiejar;
    }

    request(opts, function (err, res, body) {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            resolve(res);
        }
    });

    return promise;
}

module.exports = {
	sleep,
	random,
	str_shuffle,
	getstr,
	curl
}
