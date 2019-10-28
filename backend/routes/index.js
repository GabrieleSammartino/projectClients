var express = require('express');
var Category = require('../models/Category');
var Client = require('../models/Client');
var Relation = require('../models/Relation');
var State = require('../models/State');
var Exchange = require('../models/Exchange');
var Opportuniy = require('../models/Opportunity');
var Tag = require('../models/Tag')
var router = express.Router();
let fs = require('fs-extra');
const path = require('path');
var multer = require('multer');


router.get('/files', function (req, res) {

    const testFolder = './documents/' + req.query.company + '/';
    console.log(req.query.company)
    fs.readdir(testFolder, (err, files) => {
        if (err) {
            res.send("Error getting directory information.")
        } else {

            res.send(files);
        }

    });

});
router.get('/clients', function (req, res) {
    Client.find({}, function (err, clients) {
        if (err) return res.status(500).json({error: err});
        res.json(clients);
    });
});
router.get('/opportunities', function (req, res) {
    Opportuniy.find({}, function (err, clients) {
        if (err) return res.status(500).json({error: err});
        res.json(clients);
    });
});

router.get('/state', function (req, res) {
    State.find({_id: req.query.id}, function (err, states) {
        if (err) return res.status(500).json({message: 'Stato non trovato'});
        res.json(states);
    });
});
router.get('/category', function (req, res) {
    Category.find({}, function (err, categories) {
        if (err) return res.status(500).json({error: err});
        res.json(categories);
    });
});

router.get('/docSearch', function (req, res) {
    if (!req.query.typologyId && !req.query.companyId && !req.query.categoryId) {
        Doc.find({
            name: {$regex: req.query.name, $options: 'i'}
        }, function (err, docs) {
            if (err) return res.status(500).json({error: err});
            res.json(docs);
        });
    } else if (!req.query.typologyId && !req.query.companyId) {
        Doc.find({
            name: {$regex: req.query.name, $options: 'i'}, categoryId: req.query.categoryId
        }, function (err, docs) {
            if (err) return res.status(500).json({error: err});
            res.json(docs);
        });
    } else if (!req.query.typologyId && !req.query.categoryId) {
        Doc.find({
            name: {$regex: req.query.name, $options: 'i'}, companyId: req.query.companyId
        }, function (err, docs) {
            if (err) return res.status(500).json({error: err});
            res.json(docs);
        });
    } else if (!req.query.categoryId && !req.query.companyId) {
        Doc.find({
            name: {$regex: req.query.name, $options: 'i'}, typologyId: req.query.typologyId
        }, function (err, docs) {
            if (err) return res.status(500).json({error: err});
            res.json(docs);
        });
    } else if (!req.query.categoryId) {
        Doc.find({
            name: {$regex: req.query.name, $options: 'i'},
            typologyId: req.query.typologyId,
            companyId: req.query.companyId
        }, function (err, docs) {
            if (err) return res.status(500).json({error: err});
            res.json(docs);
        });
    } else if (!req.query.typologyId) {
        Doc.find({
            name: {$regex: req.query.name, $options: 'i'},
            categoryId: req.query.categoryId,
            companyId: req.query.companyId
        }, function (err, docs) {
            if (err) return res.status(500).json({error: err});
            res.json(docs);
        });
    } else if (!req.query.companyId) {
        Doc.find({
            name: {$regex: req.query.name, $options: 'i'}, categoryId: req.query.categoryId
        }, function (err, docs) {
            if (err) return res.status(500).json({error: err});
            res.json(docs);
        });
    } else if (!req.query.categoryId) {
        Doc.find({
            name: {$regex: req.query.name, $options: 'i'}, companyId: req.query.companyId
        }, function (err, docs) {
            if (err) return res.status(500).json({error: err});
            res.json(docs);
        });
    } else {
        Doc.find({
            name: {$regex: req.query.name, $options: 'i'},
            typologyId: req.query.typologyId,
            companyId: req.query.companyId,
            categoryId: req.query.categoryId
        }, function (err, docs) {
            if (err) return res.status(500).json({error: err});
            res.json(docs);
        });
    }
});
router.get('/category', function (req, res) {
    Category.find({}, function (err, categories) {
        if (err) return res.status(500).json({error: err});
        res.json(categories);
    });
});
router.get('/company', function (req, res) {
    Company.find({}, function (err, companies) {
        if (err) return res.status(500).json({error: err});
        res.json(companies);
    });
});
router.get('/typology', function (req, res) {
    Company.find({}, function (err, typologies) {
        if (err) return res.status(500).json({error: err});
        res.json(typologies);
    });
});
router.get('/category:id', function (req, res) {
    Category.find({_id: req.params.id}, function (err, events) {
        if (err) return res.status(500).json({message: 'Documento non trovato'});
        res.json(events);
    });
});
router.get('/categories', function (req, res) {
    Category.find({}, function (err, states) {
        if (err) return res.status(500).json({error: err});
        res.json(states);
    });
});
router.get('/relations', function (req, res) {
    Relation.find({}, function (err, states) {
        if (err) return res.status(500).json({error: err});
        res.json(states);
    });
});
router.get('/exchanges', function (req, res) {
    Exchange.find({}, function (err, states) {
        if (err) return res.status(500).json({error: err});
        res.json(states);
    });
});
router.get('/tags', function (req, res) {
    Tag.find({}, function (err, states) {
        if (err) return res.status(500).json({error: err});
        res.json(states);
    });
});


/*router.post('/', upload.single('doc'), function (req, res) {
    var sub = "uploads\\\\\\\\";
    var newEvent = new Category({
        name: req.body.name,
        //description: req.body.description,
        //userId: req.body.userId,
        //time: req.body.time,
        //maxPartecipant: req.body.maxPartecipant,
        //minPartecipant: req.body.minPartecipant,
        //partecipantId: req.body.partecipantId,
        //address: req.body.address,
        category: req.body.category,
        //pinned: req.body.pinned,
        //link: req.file.path.substring(8,req.file.path.length),
        //eventURL: req.body.userId + "/" + req.body.name.replace(/ /g, '')
        company: req.body.company

    });
    //var img = fs.readFileSync(req.file.path);
    //var encode_image = img.toString('base64');

    newEvent.save(function (err) {

        res.status(201).json(newEvent + err);
    })
});*/
let uploadOpp = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            let company = req.body.company;
            let path = `./opportunities//${company}`;
            fs.mkdirsSync(path);
            callback(null, path);
        },
        filename: (req, file, callback) => {
            //originalname is the uploaded file's name with extn
            callback(null, file.originalname);
        }
    })
});
router.post('/opportunity/', uploadOpp.single('doc'), (req, res) => {


    const testFolder = './opportunities/' + req.body.company + '/';

    fs.readdir(testFolder, (err, files) => {
        if (err) {
            res.send("Error getting directory information.")
        } else {
            console.log(files);
        }
        var newOpp = Opportuniy({

            name: req.body.name,
            desc: req.body.desc,
            clientId: req.body.clientId,
            active: req.body.active


        });
        newOpp.save(function (err) {
            res.status(201).json(newOpp + " " + err + " Name Opportunity: " + req.body.name);
        })
    });
});
router.post('/tag/', (req, res) => {

    var newTag = Tag({

        name: req.body.name

    });
    newTag.save(function (err) {
        res.status(201).json(newTag + " " + err + " Name Tag: " + req.body.name);
    })

});
router.post('/exchange/', (req, res) => {

    var newExc = Exchange({

        name: req.body.name

    });
    newExc.save(function (err) {
        res.status(201).json(newExc + " " + err + " Name Exchange: " + req.body.name);
    })

});

var stringAll = "Abbigliamento, Abbigliamento, Abbigliamento, Agricoltura, Arte, Auto, Auto, Avvocato, Bevande, Bevande, Calcio, Commercio, Commercio, Commercio, Commercio, Commercio, Commercio, Commercio, Commercio, Consulenza, Consulenza, Consulenza, Consulenza, Consulenza, Consulenza Acq, Consulenza Far, Consulenza Fin, Consulenza Fin, Consulenza Fin, Consulenza HR, Consulenza HR, Consulenza HR, Consulenza HR, Consulenza Lav, Consulenza Oper, Consulenza-Inve, Design, Design Fashion, Design Fashion, E-Commerce, Edile, Edilizia, Edilizia, Edilizia, Edilizia, Edilizia, Edilizia, Edilizia, Edilizia, Edilizia, Edilizia, Edilizia Costruz, Edilizia Costruz, Edilizia Costruz, Edilizia Impianti, Edilizia Impianti, Elettronica, Elettronica, Elettronica, Elettronica, Energia, Eventi, Eventi, Eventi, Formazione, Fotografia, Fotografia, General Contr, General Contr, Gioielleria, Immobiliare, Impiantistica, Investor, Investor, Investor, Investor, Investor, Investor, Investor, IT WEB, IT WEB, IT WEB, IT WEB, IT WEB APP, Marketing, Marketing, Marketing, Marketing, Marketing WEB, Marketing WEB, Medicale, Medicale, Metalmeccanico, Metalmeccanico, Noleggio Beni, Orologeria, Progettazione, Progettazione, Progettazione, Pulizie, Ristorazione, Ristorazione, Ristorazione, Ristorazione, Ristorazione, Spedizioni, Spettacolo, Telco, Telco, Traduzioni, Trasporti, Trasporti, Verniciatura";

router.post('/category/', (req, res) => {
    var newCat = Category({
        name: req.body.name
    });

    newCat.save(function (err) {
        res.status(201).json(newCat + " " + err + " Name Category: " + req.body.name);
    })

    /*   for(var i = 0; i < stringAll.split(', ').length;i++){

           var newCat = Category({
                   name: stringAll.split(', ')[i]
               },
           );

           newCat.save(function (err) {
             //  res.status(201).json(newCat + " " + err + " Name Category: " + stringAll.split(', ')[i]);
           })
        }
   */

});

router.get('/states', function (req, res) {
    State.find({}, function (err, states) {
        if (err) return res.status(500).json({error: err});
        res.json(states);
    });
});
router.post('/relation/', (req, res) => {

    var newRelation = Relation({

        name: req.body.name

    });
    newRelation.save(function (err) {
        res.status(201).json(newRelation + " " + err + " Name Relation: " + req.body.name);
    })

});
router.post('/relation/', (req, res) => {

    var newRelation = Relation({

        name: req.body.name

    });
    newRelation.save(function (err) {
        res.status(201).json(newRelation + " " + err + " Name Relation: " + req.body.name);
    })

});
router.post('/state/', (req, res) => {

    var newState = State({

        name: req.body.name

    });
    newState.save(function (err) {
        res.status(201).json(newState + " " + err + " Name State: " + req.body.name);
    })

});
router.put('/state', function (req, res, next) {
    State.findOne({_id: req.query.id}).exec(function (err, State) {
        if (err) return res.status(500).json({message: 'Stato non trovato'});
        if (!State) return res.status(404).json({message: 'Stato non trovato'});
        for (key in req.body) {
            State[key] = req.body[key];
        }
        State.save(function (err) {
            if (err) return res.status(500).json({message: 'Non riesco a salvare' + err});
            res.json(State);
        })
    });
});

router.post('/company', (req, res) => {

    var newComp = Company({

        name: req.body.name
    });
    newComp.save(function (err) {
        res.status(201).json(newComp + " " + err + " Name Company: " + req.body.name);
    })

});


router.post('/relation', (req, res) => {

    var newTypo = Relation({

        name: req.body.name

    });
    newTypo.save(function (err) {
        res.status(201).json(newTypo + err);
    })

});

let upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            let company = req.body.company;
            let path = `./documents//${company}`;
            fs.mkdirsSync(path);
            callback(null, path);
        },
        filename: (req, file, callback) => {
            //originalname is the uploaded file's name with extn
            callback(null, file.originalname);
        }
    })
});
router.post('/client', upload.single('doc'), (req, res) => {

    const testFolder = './documents/' + req.body.company + '/';

    fs.readdir(testFolder, (err, files) => {
        if (err) {
            res.send("Error getting directory information.")
        } else {
            console.log(files);
        }


        var newClient = Client({
            company: req.body.company,
            name: req.body.name,
            relationId: req.body.relationId,
            categoryId: req.body.categoryId,
            exchangeId: req.body.exchangeId,
            stateId: req.body.stateId,
            typoOpp: req.body.typoOpp,
            descOpp: req.body.descOpp,
            note: req.body.note,
            typoAct: req.body.typoAct,
            url: req.body.url,
            tagIds: req.body.tagIds,
            arrayDocs: files //req.file.path.substring(10, req.file.path.length)
        });
        newClient.save(function (err) {
            res.status(201).json(newClient + err);
        })
    });


});

router.put('/boh:id', function (req, res, next) {
    Category.findOne({_id: req.params.id}).exec(function (err, Category) {
        if (err) return res.status(500).json({message: 'Evento non trovato'});
        if (!Category) return res.status(404).json({message: 'Evento non trovato'});
        for (key in req.body) {
            Category[key] = req.body[key];
        }
        Category.save(function (err) {
            if (err) return res.status(500).json({message: 'Non riesco a salvare'});
            res.json(Category);
        })
    });
});

router.delete('/:id', function (req, res, next) {
    Category.remove({_id: req.params.id}, function (err) {
        if (err) return response.status(500).json({message: 'Documento non trovato'});
        res.json({message: 'Documento eliminato correttamente'})
    })
});
module.exports = router;
