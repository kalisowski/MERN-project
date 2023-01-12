function checkCommentDelay(req, res, next) {
  const delay = 60 * 1000 * 15;
  const cookieName = 'lastCommentTime';
  const lastCommentTime = req.cookies[cookieName];
  if (!lastCommentTime) {
    res.cookie(cookieName, Date.now());
    console.log('test2');
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

module.exports = {
  checkCommentDelay,
};
