'use strict';

module.exports = function (Dislike) {
    Dislike.observe('after save', function (ctx, next) {
        var Video = Dislike.app.models.video;
        var disliked = ctx.instance.selected;
        Video.findById(ctx.instance.videoId, (err, foundVideo) => {
            var totaldislikes = foundVideo.totaldislikes
            if (disliked) {
                totaldislikes += 1;
            } else {
                totaldislikes -= 1;
            }
            foundVideo.updateAttributes({ totaldislikes: totaldislikes });
            next();
        });
    });
};
