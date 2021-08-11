const shirtMask = <HTMLElement>document.querySelector('.shirt__overlay__pattern');
const textileWrapper = <HTMLElement>document.querySelector('.textiles');

const db: string[] = [
    'https://assets.codepen.io/450456/swatch2-preview.png',
    'https://assets.codepen.io/450456/swatch5-preview.png',
    'https://assets.codepen.io/450456/swatch3-preview.png'
];

type Img = string | null;

interface ITextiles {
    img: string | null
    clearTexture?: () => void
    switchTexture?: () => void
}

class TextilesLogic implements ITextiles {
    constructor(readonly img: Img) {}
 
    imposition(): void {
        if(this.img !== null)
            this.switchTexture()
        else
            this.clearTexture()
    }

    clearTexture(): void {
        shirtMask.style.background = ``;
    }

    switchTexture(): void {          
        shirtMask.style.background = `url('${this.img}')`
    }
}

class TextileRender {
    constructor(readonly img: Img) {}

    createElement(): void {
        const wrapper = document.createElement('button');
        wrapper.classList.add('textiles__option');

        if(this.img != null) {
            const innerImage = this.defineImage();
            wrapper.append(innerImage);
        }

        if(this.img === null)
            wrapper.classList.add('textiles__option--clear');

        wrapper.addEventListener('click', this.TextileClickHandler.bind(null, this.img));
        textileWrapper.append(wrapper);
    }  

    defineImage(): HTMLElement {
        const image = document.createElement('img');
        image.src = this.img as string;
        return image;
    }

    TextileClickHandler(img: Img): void {
        const newTextile:TextilesLogic = new TextilesLogic(img);   
        newTextile.imposition(); 
    }
}

class TextileInit {
    static init(): void {
        for(let i = 0; i < db.length; i++) {
            const textile:TextileRender = new TextileRender(db[i])
            textile.createElement();
        }
    }
}

TextileInit.init()