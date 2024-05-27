$(document).ready(function() {
  const $tweetContainer = $('#tweet-container');

  const renderTweets = function(tweets) {
    // Loops through tweets and appends each one to the tweet container
    // Clear only the container if it's the initial load or if new data was posted
    $tweetContainer.empty();
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      $tweetContainer.append(newTweet);
    }
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <img src="${tweet.user.avatars}" alt="${tweet.user.name}" width="64">
          <h3>${tweet.user.name} <span class="username">${tweet.user.handle}</span></h3>
        </header>
        <div class="content">
          ${escape(tweet.content.text)}
        </div>
        <footer>
          <div class="date">${timeago.format(tweet.created_at)}</div>
          <div class="date">${new Date(tweet.created_at).toLocaleString()}</div>
          <div class="actions">
            <span><i class="fa-solid fa-flag"></i></span>
            <span><i class="fa-solid fa-retweet"></i></span>
            <span><i class="fa-solid fa-heart"></i></span>
          </div>
        </footer>
      </article>
      <br>
    `);
    // tweet.content.text.empty();
    return $tweet;
  };

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    })
      .then((data) => {
    
        renderTweets(data.reverse());

      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  loadTweets();
$('.error').hide();

  const $tweetForm = $('#tweet-form');

  $tweetForm.submit(function(event) {
    
 console.log($("#tweet-text").val().length);

    
    
    
    event.preventDefault();
    let setLimit = 140;

    
    if ($("#tweet-text").val().length === 0){ // user inputs 0 chars
   //return alert("Field cannot be blank");
  // $(".error").show();
  $('.error').slideUp(); // slide up in case you have an error message already
  return $("#empty").slideDown(); // the new error message
   }

    if ([...$("#tweet-text").val()].every(char => char === ' ')){ //converts the string to indiv chars and checks if every char is a space
     // return alert("Field cannot be blank");
    // $(".error").show();
    $('.error').slideUp(); // slide up in case you have an error message already
    return $("#empty").slideDown();
         
      }
   
   if ($("#tweet-text").val().length > setLimit){ // user inputs over set char limit
    $('.error').slideUp(); // slide up in case you have an error message already
    return $("#overLim").slideDown();
       
    }
   
    // if statement prevents the user from going to tweet route if the conditions are not met
   if ($("#tweet-text").val().length > 0 && $("#tweet-text").val().length <= setLimit ){

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    })
      .then(() => {
        $('#tweet-text').val(''); // clears text area after a sucessful post
        loadTweets(); // Load tweets again to get the new one
      
        $('.error').slideUp();
      })
      .catch((error) => {
        console.log("error: ", error);
       
      });
    }
    //console.log("#tweet-form.serialize() value: ", $(this).serialize());
  });


  $('#arrow-button-selector').click(function() {
    $('html, body').animate({scrollTop: 0}, 'fast');
});

});
