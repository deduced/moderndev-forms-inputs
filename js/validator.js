(function ( window ){
    var validator = {};


    function isEmailAddress( input ){
        /**
         * Checks if an email address uses valid formatting
         * @param {string} input
         * @return {boolean}
         */

        try {
            // check for empty or undefined parameter
            if (!input) {
                throw "Function 'isEmailAddress' missing parameter: 'input'.";
            }

            if (typeof input != "string") {
                throw "Input must be of the type: 'string'.";
            }

            if (input.indexOf('@') === -1) {
                throw "You must have at least one '@' sign.";
            }

            // set validation rules
            var permittedChars = "abcdefghijklmnopqrstuvwxyz.0123456789!#$%&'*+-/=?^_`{|}~";
            var localPartMinChars = 1;
            var domainPartMinChars = 3;


            // Get email parts
            var parts = input.split('@');
            var localPart = parts[0];
            var domainPart = parts[1];

            // Test parts length
            if (parts.length !== 2) {
                throw "Only one '@' sign is permitted.";
            }

            // test that domain does not start with a .
            if (domainPart.indexOf('.') <= 0) {
                throw "Domain-part must have at least one '.' and it cannot be the first character after '@'";
            }

            // Test min characters
            if (localPart.length < localPartMinChars || domainPart.length < domainPartMinChars) {
                throw "Too few characters before or after the '@' symbol.";
            }

            // test valid characters in localPart
            for (var i = 0; i < localPart.length; i++) {
                if (permittedChars.indexOf(localPart[i]) == -1) {
                    throw "Invalid characters in the local-part.";
                }
            }

            // test valid character in domain
            for (var i = 0; i < domainPart.length; i++) {
                if (permittedChars.indexOf(domainPart[i]) == -1) {
                    throw "Invalid characters in the domain-part.";
                }
            }

        }
        catch (error) {
            console.log("Error: " + error);
            return false;
        }

        return true;

    }

    function isPhoneNumber(input) {
        /**
         * Checks if a US or Canadian phone number is valid.
         * Assumes exact format: "xxx-xxx-xxxx".
         * @param {string} input
         * @return {boolean}
         */

        if (!input) {
            throw "Function 'isPhoneNumber' missing parameter: 'input'.";
        }

        if (typeof input !== "string") {
            throw "Input must be of the type: 'string'.";
        }

        // get phone number parts
        var phoneParts = input.split('-');

        // check the parts
        if (phoneParts.length !== 3) {
            return false;
        } else {
            var areaCode = phoneParts[0];
            var exchange = phoneParts[1];
            var lineNumber = phoneParts[2];

            if (areaCode.length !== 3 || exchange.length !== 3 || lineNumber.length !== 4) {
                return false;
            }

            if (isNaN(Number(areaCode)) || isNaN(Number(exchange)) || isNaN(Number(lineNumber))) {
                return false;
            }
        }
        
        return true;
    }

    function withoutSymbols( input ){
        /**
         * Returns the 'input' parameter with symbols removed
         * @param {string} input
         * @return {string} results.join('')
         */



        var permitted = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var results = [];

        for (var i = 0; i < input.length; i++) {
            if (permitted.indexOf(input[i]) >= 0) {
                results.push(input[i]);
            }
        }
        return results.join('');
    }

    function isDate( input ){
        /**
         * checks if the input parameter is a valid date
         * a valid date is any string that can be turned into a JavaScript Date Object.
         * @param {string} input
         * @return {boolean}
         */

        return !isNaN(Date.parse(input));
    }

    function isBeforeDate( input, reference ){
        /**
         * Checks if the input paramater is a date that comes before the reference parameter.
         * @param {string|Date} input
         * @param {string|Date} reference
         * @return {boolean}
         */


        if (!isDate(input) || !isDate(reference)) {
            throw "'Input' or 'reference' are not valid dates.";
        }

        let date1 = new Date(input);
        let date2 = new Date(reference);

        return date1 < date2;

    }

    function isAfterDate( input, reference ){
        /**
         * Checks if the input paramater is a date that comes after the reference parameter.
         * @param {string|Date} input
         * @param {string|Date} reference
         * @return {boolean}
         */


        if (!isDate(input) || !isDate(reference)) {
            throw "'Input' or 'reference' are not valid dates.";
        }

        let date1 = new Date(input);
        let date2 = new Date(reference);

        return date1 > date2;

    }

    function isBeforeToday( input ){
        /**
         * Checks if the input parameter is a date that comes before today
         * @param {string|Date} input
         * @return {boolean}
         */


        if (!isDate(input)) {
            throw "The parameter 'input' is not a valid date.";
        }

        let date1 = new Date(input);
        let today = new Date();

        return date1 < today;
    }

    function isAfterToday( input ){
        /**
         * Checks if the input parameter is a date that comes after today
         * @param {string|Date} input
         * @return {boolean}
         */


        if (!isDate(input)) {
            throw "The parameter 'input' is not a valid date.";
        }

        let date1 = new Date(input);
        let today = new Date();

        return date1 > today;
    }

    function isEmpty( input ) {
        /**
         * Checks if the input parameter contains only whitespace
         * @param {string} input
         * @return {boolean}
         */

        if (typeof input !== "string") {
            return false;
        }

        return input.trim() === "";
    }

    function contains( input, words ){
        /**
         * Checks if the input parameter contains one or more words of the words array.
         * @param {string} input
         * @param {Array} words
         * @return {boolean}
         */

        if (!input || !words) {
            throw "Function 'contains' missing parameter.";
        }

        if (typeof input !== "string" || !Array.isArray(words)) {
            throw "Input must be of the type: 'string' and words must be of type 'Array'.";
        }

        let inputSplitHyphen = input.split("-").join(" ");
        let inputWithoutSymbols = withoutSymbols(inputSplitHyphen);
        let inputLowerCase = inputWithoutSymbols.toLowerCase().split(" ");
        let wordsLowerCase = words.toLocaleString().toLowerCase().split(",");

        for (var i = 0; i < wordsLowerCase.length; i++) {
            if (inputLowerCase.indexOf(wordsLowerCase[i]) !== -1) {
                return true;
            }
        }
        return false;

    }

    function lacks( input, words ){
        /**
         * Checks if the input parameter does not contain any of the words of the words array.
         * @param {string} input
         * @param {Array} words
         * @return {boolean}
         */

        if (!input || !words) {
            throw "Function 'contains' missing parameter.";
        }

        if (typeof input !== "string" || !Array.isArray(words)) {
            throw "Input must be of the type: 'string' and words must be of type 'Array'.";
        }

        let inputSplitHyphen = input.split("-").join(" ");
        let inputWithoutSymbols = withoutSymbols(inputSplitHyphen);
        let inputLowerCase = inputWithoutSymbols.toLowerCase().split(" ");
        let wordsLowerCase = words.toLocaleString().toLowerCase().split(",");

        for (var i = 0; i < wordsLowerCase.length; i++) {
            if (inputLowerCase.indexOf(wordsLowerCase[i]) === -1) {
                return true;
            }
        }
        return false;

    }

    function isComposedOf( input, strings ){
        /**
         * Checks if the input parameter contains strings found within string parameter.
         * @param {string} input
         * @param {Array} strings
         * @return {boolean}
         */

        if (!input || !strings) {
            throw "Function 'isComposedOf' missing parameter.";
        }

        if (typeof input !== "string" || !Array.isArray(strings)) {
            throw "Input must be of the type: 'string' and strings must be of type 'Array'.";
        }



        for (var i = 0; i < strings.length; i++) {
            if (input.indexOf(strings[i]) >= 0) {
                return true;
            }
        }
        return false;

    }

    function isLength( input, n ){
        /**
         * Checks if the input parameter's character count is less than or equal to the n parameter.
         * @param {string} input
         * @param {number} n
         * @return {boolean} input.length <= n
         */

        if (!input || !n) {
            throw "Function 'isLength' missing parameter(s).";
        }

        if (typeof input !== "string" || typeof n !== "number") {
            throw "Input must be of the type: 'string' and n must be of type 'number'.";
        }

        return input.length <= n;
    }

    function isOfLength( input, n ){
        /**
         * Checks if the input parameter's character count is greater than or equal to the n parameter.
         * @param {string} input
         * @param {number} n
         * @return {boolean} input.length >= n
         */

        if (!input || !n) {
            throw "Function 'isOfLength' missing parameter(s).";
        }

        if (typeof input !== "string" || typeof n !== "number") {
            throw "Input must be of the type: 'string' and n must be of type 'number'.";
        }

        return input.length >= n;
    }

    function countWords( input ){
        /**
         * Counts the number of words in the input parameter.
         * @param {string} input
         * @return {number} inputLowerCase.length
         */


        if (typeof input !== "string") {
            throw "Input must be of the type: 'string'.";
        }

        let inputSplitHyphen = input.split("-").join(" ");
        let inputWithoutSymbols = withoutSymbols(inputSplitHyphen);
        let inputLowerCase = inputWithoutSymbols.toLowerCase().split(" ");


        return inputLowerCase.length;

    }

    function lessWordsThan( input, n ){
        /**
         * Checks if the input parameter has a word count less than or equal to the n parameter
         * @param {string} input
         * @return {number} n
         */

        if (typeof input !== "string" || typeof n !== "number") {
            throw "Input must be of the type: 'string' and/or n must be of type 'number'.";
        }

        if (countWords(input) <= n) {
            return true;
        }

        return false;
    }

    function moreWordsThan( input, n ){
        /**
         * Checks if the input parameter has a word count greater than or equal to the n parameter
         * @param {string} input
         * @return {number} n
         */

        if (typeof input !== "string" || typeof n !== "number") {
            throw "Input must be of the type: 'string' and/or n must be of type 'number'.";
        }

        if (countWords(input) >= n) {
            return true;
        }

        return false;
    }

    function isBetween( input, floor, ceil ){
        /**
         * Checks that the input parameter matches the following:
         * 1) input is greater than or equal to floor parameter,
         * 2) input is less than or equal to ceil parameter.
         * @param {number} input
         * @param {number} floor
         * @param {number} ceil
         * @return {boolean}
         */

        if (!input || !floor || !ceil) {
            throw "Function 'isBetween' missing parameter(s).";
        }

        if (typeof input !== "number" || typeof floor !== "number" || typeof ceil !== "number") {
            throw "Input, floor, and ceil parameters must be of the type: 'number'.";
        }

        if (floor <= input && input <= ceil) {
            return true;
        }

        return false;
    }

    function isAlphanumeric( input ){
        /**
         * Checks that the input parameter string is only composed of a-z, A-Z, 0-9
         * @param {string} input
         * @return {boolean}
         */

        if (typeof input !== "string") {
            throw "Input must be of the type: 'string'.";
        }

        // define permitted characters
        const PERMITTED = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


        for (let i = 0; i < input.length; i++) {
            if (PERMITTED.indexOf(input[i]) === -1) {
                return false;
            }
        }

        return true;
    }

    function isCreditCard( input ){
        /**
         * Checks if the input parameter is a credit card or a bank card number. Defined as
         * four sets of four alphanumeric characters separated by hyphens or a single string
         * of alphanumeric characters without hyphens.
         * @param {string} input
         * @return {boolean}
         */

        // validate the input
        if (!input) {
            throw "Function 'isCreditCard' missing parameter 'input'.";
        }

        if (typeof input !== "string") {
            throw "Input must be of the type: 'string'.";
        }

        if (input.length > 19) {
            return false;
        }

        if (input.length < 16) {
            return false;
        }

        return isAlphanumeric(input.split("-").join(""));
    }

    function isHex( input ){
        /**
         * Checks if the input string is a hexadecimal color, such as #3677bb. Hexadecimal colors
         * are strings with a length of 7, using character 0-9, A-F. isHex should also work on
         * shorthand hex colors, such as #333. The input must start with # to be considered valid.
         * @param {string} input
         * @return {boolean}
         */

        // validate the input
        if (!input) {
            throw "Missing parameter 'input'.";
        }

        if (typeof input !== "string") {
            throw "Input must be of the type: 'string'.";
        }

        if (input.indexOf("#") !== 0) {
            return false;
        }

        if (input.length > 7 || input.length < 4) {
            return false;
        }

        // define permitted characters for a hexadecimal
        const PERMITTED = "#0123456789abcdef";

        // set to lower case
        let inputLowerCase = input.toLowerCase();

        // check that characters are permitted ones
        for (let i = 0; i < inputLowerCase.length; i++) {
            if (PERMITTED.indexOf(inputLowerCase[i]) === -1) {
                return false;
            }
        }

        return true;
    }

    function isRGB( input ){
        /**
         * Checks if the input string is an RGB color, such as rgb(200, 26, 131). An RGB color consists of:
         * 1) 3 numbers between 0 and 255;
         * 2) a comma between each number;
         * 3) the 3 numbers should be contained within "rgb(" and ")".
         * @param {string} input
         * @return {boolean}
         */

        // validate the input
        if (!input) {
            throw "Missing parameter 'input'.";
        }

        if (typeof input !== "string") {
            throw "Input must be of the type: 'string'.";
        }

        // set the string to lower case.
        let inputLowerCase = input.toLowerCase();

        if (inputLowerCase.indexOf("rgb(") === -1 || inputLowerCase.indexOf(")") === -1) {
            return false;
        }

        // create an array of the 3 color elements
        var inputArray = inputLowerCase.slice(4, -1).split(",");

        if (inputArray.length !== 3) {
            return false;
        } else {
            for (let i = 0; i < inputArray.length; i++) {
                if (Number(inputArray[i]) > 255 || Number(inputArray[i]) < 0) {
                    return false;
                }
            }

        }

        return true;
    }

    function isHSL( input ){
        /**
         * Checks if the input string is an HSL color, such as hsl(122, 1, 1). An HSL color consists of:
         * 1) 3 numbers: first number, hue, is between 0 and 360; second and third numbers, saturation and
         * lightness, are between 0 and 1
         * 2) a comma between each number
         * 3) the 3 numbers should be contained within "hsl(" and ")"
         * @param {string} input
         * @return {boolean}
         */

        // validate the input
        if (!input) {
            throw "Missing parameter 'input'.";
        }

        if (typeof input !== "string") {
            throw "Input must be of the type: 'string'.";
        }

        // set the string to lower case.
        let inputLowerCase = input.toLowerCase();

        if (inputLowerCase.indexOf("hsl(") === -1 || inputLowerCase.indexOf(")") === -1) {
            return false;
        }

        // create an array of the 3 color elements
        var inputArray = inputLowerCase.slice(4, -1).split(",");

        if (inputArray.length !== 3) {
            return false;
        }

        if (Number(inputArray[0]) < 0 || Number(inputArray[0]) > 360) {
            return false;
        }

        for (let i = 1; i < 3; i++) {
            if (Number(inputArray[i]) < 0 || Number(inputArray[i]) > 1) {
                return false;
            }
        }

        return true;
    }

    function isColor( input ){
        /**
         * Checks if the input parameter is a hex, RGB, or HSL color type.
         * @param {string} input
         * @return {boolean}
         */

        return isHex(input) || isRGB(input) || isHSL(input);
    }

    function isTrimmed( input ){
        /**
         * Checks if the input parameter has leading or trailing whitespaces or too many spaces between
         * words.
         * @param {string} input
         * @return {boolean}
         */

        // validate the input
        if (!input) {
            throw "Missing parameter 'input'.";
        }

        if (typeof input !== "string") {
            throw "Input must be of the type: 'string'.";
        }

        // trim the input
        let trimmedInput = input.trim();

        // check for whitespace on both ends
        if (trimmedInput !== input) {
          return false;
        }

        // initialize whitespace counter
        let whitespaceCounter = 0;

        // create an array of characters from trimmedInput
        let inputArray = trimmedInput.split("");

        // loop through the array to find sequential spaces
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i].indexOf(" ") !== -1) {
                whitespaceCounter++;

                if (whitespaceCounter > 1) {
                  return false;
                }
            } else {
              whitespaceCounter = 0; // reset counter
            }
        }

        if (whitespaceCounter > 2) {
            return false;
        }

        return true;
    }

    validator.isEmailAddress = isEmailAddress;
    validator.isPhoneNumber = isPhoneNumber;
    validator.withoutSymbols = withoutSymbols;
    validator.isDate = isDate;
    validator.isBeforeDate = isBeforeDate;
    validator.isAfterDate = isAfterDate;
    validator.isBeforeToday = isBeforeToday;
    validator.isAfterToday = isAfterToday;
    validator.isEmpty = isEmpty;
    validator.contains = contains;
    validator.lacks = lacks;
    validator.isComposedOf = isComposedOf;
    validator.isLength = isLength;
    validator.isOfLength = isOfLength;
    validator.countWords = countWords;
    validator.lessWordsThan = lessWordsThan;
    validator.moreWordsThan = moreWordsThan;
    validator.isBetween = isBetween;
    validator.isAlphanumeric = isAlphanumeric;
    validator.isCreditCard = isCreditCard;
    validator.isHex = isHex;
    validator.isRGB = isRGB;
    validator.isHSL = isHSL;
    validator.isColor = isColor;
    validator.isTrimmed = isTrimmed;

    window.validator = validator; //expose to global

})( window );
