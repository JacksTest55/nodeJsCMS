var config = require('../config');
var Photo = require('../proxy/photo.js');
var validator = require('validator');
var eventproxy = require('eventproxy');

var list_photo_count=config.list_photo_count;


//显示列表
exports.showPhotoList = function(req, res) {

  var page = req.query.p ? parseInt(req.query.p) : 1;
  var currentCategory =req.query.category || 'all';
  Photo.findOnePage(page,currentCategory,function(err,lists,count){

     if (err) {
        return (err);
              }

  res.render('photo',{
    category:config.category,
    currentCategory:currentCategory,
    page:page,
    photos:lists,
    prev:'p='+parseInt(page-1),
    next:'p='+parseInt(page+1),
    isFirstPage: (page - 1) == 0,
    isLastPage: ((page - 1) * list_photo_count + lists.length) >= count,
    count:count})
  })
};

exports.showCreate=function(req, res){

  res.render('create-photo',{
        category:config.category,
        Domain: config.qn_access.Domain,
        Uptoken_Url: config.qn_access.Uptoken_Url
    })

}

exports.publish = function(req, res) {

   var title = validator.trim(req.body.title);
   var discrib = validator.trim(req.body.discrib);
   var tags=validator.trim(req.body.tags);
   var pictures= req.body.pictures;
   var category=req.body.category;
   var authorId=req.session.user._id || '000';
   Photo.newAndSave(title, discrib, pictures,category,authorId, function(err){
       if (err) {
        return next(err);
              }
    res.render('photo',{success:'发布成功！'});

   })

};


exports.showDetail=function(req, res){
   var _id=req.params._id;
   Photo.findOnePhoto(_id,function(err,doc){
      res.render('photo-view',{
        photo:doc
  })


   })
}



