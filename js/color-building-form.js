// get the elements that we need for our validations.
var colorSliderRed = document.getElementById('color-slider-red');
var colorSliderGreen = document.getElementById('color-slider-green');
var colorSliderBlue = document.getElementById('color-slider-blue');
var colorSliderAlpha = document.getElementById('color-slider-alpha');
var colorSliderResult = document.getElementById('color-slider-result');
var colorSlidersParent = document.getElementById('color-sliders');

function calculateColor(event) {
  /**
   * Calculates a new RGB color based on slider inputs and performs constraint validation
   * @return {boolean}
   **/

    //create the RGB color based on slider inputs. I ignore the alpha value since validator.isRGB does not take it into account.
    var generatedColor = "rgb(" + colorSliderRed.value + "," + colorSliderGreen.value + "," + colorSliderBlue.value + ")";

    if (event.target !== event.currentTarget) { // only run code if event not equal to parent element
        if (!validator.isRGB(generatedColor)) {
            colorSliderResult.setCustomValidity("Something went horribly horribly wrong.");
            return false;

        } else {
            colorSliderResult.setCustomValidity("");
            colorSliderResult.style.backgroundColor = generatedColor;
        }
    }
    event.stopPropagation(); // stop the event from propagating through DOM unnecessarily
    return true;
}

//add event listener for parent element which catches child propoagation events.
colorSlidersParent.addEventListener('change', calculateColor, false);
