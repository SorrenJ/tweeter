$(document).ready(function() {
    // --- our code goes here ---
    alert("document is ready");
  


    $("#btn_test").on('click', function() {
        alert("user pressed the button"); //The this keyword is a reference to the button
      });
      
      $("#btn_test").on('click', () => {
        alert("user pressed the button"); //The this keyword here refers to something else!
      });



      $("#char-counter").on('keypress', () => {
        alert("user wrote something"); //The this keyword here refers to something else!
      });


      $("#tweet-text").on('keyup', function(event) {
      
        var charCount = $(this).val().length;
        // alert(`user wrote ${charCount} characters`);
        // Update the character count display
        $('#char-counter').text(charCount);
    
      });
    


    });