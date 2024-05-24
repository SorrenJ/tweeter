/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <img src="${tweet.user.avatars}" alt="${tweet.user.name}" width="64">
          <h3>${tweet.user.name} <span class="username">${tweet.user.handle}</span></h3>
        </header>
        <div class="content">
          ${tweet.content.text}
        </div>
        <footer>
          <div class="date">${new Date(tweet.created_at).toLocaleString()}</div>
          <div class="actions">
            <span><i class="fa-solid fa-flag"></i></span>
            <span><i class="fa-solid fa-retweet"></i></span>
            <span><i class="fa-solid fa-heart"></i></span>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  const $tweet = createTweetElement(tweetData);
  $('#tweets-container').append($tweet);
});