/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];


  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  
    // data [{},{},{}]
    console.log(tweets.length);
    for (let i = 0; i < tweets.length; i++) {// {}, {}, {}
     
      let tweet = tweets[i];
      let newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(newTweet);
    }
  
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
      </br>
    `);
    return $tweet;
  };
  
  // renderTweets(data);
  // const $tweet = createTweetElement(tweetData);
 



  const $tweetForm = $('#tweet-form');


  $tweetForm.submit(function(event) {
    event.preventDefault();

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $("#tweet-form").serialize()
    })
      .then(() => {
        $('#tweet-container').empty();
       
        renderTweets(data.reverse());
      })
      .catch((error) => {
        console.log("error: ", error);
      });

    console.log("#tweet-form.serialize() value: ", $("#tweet-form").serialize());

  });

});