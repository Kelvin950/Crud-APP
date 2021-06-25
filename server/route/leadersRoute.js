const app   = require("express");
const router =  app.Router();
const renderLeaders =  require("../controller/renderLeaders");
const cors = require("./cors");
const uploadImage =  require("./uploadfile");
router.use(app.json());

router.route("/")
.get(renderLeaders.find)

.post( uploadImage.uploadfile, renderLeaders.create)

.put(renderLeaders.update)

.delete(renderLeaders.delete)

module.exports =  router;
