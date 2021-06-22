const  app =  require("express");
const router = app.Router();
const services =  require("../service/render");

router.use(app.urlencoded({extended:false}));

router.route("/")
.get(services.home);


module.exports   =  router;