var formElements = document.querySelectorAll('.hello');
var elementsToBeBlurred = document.querySelectorAll('.not-blurry');
var slidingAside = document.getElementById('sliding-aside');
var disappearingLeftSide = document.getElementById('sliding');
var dismissButton = document.getElementById('dismiss');
var i, j, k;


var blurRestOfPage = function(event) {
    var target = event.target;
    //Make all of the changes to the page
    for(j = 0; j < elementsToBeBlurred.length; j++) {
        elementsToBeBlurred[j].classList.add('blurry');
        elementsToBeBlurred[j].classList.remove('not-blurry');
        elementsToBeBlurred[j].style.pointerEvents = 'none';
    }
    slidingAside.classList.add('centered');
    slidingAside.classList.remove('aside');
    disappearingLeftSide.classList.add('slide-left');
    disappearingLeftSide.classList.remove('slide-right');
    
    console.log("Form element index 0: " + formElements[1].outerHTML);
    
    //No longer listen for events in the form
    for(i = 0; i < formElements.length; i++) {
        formElements[i].removeEventListener('click', blurRestOfPage, false);
        formElements[1].addEventListener('keypress', function(event) {
            var keyPress = event.which || event.keyCode;
            if(event.shiftKey && (keyPress === 9)) {
                resetAside();
            } else {
                console.log("SUCKS TO SUCK");
            }
        });
    }
    dismissButton.classList.remove('invisible');
    dismissButton.classList.add('visible');
    
    dismissButton.addEventListener('click', resetAside, false);
    dismissButton.addEventListener('keypress', function(event) {
        var keyPress = event.which || event.keyCode;
        if(keyPress === 13) {
            resetAside();
        }
        
    });
};

var resetAside = function() {
    console.log("resetAside RUN");
    //Bring page back to default
    for(j = 0; j < elementsToBeBlurred.length; j++) {
        elementsToBeBlurred[j].classList.add('not-blurry');
        elementsToBeBlurred[j].classList.remove('blurry');
        elementsToBeBlurred[j].style.pointerEvents = 'auto';
    }
    
    slidingAside.classList.add('aside');
    slidingAside.classList.remove('centered');
    
    disappearingLeftSide.classList.add('slide-right');
    disappearingLeftSide.classList.remove('slide-left');
    
    dismissButton.classList.add('invisible');
    dismissButton.classList.remove('visible');
    
    formElements[0].removeEventListener('keypress', function(event) {
            var keyPress = event.which || event.keyCode;
            if(keyPress === 16) {
                resetAside();
            }
        });
    dismissButton.removeEventListener('click', resetAside, false);
    dismissButton.removeEventListener('keypress', function(event) {
        var key = event.which || event.keyCode;
        if(key === 13) {
            resetAside();
        }
    });
};


//Listen for when user tabs/clicks into the form
for(i = 0; i < formElements.length; i++) {
    formElements[i].addEventListener('focus', blurRestOfPage, false);
}