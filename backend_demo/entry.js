//////////////////////////////////////////////////////
// Módulos
let express   = require("express");
let request   = require("request-promise-native");
let validador = require("./lib/validador.js");

const _debug    = true;
const MATCH_URI = "";

const HTTP_OK   = 200;
const HTTP_NOTF = 404;
const HTTP_BADR = 400;
const HTTP_SERR = 500; 

//////////////////////////////////////////////////////
// Setup do server
let port = 8001;
app = new express();

let json_op  = {};
json_op.type = "application/json";

//////////////////////////////////////////////////////
// Funções de rotas

function naoEncontrado(req, res)
{
    res.status(HTTP_NOTF);
    res.send("404 Not found");
    res.end();
}

async function fazMatch(req, res)
{
    let dados_validados = {};
    let resultado_match = {};

    try
    {
        let dados       = req.query;
        dados_validados = validador(dados);

        if(_debug)
        {
            console.log(req.headers);
            console.log(dados_validados);
        }

        resultado_match = await chamaMatchAPI(dados_validados);
    }
    catch(err)
    {
        if(_debug)
            console.log(err);

        let err_response = {};
        
        res.status(HTTP_SERR);
        res.send(err_response);
        res.end();
    }

    res.status(HTTP_OK);
    res.json(resultado_match);
    res.end();
}

async function chamaMatchAPI(dados)
{
    let resultado_match = {};

    let query = "?";
    let keys  = Object.keys(dados);
    for(let i = 0; i < keys.length; i++)
    {
        query += keys[i] + "=" + dados[keys[i]] + "&";
    }

    if(_debug)
    {
        console.log(query);
        for(let i = 0; i < keys.length; i++)
        {
            resultado_match[keys[i]] = dados[keys[i]];
        }

        return resultado_match;
    }

    try
    {
        resultado_match = request
        ({ 
            method: 'GET', 
            uri: MATCH_URI + "/" + query,
            resolveWithFullResponse: true  
        });
    }
    catch(err)
    {
        throw err;
    }

    //return resultado_match;
}

//////////////////////////////////////////////////////
// Rotas
let router = express.Router();

router.get("/fazMatch", fazMatch);

//////////////////////////////////////////////////////
// Execução

//pilha de middlewares
app.use(express.json(json_op));
app.use(router);
app.use(naoEncontrado);

//espera
app.listen(port);



