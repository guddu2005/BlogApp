// const {Router} = require("express");
// const healthRouter = Router();


const gethealth = (req, res) => {
    return res.status(200).send();
}



module.exports = {
    gethealth,
}