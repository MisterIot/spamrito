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

const gdados = async function (pontuacao = false) {
	var config = {}
	if (pontuacao) {
		config["pontuacao"] = 'S';
	} else {
		config["pontuacao"] = 'N';
	}
	return await curl('https://www.4devs.com.br/ferramentas_online.php', 'acao=gerar_pessoa&sexo=I&pontuacao=' + config.pontuacao + '&idade=0&cep_estado=&txt_qtde=1&cep_cidade=', {
		'Host': 'www.4devs.com.br'
		}, 'POST').then((res) => {
			const dados = JSON.parse(res.body);
			if (dados["nome"]) {
				return { status: 1, dados: { nome: dados["nome"], idade: dados["idade"], cpf: dados["cpf"], rg: dados["rg"], dtnasc: dados["data_nasc"], sexo: dados["sexo"], signo: dados["signo"], mae: dados["mae"], pai: dados["pai"], email: dados["email"], senha: dados["senha"], cep: dados["cep"], endereco: dados["endereco"], numero: dados["numero"], bairro: dados["bairro"], cidade: dados["cidade"], estado: dados["estado"], telefone_fixo: dados["telefone_fixo"], celular: dados["celular"], altura: dados["altura"], peso: dados["peso"], tipo_sanguineo: dados["tipo_sanguineo"], cor: dados["cor"] } }
			} else {
				return { status: 0, error: 'Não foi possivel gerar os dados.' }
			}
	});
}

module.exports = {
	sleep,
	random,
	str_shuffle,
	getstr,
	gdados,
	curl
}