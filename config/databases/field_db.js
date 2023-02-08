// setting
const site = {
    "masterkey": "site",
    "db": "md_site"
}

// top graphic
const tgp = {
    "db": "md_tgp",
    "masterkey": "tg"
}

// cms
const cms = {
    "db_root": "md_cms",
    "db_file": "md_cmf",
    "db_group": "md_cmg",
    "db_album": "md_cma",
    "db_subgroup": "md_cmsg",
    "company:masterkey": "cpn",
    "product:masterkey": "prd",
    "about:masterkey": "abu",
    "news:masterkey": "na",
    "career:masterkey": "bn"
}

// policy
const policy = {
    "db": "md_ab",
    "db_file": "md_abf",
    "masterkey": "plc"
}

// file
const file = {
    "db": "md_cmf",
}

// album
const album = {
    "db": "md_cma",
}

// cookie
const cookie = {
    "db": "md_pdpa",
    "masterkey": "accept"
}

// tags
const tags = {
    "db": "md_tag"
}


module.exports = {
    site: site,
    tgp: tgp,
    cms: cms,
    policy: policy,
    cookie: cookie,
    file: file,
    album: album,
    tags:tags,
}