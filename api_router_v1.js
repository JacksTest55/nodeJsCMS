var app           = require('express');
var bodyParser = require('body-parser');

var aticleController   = require('./api/v1/aticle');

var photoController   = require('./api/v1/photo');

var videoController   = require('./api/v1/video');



// var topicController   = require('./api/v1/topic');
// var userController    = require('./api/v1/user');
// var toolsController   = require('./api/v1/tools');
// var replyController   = require('./api/v1/reply');
// var messageController = require('./api/v1/message');
// var middleware        = require('./api/v1/middleware');
// var limit             = require('./middlewares/limit');
var config            = require('./config');

var router            = app.Router();


router.get('/aticles', aticleController.index);

router.get('/videolist', videoController.videolist);


//上传图片

router.post('/upload', function (req,res) {


	res.send({'req':'req'})


	// body...
});


router.post('/delAticle',aticleController.delAticle)
router.post('/delPhoto',photoController.delPhoto)
router.post('/delVideo',videoController.delVideo)





// router.get('/topics', topicController.index);
// router.get('/topic/:id', topicController.show);
// router.post('/topics', middleware.auth, limit.peruserperday('create_topic', config.create_post_per_day), topicController.create);




// router.post('/topic/collect', middleware.auth, topicController.collect); // 关注某话题
// router.post('/topic/de_collect', middleware.auth, topicController.de_collect); // 取消关注某话题


// // 用户
// router.get('/user/:loginname', userController.show);

// // accessToken 测试
// router.post('/accesstoken', middleware.auth, toolsController.accesstoken);

// // 评论
// router.post('/topic/:topic_id/replies', middleware.auth, limit.peruserperday('create_reply', config.create_reply_per_day), replyController.create);
// router.post('/reply/:reply_id/ups', middleware.auth, replyController.ups);

// // 通知
// router.get('/messages', middleware.auth, messageController.index);
// router.get('/message/count', middleware.auth, messageController.count);
// router.post('/message/mark_all', middleware.auth, messageController.markAll);

module.exports = router;
