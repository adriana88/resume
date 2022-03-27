class TypingEfect {
    // typing efect constructor
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      // current index of word
      const current = this.wordIndex % this.words.length;
      // getting full text of current word
      const fullTxt = this.words[current];
  
      // check if deleting
      if (this.isDeleting) {
        // remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      // inserting txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // setting typing speed
      let typeSpeed = 110;
  
      if (this.isDeleting) {
        typeSpeed /= 2;
      }
  
      // if word is complete
      if (!this.isDeleting && this.txt === fullTxt) {
        // making pause at end
        typeSpeed = this.wait;
        // setting delete to true
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // moving to next word
        this.wordIndex++;
        // pause before start typing
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  // initializing on DOM load
  document.addEventListener('DOMContentLoaded', init);
  
  // initializing app
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Initializing TypingEfect
    new TypingEfect(txtElement, words, wait);
  }