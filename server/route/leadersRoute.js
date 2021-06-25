const app   = require("express");
const router =  app.Router();
const renderLeaders =  require("../controller/renderLeaders");
const cors = require("./cors");
const uploadImage =  require("./uploadfile");
router.use(app.json());
router.use(app.urlencoded({extended:false}));
router.route("/")
.get( cors.corsOptions, renderLeaders.find)

.post(cors.corsOptions,  uploadImage.uploadfile, renderLeaders.create)

.put(cors.corsOptions, renderLeaders.update)

.delete(cors.corsOptions, renderLeaders.delete)

module.exports =  router;
