const config = require('../config/env');
const util = require('util');
const general = require('../middlewares/general.middleware');
const modulus = require('../middlewares/modulus.middleware');
const { data } = require('../config/databases/field_db');
const PHPUnserialize = require('php-unserialize');
const { fileURLToPath } = require('url');
const code = config.returncode;
const date = require('date-and-time');

exports.init = function (req, res) {
    funcRoute(req, res, {
        "CallCms": "CallCms",
        "CallCmsGroup": "CallCmsGroup",
        "CallCmsSubGroup": "CallCmsSubGroup",
        "CallTopGraphic": "CallTopGraphic",
        "CallSettingSite": "CallSettingSite",
        "CallPolicy":"CallPolicy",
        "acceptCookie":"acceptCookie",
        "CallFile":"CallFile",
        "CallAlbum":"CallAlbum",
        "updateView":"updateView",
        "updateDowunload":"updateDowunload",
        "CallTagsName":"CallTagsName",
    });
}

////////// API Mobile ////////// 
function funcRoute(req, res, mapFuncs) {

    if (req.body.method === undefined && (req.method === "POST" || req.method === "PUT" || req.method === "DELETE")) {
        res.json({ code: code.missing_method.code, msg: code.missing_method.msg });
        return 0;
    } else if (req.query.method === undefined && req.method === "GET") {
        res.json({ code: code.missing_method.code, msg: code.missing_method.msg });
        return 0;
    }

    var foundFunction = false;

    for (var mapFunc in mapFuncs) {

        var paramas = req.body;

        if (req.method == "GET") {
            paramas = req.query;
        }

        if (paramas.method == mapFunc) {
            eval(mapFuncs[mapFunc])(req, res);
            foundFunction = true;
            break;
        }
    }
    if (!foundFunction)
        res.json({ code: code.unknown_method.code, msg: code.unknown_method.msg });

}

async function CallCms(req, res) {
    const method = req.query.method;
    let masterKey = req.query.masterKey;
    let id = req.query.id;
    let gid = req.query.gid;
    let sgid = req.query.sgid;
    let status = req.query.status;
    let limit = req.query.limit;

    const result = general.checkParam([method]);
    const code = config.returncode;

    if (result.code == code.success.code) {

        if (id === undefined || id == "") {
            id = null;
        }
        if (gid === undefined || gid == "") {
            gid = null;
        }
        if (sgid === undefined || sgid == "") {
            sgid = null;
        }
        if (status === undefined || status == "") {
            status = null;
        }
        if (limit === undefined || limit == "") {
            limit = null;
        }
        if (masterKey === undefined) {
            masterKey = null;
        }

        var infoData = await modulus.getCMS(masterKey, id, gid, sgid,limit, status);

        var list_data = [];

        if (infoData.length > 0) {
            for (let i = 0; i < infoData.length; i++) {
                list_data[i] = {};
                list_data[i].id = infoData[i]['id'];
                list_data[i].gid = infoData[i]['gid'];
                list_data[i].sgid = infoData[i]['sgid'];
                list_data[i].masterkey = infoData[i]['masterkey'];
                list_data[i].subject = infoData[i]['subject'];
                list_data[i].subjecten = infoData[i]['subjecten'];
                list_data[i].title = infoData[i]['title'];
                list_data[i].titleen = infoData[i]['titleen'];
                list_data[i].credate = date.format(infoData[i]['credate'],'Y-MM-DD HH:mm:ss');
                list_data[i].type = infoData[i]['type'];
                list_data[i].typeen = infoData[i]['typeen'];
                list_data[i].picname = infoData[i]['pic'];
                list_data[i].picnameen = infoData[i]['picen'];
                list_data[i].pic = modulus.getPicturePath(infoData[i]['masterkey'], infoData[i]['pic']);
                list_data[i].picen = modulus.getPicturePath(infoData[i]['masterkey'], infoData[i]['picen']);
                list_data[i].url = infoData[i]['url'];
                list_data[i].urlen = infoData[i]['urlen'];
                list_data[i].urlc = infoData[i]['urlc'];
                list_data[i].urlcen = infoData[i]['urlcen'];
                list_data[i].target =  infoData[i]['target'];
                list_data[i].targeten =  infoData[i]['targeten'];
                list_data[i].view = infoData[i]['view'];
                list_data[i].status = infoData[i]['status'];
                list_data[i].htmlfilename = infoData[i]['htmlfilename'];
                list_data[i].htmlfilenameen = infoData[i]['htmlfilenameen'];
                list_data[i].picshow = infoData[i]['picshow'];
                list_data[i].picshowen = infoData[i]['picshowen'];
                list_data[i].filevdo = modulus.getVdoPath(infoData[i]['masterkey'],infoData[i]['filevdo']);
                list_data[i].filevdoen = modulus.getVdoPath(infoData[i]['masterkey'],infoData[i]['filevdoen']);
                list_data[i].tid = PHPUnserialize.unserialize(infoData[i]['tid']);
            }
            result.list_data = list_data;
        } else {
            result.code = code.unsuccess.code;
            result.msg = "Data Not found";
        }

    }
    res.json(result);

}

async function CallCmsGroup(req, res) {
    const method = req.query.method;
    let masterKey = req.query.masterKey;
    let id = req.query.id;
    let status = req.query.status;

    const result = general.checkParam([method]);
    const code = config.returncode;

    if (result.code == code.success.code) {

        if (id === undefined || id == "") {
            id = null;
        }
        if (status === undefined || status == "") {
            status = null;
        }
        if (masterKey === undefined) {
            masterKey = null;
        }

        var infoData = await modulus.getCMSGroup(masterKey, id, status);

        var list_data = [];

        if (infoData.length > 0) {
            for (let i = 0; i < infoData.length; i++) {
                list_data[i] = {};
                list_data[i].id = infoData[i]['id'];
                list_data[i].masterkey = infoData[i]['masterkey'];
                list_data[i].subject = infoData[i]['subject'];
                list_data[i].subjecten = infoData[i]['subjecten'];
                list_data[i].title = infoData[i]['title'];
                list_data[i].titleen = infoData[i]['titleen'];
                list_data[i].pic = infoData[i]['pic'];
                list_data[i].picen = infoData[i]['picen'];
                list_data[i].status = infoData[i]['status'];
            }
            result.list_data = list_data;
        } else {
            result.code = code.unsuccess.code;
            result.msg = "Data Not found";
        }

    }
    res.json(result);

}

async function CallCmsSubGroup(req, res) {
    const method = req.query.method;
    let masterKey = req.query.masterKey;
    let id = req.query.id;
    let gid = req.query.gid;
    let status = req.query.status;

    const result = general.checkParam([method]);
    const code = config.returncode;

    if (result.code == code.success.code) {

        if (id === undefined || id == "") {
            id = null;
        }
        if (gid === undefined || gid == "") {
            gid = null;
        }
        if (status === undefined || status == "") {
            status = null;
        }
        if (masterKey === undefined) {
            masterKey = null;
        }

        var infoData = await modulus.getCMSSubGroup(masterKey, gid, id, status);

        var list_data = [];

        if (infoData.length > 0) {
            for (let i = 0; i < infoData.length; i++) {
                list_data[i] = {};
                list_data[i].id = infoData[i]['id'];
                list_data[i].masterkey = infoData[i]['masterkey'];
                list_data[i].subject = infoData[i]['subject'];
                list_data[i].subjecten = infoData[i]['subjecten'];
                list_data[i].title = infoData[i]['title'];
                list_data[i].titleen = infoData[i]['titleen'];
                list_data[i].gid = infoData[i]['gid'];
                list_data[i].status = infoData[i]['status'];
            }
            result.list_data = list_data;
        } else {
            result.code = code.unsuccess.code;
            result.msg = "Data Not found";
        }

    }
    res.json(result);

}

async function CallTopGraphic(req, res) {
    const method = req.query.method;
    let masterKey = req.query.masterKey;
    let status = req.query.status;

    const result = general.checkParam([method]);
    const code = config.returncode;

    if (result.code == code.success.code) {

        if (status === undefined || status == "") {
            status = null;
        }
        if (masterKey === undefined) {
            masterKey = null;
        }

        var infoData = await modulus.getTopgraphic(masterKey, status);

        var list_data = [];

        if (infoData.length > 0) {
            for (let i = 0; i < infoData.length; i++) {
                list_data[i] = {};
                list_data[i].id = infoData[i]['id'];
                list_data[i].masterkey = infoData[i]['masterkey'];
                list_data[i].subject = infoData[i]['subject'];
                list_data[i].subjecten = infoData[i]['subjecten'];
                list_data[i].title = infoData[i]['title'];
                list_data[i].titleen = infoData[i]['titleen'];
                list_data[i].pic = infoData[i]['pic'];
                list_data[i].picen = infoData[i]['picen'];
                list_data[i].url = infoData[i]['url'];
                list_data[i].urlen = infoData[i]['urlen'];
                list_data[i].target =  infoData[i]['target'];
                list_data[i].targeten =  infoData[i]['targeten'];
                list_data[i].status = infoData[i]['status'];
            }
            result.list_data = list_data;
        } else {
            result.code = code.unsuccess.code;
            result.msg = "Data Not found";
        }

    }
    res.json(result);

}

async function CallSettingSite(req, res) {
    const method = req.query.method;

    const result = general.checkParam([method]);
    const code = config.returncode;

    if (result.code == code.success.code) {


        var infoData = await modulus.getSiteSetting();
        var list_data = [];

        if (infoData.length > 0) {
            for (let i = 0; i < infoData.length; i++) {
                list_data[i] = {};
                list_data[i].id = infoData[i]['id'];
                list_data[i].masterkey = infoData[i]['masterkey'];
                list_data[i].subject = infoData[i]['subject'];
                list_data[i].subjecten = infoData[i]['subjecten'];
                list_data[i].social = PHPUnserialize.unserialize(infoData[i]['social']);
                list_data[i].config = PHPUnserialize.unserialize(infoData[i]['config']);
                list_data[i].addresspic = infoData[i]['addresspic'];
                list_data[i].subjectoffice = infoData[i]['subjectoffice'];
                list_data[i].subjectofficeen = infoData[i]['subjectofficeen'];
                list_data[i].lastdate = date.format(infoData[i]['lastdate'],'Y-MM-DD HH:mm:ss');
                list_data[i].metatitle = infoData[i]['metatitle'];
                list_data[i].description = infoData[i]['description'];
                list_data[i].keywords = infoData[i]['keywords'];
            }
            result.list_data = list_data;
        } else {
            result.code = code.unsuccess.code;
            result.msg = "Data Not found";
        }

    }
    res.json(result);

}

async function CallPolicy(req, res) {
    const method = req.query.method;

    const result = general.checkParam([method]);
    const code = config.returncode;

    if (result.code == code.success.code) {

        var infoData = await modulus.getPolicy();

        var list_data = [];

        if (infoData.length > 0) {
            for (let i = 0; i < infoData.length; i++) {
                list_data[i] = {};
                list_data[i].id = infoData[i]['id'];
                list_data[i].masterkey = infoData[i]['masterkey'];
                list_data[i].subject = infoData[i]['subject'];
                list_data[i].subjecten = infoData[i]['subjecten'];
                list_data[i].title = infoData[i]['title'];
                list_data[i].titleen = infoData[i]['titleen'];
                list_data[i].htmlfilename = infoData[i]['htmlfilename'];
                list_data[i].htmlfilenameen = infoData[i]['htmlfilenameen'];
            }
            result.list_data = list_data;
        } else {
            result.code = code.unsuccess.code;
            result.msg = "Data Not found";
        }

    }
    res.json(result);

}

async function acceptCookie(req, res) {
    const method = req.query.method;
    let baseSite = req.query.baseSite;
    let client_ip = req.query.client_ip;
    let client_ip_router = req.query.client_ip_router;
    let client_browser = req.query.client_browser;
    let ac_token = req.query.ac_token;

    const result = general.checkParam([method]);
    const code = config.returncode;

    if (result.code == code.success.code) {

        if (baseSite === undefined || baseSite == "") {
            baseSite = "";
        }
        if (client_ip === undefined || client_ip == "") {
            client_ip = "";
        }
        if (client_ip_router === undefined || client_ip_router == "") {
            client_ip_router = "";
        }
        if (client_browser === undefined || client_browser == "") {
            client_browser = "";
        }
        if (ac_token === undefined || ac_token == "") {
            ac_token = "";
        }

        var infoData = await modulus.acceptCookie(baseSite,client_ip,client_ip_router,client_browser,ac_token);

        if (infoData) {
            result.statuscode = 201 ;
            result.code = code.success.code;
            result.msg = "Accept Cookie Success";
        } else {
            result.statuscode = 400 ;
            result.code = code.unsuccess.code;
            result.msg = "Data Not found";
        }

    }
    res.json(result);

}

async function CallFile(req, res) {
    const method = req.query.method;
    let id = req.query.id;
    let masterKey = req.query.masterKey;
    let lang = req.query.lang;

    const result = general.checkParam([method]);
    const code = config.returncode;

    if (result.code == code.success.code) {

        if (id === undefined || id == "") {
            id = null;
        }
        if (masterKey === undefined || masterKey == "") {
            masterKey = null;
        }
        if (lang === undefined || lang == "") {
            lang = null;
        }

        var infoData = await modulus.getfile(id,masterKey,lang);

        var list_data = [];

        if (infoData.length > 0) {
            for (let i = 0; i < infoData.length; i++) {
                list_data[i] = {};
                list_data[i].id = infoData[i]['id'];
                list_data[i].filename = infoData[i]['filename'];
                list_data[i].name = infoData[i]['name'];
                list_data[i].download = infoData[i]['download'];
                list_data[i].pathFile = modulus.getFilesPath(masterKey,infoData[i]['filename']);
            }
            result.list_data = list_data;
        } else {
            result.code = code.unsuccess.code;
            result.msg = "Data Not found";
        }

    }
    res.json(result);

}

async function CallAlbum(req, res) {
    const method = req.query.method;
    let id = req.query.id;
    let masterKey = req.query.masterKey;
    let lang = req.query.lang;

    const result = general.checkParam([method]);
    const code = config.returncode;

    if (result.code == code.success.code) {

        if (id === undefined || id == "") {
            id = null;
        }
        if (masterKey === undefined || masterKey == "") {
            masterKey = null;
        }
        if (lang === undefined || lang == "") {
            lang = null;
        }

        var infoData = await modulus.getAlbum(id,masterKey,lang);

        var list_data = [];

        if (infoData.length > 0) {
            for (let i = 0; i < infoData.length; i++) {
                list_data[i] = {};
                list_data[i].id = infoData[i]['id'];
                list_data[i].filename = infoData[i]['filename'];
                list_data[i].name = infoData[i]['name'];
                list_data[i].download = infoData[i]['download'];
                list_data[i].pathAlbum = modulus.getAlbumPath(masterKey,infoData[i]['filename']);
            }
            result.list_data = list_data;
        } else {
            result.code = code.unsuccess.code;
            result.msg = "Data Not found";
        }

    }
    res.json(result);

}

async function CallTagsName(req, res) {
    const method = req.query.method;
    let id = req.query.id;
    let masterKey = req.query.masterKey;

    const result = general.checkParam([method]);
    const code = config.returncode;

    if (result.code == code.success.code) {

        if (id === undefined || id == "") {
            id = null;
        }
        if (masterKey === undefined || masterKey == "") {
            masterKey = null;
        }

        var infoData = await modulus.getTagsName(id,masterKey);

        var list_data = [];

        if (infoData.length > 0) {
            for (let i = 0; i < infoData.length; i++) {
                list_data[i] = {};
                list_data[i].id = infoData[i]['id'];
                list_data[i].subject = infoData[i]['subject'];
                list_data[i].subjecten = infoData[i]['subjecten'];
            }
            result.list_data = list_data;
        } else {
            result.code = code.unsuccess.code;
            result.msg = "Data Not found";
        }

    }
    res.json(result);

}


async function updateView(req, res) {
    const method = req.query.method;
    let id = req.query.id;
    let masterKey = req.query.masterKey;
    let table = req.query.table;

    const result = general.checkParam([method]);
    const code = config.returncode;

    if (result.code == code.success.code) {

        if (id === undefined || id == "") {
            id = null;
        }
        if (masterKey === undefined || masterKey == "") {
            masterKey = null;
        }
        if (table === undefined || table == "") {
            table = null;
        }

        var infoData = await modulus.updateView(id,masterKey,table);

        var list_data = [];

        if (infoData.status == 'success') {
            result.code = code.success.code;
            result.msg = "Update View Success";
        } else {
            result.code = code.unsuccess.code;
            result.msg = "Data Not found";
        }

    }
    res.json(result);

}

async function updateDowunload(req, res) {
    const method = req.query.method;
    let id = req.query.id;
    let masterKey = req.query.masterKey;
    let table = req.query.table;

    const result = general.checkParam([method]);
    const code = config.returncode;

    if (result.code == code.success.code) {

        if (id === undefined || id == "") {
            id = null;
        }
        if (masterKey === undefined || masterKey == "") {
            masterKey = null;
        }
        if (table === undefined || table == "") {
            table = null;
        }

        var infoData = await modulus.updateDowunload(id,masterKey,table);

        var list_data = [];

        if (infoData.status == 'success') {
            result.code = code.success.code;
            result.msg = "Update View Success";
        } else {
            result.code = code.unsuccess.code;
            result.msg = "Data Not found";
        }

    }
    res.json(result);

}