const config = require('../config/env');
const util = require('util');

exports.getCMS = async function (masterKey, id = null, gid = null, sgid = null, limit = null ,status = null) {
    let conn = config.seiAPIDB.connectDB();
    const query = util.promisify(conn.query).bind(conn);
    const field = config.fieldDB;
    var result = {};

    var queryData = "SELECT " + field.cms.db_root + "." + field.cms.db_root + "_id as id, " +
        field.cms.db_root + "." + field.cms.db_root + "_masterkey as masterkey, " +
        field.cms.db_root + "." + field.cms.db_root + "_subject as subject, " +
        field.cms.db_root + "." + field.cms.db_root + "_subjecten as subjecten, " +
        field.cms.db_root + "." + field.cms.db_root + "_title as title, " +
        field.cms.db_root + "." + field.cms.db_root + "_titleen as titleen, " +
        field.cms.db_root + "." + field.cms.db_root + "_credate as credate, " +
        field.cms.db_root + "." + field.cms.db_root + "_gid as gid, " +
        field.cms.db_root + "." + field.cms.db_root + "_pic as pic, " +
        field.cms.db_root + "." + field.cms.db_root + "_picen as picen, " +
        field.cms.db_root + "." + field.cms.db_root + "_sgid as sgid, " +
        field.cms.db_root + "." + field.cms.db_root + "_url as url, " +
        field.cms.db_root + "." + field.cms.db_root + "_urlen as urlen, " +
        field.cms.db_root + "." + field.cms.db_root + "_urlc as urlc, " +
        field.cms.db_root + "." + field.cms.db_root + "_urlcen as urlcen, " +
        field.cms.db_root + "." + field.cms.db_root + "_target as target, " +
        field.cms.db_root + "." + field.cms.db_root + "_targeten as targeten, " +
        field.cms.db_root + "." + field.cms.db_root + "_view as view, " +
        field.cms.db_root + "." + field.cms.db_root + "_type as type, " +
        field.cms.db_root + "." + field.cms.db_root + "_typeen as typeen, " +
        field.cms.db_root + "." + field.cms.db_root + "_htmlfilename as htmlfilename, " +
        field.cms.db_root + "." + field.cms.db_root + "_htmlfilenameen as htmlfilenameen, " +
        field.cms.db_root + "." + field.cms.db_root + "_status as status, " +
        field.cms.db_root + "." + field.cms.db_root + "_picshow as picshow, " +
        field.cms.db_root + "." + field.cms.db_root + "_picshowen as picshowen, " +
        field.cms.db_root + "." + field.cms.db_root + "_filevdo as filevdo, " +
        field.cms.db_root + "." + field.cms.db_root + "_filevdoen as filevdoen, " +
        field.cms.db_root + "." + field.cms.db_root + "_tid as tid " +
        " FROM " + field.cms.db_root +
        " WHERE " + field.cms.db_root + "." + field.cms.db_root + "_masterkey = '" + masterKey + "'" +
        " AND " + field.cms.db_root + "." + field.cms.db_root + "_status != 'Disable' ";

    if (gid !== null) {
        queryData = queryData + " AND " + field.cms.db_root + "." + field.cms.db_root + "_gid = " + gid;
    }

    if (id !== null) {
        queryData = queryData + " AND " + field.cms.db_root + "." + field.cms.db_root + "_id = " + id;
    }

    if (sgid !== null) {
        queryData = queryData + " AND " + field.cms.db_root + "." + field.cms.db_root + "_sgid = " + sgid;
    }

    if (status !== null) {
        queryData = queryData + " AND " + field.cms.db_root + "." + field.cms.db_root + "_status = '" + status+"'";
    }

    queryData = queryData + " ORDER BY  " + field.cms.db_root + "." + field.cms.db_root + "_order DESC ";

    if (limit !== null) {
        queryData = queryData + " LIMIT " + limit;
    }

    try {
        const select = await query(queryData);
        if (select.length > 0) {
            result = select;
        } else {
            result = select;
        }
    } catch (error) {
        console.log(error)
    }
    conn.destroy();

    // console.log(queryData);
    return result;
}
exports.getCMSGroup = async function (masterKey, id = null, status = null) {
    let conn = config.seiAPIDB.connectDB();
    const query = util.promisify(conn.query).bind(conn);
    const field = config.fieldDB;
    var result = {};

    var queryData = "SELECT " + field.cms.db_group + "." + field.cms.db_group + "_id as id, " +
        field.cms.db_group + "." + field.cms.db_group + "_masterkey as masterkey, " +
        field.cms.db_group + "." + field.cms.db_group + "_subject as subject, " +
        field.cms.db_group + "." + field.cms.db_group + "_subjecten as subjecten, " +
        field.cms.db_group + "." + field.cms.db_group + "_title as title, " +
        field.cms.db_group + "." + field.cms.db_group + "_titleen as titleen, " +
        field.cms.db_group + "." + field.cms.db_group + "_pic as pic, " +
        field.cms.db_group + "." + field.cms.db_group + "_picen as picen, " +
        field.cms.db_group + "." + field.cms.db_group + "_status as status " +
        " FROM " + field.cms.db_group +
        " WHERE " + field.cms.db_group + "." + field.cms.db_group + "_masterkey = '" + masterKey + "'" +
        " AND " + field.cms.db_group + "." + field.cms.db_group + "_status != 'Disable' ";


    if (id !== null) {
        queryData = queryData + " AND " + field.cms.db_group + "." + field.cms.db_group + "_id = " + id;
    }

    if (status !== null) {
        queryData = queryData + " AND " + field.cms.db_group + "." + field.cms.db_group + "_status = '" + status+"'";
    }

    queryData = queryData + " ORDER BY  " + field.cms.db_group + "." + field.cms.db_group + "_order DESC ";

    try {
        const select = await query(queryData);
        if (select.length > 0) {
            result = select;
        } else {
            result = select;
        }
    } catch (error) {
        console.log(error)
    }
    conn.destroy();

    //console.log(queryData);
    return result;
}

exports.getCMSSubGroup = async function (masterKey, gid = null, id = null, status = null) {
    let conn = config.seiAPIDB.connectDB();
    const query = util.promisify(conn.query).bind(conn);
    const field = config.fieldDB;
    var result = {};

    var queryData = "SELECT " + field.cms.db_subgroup + "." + field.cms.db_subgroup + "_id as id, " +
        field.cms.db_subgroup + "." + field.cms.db_subgroup + "_masterkey as masterkey, " +
        field.cms.db_subgroup + "." + field.cms.db_subgroup + "_gid as gid, " +
        field.cms.db_subgroup + "." + field.cms.db_subgroup + "_subject as subject, " +
        field.cms.db_subgroup + "." + field.cms.db_subgroup + "_subjecten as subjecten, " +
        field.cms.db_subgroup + "." + field.cms.db_subgroup + "_title as title, " +
        field.cms.db_subgroup + "." + field.cms.db_subgroup + "_titleen as titleen, " +
        field.cms.db_subgroup + "." + field.cms.db_subgroup + "_status as status " +
        " FROM " + field.cms.db_subgroup +
        " WHERE " + field.cms.db_subgroup + "." + field.cms.db_subgroup + "_masterkey = '" + masterKey + "'" +
        " AND " + field.cms.db_subgroup + "." + field.cms.db_subgroup + "_status != 'Disable' ";


    if (gid !== null) {
        queryData = queryData + " AND " + field.cms.db_subgroup + "." + field.cms.db_subgroup + "_gid = " + gid;
    }

    if (id !== null) {
        queryData = queryData + " AND " + field.cms.db_subgroup + "." + field.cms.db_subgroup + "_id = " + id;
    }

    if (status !== null) {
        queryData = queryData + " AND " + field.cms.db_subgroup + "." + field.cms.db_subgroup + "_status = '" + status+"'";
    }

    queryData = queryData + " ORDER BY  " + field.cms.db_subgroup + "." + field.cms.db_subgroup + "_order DESC ";

    try {
        const select = await query(queryData);
        if (select.length > 0) {
            result = select;
        } else {
            result = select;
        }
    } catch (error) {
        console.log(error)
    }
    conn.destroy();

    //console.log(queryData);
    return result;
}

exports.getTopgraphic = async function (masterKey, status = null) {
    let conn = config.seiAPIDB.connectDB();
    const query = util.promisify(conn.query).bind(conn);
    const field = config.fieldDB;
    var result = {};

    var queryData = "SELECT " + field.tgp.db + "." + field.tgp.db + "_id as id, " +
        field.tgp.db + "." + field.tgp.db + "_masterkey as masterkey, " +
        field.tgp.db + "." + field.tgp.db + "_subject as subject, " +
        field.tgp.db + "." + field.tgp.db + "_subjecten as subjecten, " +
        field.tgp.db + "." + field.tgp.db + "_title as title, " +
        field.tgp.db + "." + field.tgp.db + "_titleen as titleen, " +
        field.tgp.db + "." + field.tgp.db + "_pic as pic, " +
        field.tgp.db + "." + field.tgp.db + "_picen as picen, " +
        field.tgp.db + "." + field.tgp.db + "_url as url, " +
        field.tgp.db + "." + field.tgp.db + "_urlen as urlen, " +
        field.tgp.db + "." + field.tgp.db + "_target as target, " +
        field.tgp.db + "." + field.tgp.db + "_targeten as targeten, " +
        field.tgp.db + "." + field.tgp.db + "_status as status " +
        " FROM " + field.tgp.db +
        " WHERE " + field.tgp.db + "." + field.tgp.db + "_masterkey = '" + masterKey + "'" +
        " AND " + field.tgp.db + "." + field.tgp.db + "_status != 'Disable' ";

    if (status !== null) {
        queryData = queryData + " AND " + field.tgp.db + "." + field.cms.tgp.db + "_status = '" + status+"'";
    }

    queryData = queryData + " ORDER BY  " + field.tgp.db + "." + field.tgp.db + "_order DESC ";

    try {
        const select = await query(queryData);
        if (select.length > 0) {
            result = select;
        } else {
            result = select;
        }
    } catch (error) {
        console.log(error)
    }
    conn.destroy();

    // console.log(queryData);
    return result;
}

exports.getSiteSetting = async function () {
    let conn = config.seiAPIDB.connectDB();
    const query = util.promisify(conn.query).bind(conn);
    const field = config.fieldDB;
    var result = {};

    var queryData = "SELECT " + field.site.db + "." + field.site.db + "_id as id, " +
        field.site.db + "." + field.site.db + "_masterkey as masterkey, " +
        field.site.db + "." + field.site.db + "_subject as subject, " +
        field.site.db + "." + field.site.db + "_subjecten as subjecten, " +
        field.site.db + "." + field.site.db + "_social as social, " +
        field.site.db + "." + field.site.db + "_config as config, " +
        field.site.db + "." + field.site.db + "_addresspic as addresspic, " +
        field.site.db + "." + field.site.db + "_subjectoffice as subjectoffice, " +
        field.site.db + "." + field.site.db + "_subjectofficeen as subjectofficeen, " +
        field.site.db + "." + field.site.db + "_metatitle as metatitle, " +
        field.site.db + "." + field.site.db + "_description as description, " +
        field.site.db + "." + field.site.db + "_keywords as keywords, " +
        field.site.db + "." + field.site.db + "_lastdate as lastdate " +
        " FROM " + field.site.db +
        " WHERE " + field.site.db + "." + field.site.db + "_masterkey = '" + field.site.masterkey + "'";

    try {
        const select = await query(queryData);
        if (select.length > 0) {
            result = select;
        } else {
            result = select;
        }
    } catch (error) {
        console.log(error)
    }
    conn.destroy();

    //console.log(queryData);
    return result;
}

exports.getPolicy = async function () {
    let conn = config.seiAPIDB.connectDB();
    const query = util.promisify(conn.query).bind(conn);
    const field = config.fieldDB;
    var result = {};

    var queryData = "SELECT " + field.policy.db + "." + field.policy.db + "_id as id, " +
        field.policy.db + "." + field.policy.db + "_masterkey as masterkey, " +
        field.policy.db + "." + field.policy.db + "_subject as subject, " +
        field.policy.db + "." + field.policy.db + "_subjecten as subjecten, " +
        field.policy.db + "." + field.policy.db + "_htmlfilename as htmlfilename, " +
        field.policy.db + "." + field.policy.db + "_htmlfilenameen as htmlfilenameen, " +
        field.policy.db + "." + field.policy.db + "_title as title, " +
        field.policy.db + "." + field.policy.db + "_titleen as titleen " +
        " FROM " + field.policy.db +
        " WHERE " + field.policy.db + "." + field.policy.db + "_masterkey = '" + field.policy.masterkey + "'";

    queryData = queryData + " ORDER BY  " + field.policy.db + "." + field.policy.db + "_order DESC ";

    try {
        const select = await query(queryData);
        if (select.length > 0) {
            result = select;
        } else {
            result = select;
        }
    } catch (error) {
        console.log(error)
    }
    conn.destroy();

    //console.log(queryData);
    return result;
}

exports.acceptCookie = async function (baseSite = null, client_ip = null, client_ip_router = null, client_browser = null, ac_token) {
    let conn = config.seiAPIDB.connectDB();
    const query = util.promisify(conn.query).bind(conn);
    const field = config.fieldDB;
    var result = {};
    let data = [];

    data[field.cookie.db + "_masterkey"] = "'" + field.cookie.masterkey + "'";
    data[field.cookie.db + "_ipaddress"] = "'" + client_ip + "'";
    data[field.cookie.db + "_iprouter"] = "'" + client_ip_router + "'";
    data[field.cookie.db + "_credate"] = "NOW()";
    data[field.cookie.db + "_lastdate"] = "NOW()";
    data[field.cookie.db + "_countsecretkey"] = "1";
    data[field.cookie.db + "_accesstoken"] = "'" + ac_token + "'";
    data[field.cookie.db + "_browser"] = "'" + client_browser + "'";

    var queryData = "INSERT INTO " + field.cookie.db + "(" + Object.keys(data).join(",") + ")VALUES(" + Object.values(data).join(",") + ")";

    try {
        const select = await query(queryData);
        if (select.length > 0) {
            result = select;
        } else {
            result = select;
        }
    } catch (error) {
        console.log(error)
    }
    conn.destroy();

    //console.log(queryData);
    return result;
}

exports.getfile = async function (id, masterKey, lang) {
    let conn = config.seiAPIDB.connectDB();
    const query = util.promisify(conn.query).bind(conn);
    const field = config.fieldDB;
    var result = {};

    var queryData = "SELECT " + field.file.db + "." + field.file.db + "_id as id, " +
        field.file.db + "." + field.file.db + "_filename as filename, " +
        field.file.db + "." + field.file.db + "_name as name, " +
        field.file.db + "." + field.file.db + "_download as download " +
        " FROM " + field.file.db +
        " WHERE " + field.file.db + "." + field.file.db + "_contantid = '" + id + "' AND " + field.file.db + "." + field.file.db + "_language = '" + lang + "'";

    try {
        const select = await query(queryData);
        if (select.length > 0) {
            result = select;
        } else {
            result = select;
        }
    } catch (error) {
        console.log(error)
    }
    conn.destroy();

    // console.log(queryData);
    return result;
}

exports.getAlbum = async function (id, masterKey, lang) {
    let conn = config.seiAPIDB.connectDB();
    const query = util.promisify(conn.query).bind(conn);
    const field = config.fieldDB;
    var result = {};

    var queryData = "SELECT " + field.album.db + "." + field.album.db + "_id as id, " +
        field.album.db + "." + field.album.db + "_filename as filename, " +
        field.album.db + "." + field.album.db + "_name as name, " +
        field.album.db + "." + field.album.db + "_download as download " +
        " FROM " + field.album.db +
        " WHERE " + field.album.db + "." + field.album.db + "_contantid = '" + id + "' AND " + field.album.db + "." + field.album.db + "_language = '" + lang + "'";

    try {
        const select = await query(queryData);
        if (select.length > 0) {
            result = select;
        } else {
            result = select;
        }
    } catch (error) {
        console.log(error)
    }
    conn.destroy();

    // console.log(queryData);
    return result;
}

exports.getTagsName = async function (id,masterKey) {
    let conn = config.seiAPIDB.connectDB();
    const query = util.promisify(conn.query).bind(conn);
    const field = config.fieldDB;
    var result = {};

    var queryData = "SELECT " + field.tags.db + "." + field.tags.db + "_id as id, " +
        field.tags.db + "." + field.tags.db + "_subject as subject, " +
        field.tags.db + "." + field.tags.db + "_subjecten as subjecten " +
        " FROM " + field.tags.db +
        " WHERE " + field.tags.db + "." + field.tags.db + "_id in (" + id + ") AND " + field.tags.db + "." + field.tags.db + "_masterkey = '" + masterKey + "' AND " + field.tags.db + "." + field.tags.db + "_status = 'Enable'";

    try {
        const select = await query(queryData);
        if (select.length > 0) {
            result = select;
        } else {
            result = select;
        }
    } catch (error) {
        console.log(error)
    }
    conn.destroy();

    // console.log(queryData);
    return result;
}

exports.updateView = async function (id, masterKey, table) {
    let conn = config.seiAPIDB.connectDB();
    const query = util.promisify(conn.query).bind(conn);
    const field = config.fieldDB;
    var result = {};
    var result2 = {};
    var res={};

    var queryData = "SELECT " + table + "." + table + "_id as id, " +
        table + "." + table + "_masterkey as masterkey, " +
        table + "." + table + "_view as view " +
        " FROM " + table +
        " WHERE " + table + "." + table + "_masterkey = '" + masterKey + "' AND " + table + "." + table + "_id = '" + id + "'";

    try {
        const select = await query(queryData);
        if (select.length > 0) {
            result = select;
        } else {
            result = select;
        }
    } catch (error) {
        console.log(error)
    }
    view = result[0].view + 1;
    var queryData2 = "UPDATE " + table + " set " + table + "_view = " + view +
    " WHERE " + table + "." + table + "_masterkey = '" + masterKey + "' AND " + table + "." + table + "_id = '" + id + "'";
    
    try {
        const select2 = await query(queryData2);
        if (select2.changedRows > 0) {
            result2 = select2;
            res.status = 'success';
        } else {
            result2 = select2;
            res.status = 'error';
        }
    } catch (error) {
        console.log(error)
    }
    
    conn.destroy();
    return res;
}

exports.updateDowunload = async function (id, masterKey, table) {
    let conn = config.seiAPIDB.connectDB();
    const query = util.promisify(conn.query).bind(conn);
    const field = config.fieldDB;
    var result = {};
    var result2 = {};
    var res={};

    var queryData = "SELECT " + table + "." + table + "_id as id, " +
        table + "." + table + "_masterkey as masterkey, " +
        table + "." + table + "_download as download " +
        " FROM " + table +
        " WHERE " + table + "." + table + "_masterkey = '" + masterKey + "' AND " + table + "." + table + "_id = '" + id + "'";

    try {
        const select = await query(queryData);
        if (select.length > 0) {
            result = select;
        } else {
            result = select;
        }
    } catch (error) {
        console.log(error)
    }
    download = result[0].download + 1;
    var queryData2 = "UPDATE " + table + " set " + table + "_download = " + download +
    " WHERE " + table + "." + table + "_masterkey = '" + masterKey + "' AND " + table + "." + table + "_id = '" + id + "'";
    
    try {
        const select2 = await query(queryData2);
        if (select2.changedRows > 0) {
            result2 = select2;
            res.status = 'success';
        } else {
            result2 = select2;
            res.status = 'error';
        }
    } catch (error) {
        console.log(error)
    }
    
    conn.destroy();
    return res;
}

exports.getPicturePath = function (masterKey = null, picture = null) {
    let res;
    if (picture != null && picture != "") {
        res = config.hostForImage + "/" + masterKey + "/" + "pictures/" + picture;
    }else{
        res = picture;
    }
    return res;
}

exports.getHtmlPath = function (masterKey = null, htmlfilename = null) {
    let res;
    if (htmlfilename != null && htmlfilename != "") {
        res = config.hostForImage + "/" + masterKey + "/" + "html/" + htmlfilename;
    }else{
        res = htmlfilename;
    }
    return res;
}

exports.getAlbumPath = function (masterKey = null, filename = null) {
    let res;
    if (filename != null && filename != "") {
        res = config.hostForImage + "/" + masterKey + "/" + "album/" + filename;
    }else{
        res = filename;
    }
    return res;
}

exports.getFilesPath = function (masterKey = null, filename = null) {
    let res;
    if (filename != null && filename != "") {
        res = config.hostForImage + "/" + masterKey + "/" + "file/" + filename;
    }else{
        res = filename;
    }
    return res;
}

exports.getVdoPath = function (masterKey = null, filename = null) {
    let res;
    if (filename != null && filename != "") {
        res = config.hostForImage + "/" + masterKey + "/" + "vdo/" + filename;
    }else{
        res = filename;
    }
    return res;
}
