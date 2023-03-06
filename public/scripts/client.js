/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function() {

  const data = [
  ]

  // Escape function from lighthouse to prevent XXS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    $(".the-tweets").prepend(createTweetElement(tweet));
  }
  }
  
  const createTweetElement = function(tweet) {
    const time = timeago.format(tweet.created_at);
    return $(`
      <article>
        <div class="tweet-creater">
          <div>
          <img class="img" src="${tweet.user.avatars}" alt="avatar">
          <span>${tweet.user.name}</span>
          </div>
          <div class="username">
          <span>${tweet.user.handle}</span>
          </div>
        </div>
        <div class="tweet-content">
          <p>${escape(tweet.content.text)}</p>
        </div>
        <div class="time-created">
          <div>
            <span>${time}</span>
          </div>
          <div>
            <span>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-sharp fa-solid fa-heart"></i>
            </span>
          </div>
        </div>
      </article>
    `);
  };
  renderTweets(data);
  
  const tweetForm = $('.tweet-form');
  tweetForm.on('submit', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const tweetText = $(`#tweet-text`).val();
    console.log(tweetText);
  
    const length = tweetText.trim().length;
    if (length === 0) {
      return $(".empty-validation-error").removeClass("hidden1").slideDown(1000).slideUp(4600);
    } else if (length > 140) {
      return $(".long-validation-error").removeClass("hidden2").slideDown(1000).slideUp(4600);
    } else { 
      $.post('/tweets', serializedData)
      .done(function(data) {
      $(".empty-validation-error").addClass("hidden1");
      $(".long-validation-error").addClass("hidden2");
      })
      .done(function(data) {
      loadTweets();
      })
      .fail(function(error) {
       console.error(error);
      });
     }
   }
  );
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      type: "GET",
      dataType: "json",
      success: function(res) {
        $('.the-tweets').empty();
        renderTweets(res);
      },
      error: function(error) {
        console.error(error);
      }
    });
  };
  
  loadTweets();
  
  });
  