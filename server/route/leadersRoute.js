const app   = require("express");
const router =  app.Router();
const Leaders = require("../model/leaderModule");
const renderLeaders =  require("../controller/renderLeaders");
const {body} =  require("express-validator");
const cors = require("./cors");
const uploadImage =  require("./uploadfile");
const {isAuth} = require("../../util/isAuth");
router.use(app.json());
router.use(app.urlencoded({extended:false}));
router.route("/")
.get( cors.corsOptions,isAuth , renderLeaders.find)

.post(cors.corsOptions,  isAuth, uploadImage.uploadfile, [body("name" , "Name must be letters and not empty").isAlpha().not().isEmpty().custom((value , {req})=>{

    return Leaders.findOne({name:value}).then(leaderDoc=>{
        if(leaderDoc)return Promise.reject("Names must be different");
        return true;
    }
    
    )


}) , body("abbr" ,"abbr must be a letters and not empty ").isAlpha().notEmpty() ,  body("designation").isAlpha().notEmpty().custom((value , {req})=>{

    return Leaders.findOne({designation:value}).then(leaderDoc=>{
          if(leaderDoc)return Promise.reject("Names must be different");
          return true;
    }
    
    )
   
})],  renderLeaders.create)

.put(cors.corsOptions, isAuth ,renderLeaders.update)

.delete(cors.corsOptions,isAuth, renderLeaders.delete)


router.route("/:id")
.get( cors.corsOptions,isAuth,  renderLeaders.findId)

.post(cors.corsOptions,isAuth,    renderLeaders.createById)

.put(cors.corsOptions, isAuth,uploadImage.uploadfile,[body("abbr" ,"abbr must be a letters and not empty ").isAlpha().notEmpty() 
] ,
 renderLeaders.updateId)

.delete(cors.corsOptions,isAuth,  renderLeaders.deleteByid)

module.exports =  router;
