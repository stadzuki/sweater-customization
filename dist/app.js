"use strict";
var shirtMask = document.querySelector('.shirt__overlay__pattern');
var textileWrapper = document.querySelector('.textiles');
var db = [
    'https://assets.codepen.io/450456/swatch2-preview.png',
    'https://assets.codepen.io/450456/swatch5-preview.png',
    'https://assets.codepen.io/450456/swatch3-preview.png'
];
var TextilesLogic = /** @class */ (function () {
    function TextilesLogic(img) {
        this.img = img;
    }
    TextilesLogic.prototype.imposition = function () {
        if (this.img !== null)
            this.switchTexture();
        else
            this.clearTexture();
    };
    TextilesLogic.prototype.clearTexture = function () {
        shirtMask.style.background = "";
    };
    TextilesLogic.prototype.switchTexture = function () {
        shirtMask.style.background = "url('" + this.img + "')";
    };
    return TextilesLogic;
}());
var TextileRender = /** @class */ (function () {
    function TextileRender(img) {
        this.img = img;
    }
    TextileRender.prototype.createElement = function () {
        var wrapper = document.createElement('button');
        wrapper.classList.add('textiles__option');
        if (this.img != null) {
            var innerImage = this.defineImage();
            wrapper.append(innerImage);
        }
        if (this.img === null)
            wrapper.classList.add('textiles__option--clear');
        wrapper.addEventListener('click', this.TextileClickHandler.bind(null, this.img));
        textileWrapper.append(wrapper);
    };
    TextileRender.prototype.defineImage = function () {
        var image = document.createElement('img');
        image.src = this.img;
        return image;
    };
    TextileRender.prototype.TextileClickHandler = function (img) {
        var newTextile = new TextilesLogic(img);
        newTextile.imposition();
    };
    return TextileRender;
}());
var TextileInit = /** @class */ (function () {
    function TextileInit() {
    }
    TextileInit.init = function () {
        for (var i = 0; i < db.length; i++) {
            var textile = new TextileRender(db[i]);
            textile.createElement();
        }
    };
    return TextileInit;
}());
TextileInit.init();
