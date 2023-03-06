$(document).ready(function() {
  const tweetText = $('#tweet-text');
  const counter = $('.counter');

  tweetText.on('input', function() {
    const tweetLength = tweetText.val().length;
    const charsLeft = 140 - tweetLength;
    counter.text(charsLeft).toggleClass('pink', charsLeft < 0);
  });
});
