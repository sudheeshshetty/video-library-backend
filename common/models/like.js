'use strict';

module.exports = function (Like) {
    Like.observe('after save', function (ctx, next) {
        var Video = Like.app.models.video;
        var liked = ctx.instance.selected;
        Video.findById(ctx.instance.videoId, (err, foundVideo) => {
            var totallikes = foundVideo.totallikes
            if (liked) {
                totallikes += 1;
            } else {
                totallikes -= 1;
            }
            foundVideo.updateAttributes({ totallikes: totallikes });
            next();
        });
    });
};
