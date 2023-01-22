function checkCommentDelay(req, res, next) {
  const delay = 60 * 10;
  const cookieName = 'lastCommentTime';
  const lastCommentTime = req.cookies[cookieName];
  if (!lastCommentTime) {
    res.cookie(cookieName, Date.now());
    next();
  } else {
    const currentTime = Date.now();
    const timeSinceLastComment = currentTime - lastCommentTime;

    if (timeSinceLastComment < delay) {
      res
        .status(429)
        .send('You are posting too quickly. Please try again later.');
    } else {
      res.cookie(cookieName, Date.now());
      next();
    }
  }
}

function checkRatingDelay(req, res, next) {
  const delay = 60 * 10;
  const cookieName = 'lastRatingTime';
  const lastRatingTime = req.cookies[cookieName];
  if (!lastRatingTime) {
    res.cookie(cookieName, Date.now());
    next();
  } else {
    const currentTime = Date.now();
    const timeSinceLastRating = currentTime - lastRatingTime;

    if (timeSinceLastRating < delay) {
      res
        .status(429)
        .send('You are rating too quickly. Please try again later.');
    } else {
      res.cookie(cookieName, Date.now());
      next();
    }
  }
}

module.exports = {
  checkCommentDelay,
  checkRatingDelay,
};
