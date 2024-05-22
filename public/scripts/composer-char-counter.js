$(document).ready(function() {
    // --- our code goes here ---
  
      $("#tweet-text").on('keyup', function(event) {
      
        var charCount = $(this).val().length;
        var setLimit = 140;
        var charCounter = setLimit - charCount;

        // alert(`user wrote ${charCount} characters`);
        // Update the character count display
        $('#char-counter').text(charCounter);

        if (charCounter < 0){
        $('#char-counter').css( "color", "red");
        }
    
      });
    


    });