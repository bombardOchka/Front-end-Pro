
class Slider {
    constructor(sliderEl) {
      this.sliderEl = sliderEl;
    }
  
    slidesContainer = document.getElementsByClassName('slides')[0];
    slides = Array.from(this.slidesContainer.children);
    slideWidth = this.slides[0].offsetWidth;
    currentSlideIndex = 1;

  
    openSlideByIndex(index) {
        index = index - 1;
        this.slidesContainer.style.transform = `translateX(-${index * this.slideWidth}px)`;
      }


    nextSlide() {
        if (this.currentSlideIndex === this.slides.length) {
            this.currentSlideIndex = 1;
        }
        else {
            this.currentSlideIndex++;
        }
        this.openSlideByIndex(this.currentSlideIndex);
    }

    prevSlide() {
        if (this.currentSlideIndex === 1) {
            this.currentSlideIndex = this.slides.length;
        }
        else {
            this.currentSlideIndex--;
        }
        this.openSlideByIndex(this.currentSlideIndex);
    }

    lastSlide() {
        this.currentSlideIndex = this.slides.length;
        this.openSlideByIndex(this.currentSlideIndex);
    }

    firstSlide() {
        this.currentSlideIndex = 1;
        this.openSlideByIndex(this.currentSlideIndex);
    }

  
    addSlide(title, description) {
      if (title.trim() !== '' && description.trim() !== '') {
        const newSlide = document.createElement('div');
        const newTitle = document.createElement('h3');
        const newDescription = document.createElement('p');
  
        newSlide.classList.add('slide');
        newTitle.innerText = title;
        newDescription.innerText = description;
  
        newSlide.append(newTitle);
        newSlide.append(newDescription);
        this.slidesContainer.append(newSlide);
        this.slides.push(newSlide);

        this.currentSlideIndex = this.slides.length;
        this.openSlideByIndex(this.currentSlideIndex);
      }
      else {
        alert("valid error");
      }
    }
 

    insertSlide(number, title, description) {
      number = number - 1;
      if (number >= 0 && number <= this.slides.length && title.trim() !== '' && description.trim() !== '') {

        const newSlide = document.createElement('div');
        const newTitle = document.createElement('h3');
        const newDescription = document.createElement('p');

        newSlide.classList.add('slide');
        newTitle.innerText = title;
        newDescription.innerText = description;

        newSlide.append(newTitle);
        newSlide.append(newDescription);
        
        this.slidesContainer.insertBefore(newSlide, this.slides[number]);
        this.slides.splice(number, 0, newSlide);

        this.openSlideByIndex(this.currentSlideIndex);

        this.currentSlideIndex = number+1
        this.openSlideByIndex(this.currentSlideIndex);
      }
      else {
        alert("valid error");
      }
    }
  


    removeLastSlide() {
      if (this.slides.length > 0) {
        this.slidesContainer.removeChild(this.slides[this.slides.length - 1]);
        this.slides.pop();
        if (this.currentSlideIndex === this.slides.length + 1) {
          this.currentSlideIndex--;
        }
        this.openSlideByIndex(this.currentSlideIndex);
      }
      else {
        alert("valid error")
      }
    }
  


    removeSlide(number) {
      number = number - 1;
      if (number >= 0 && number < this.slides.length) {
        if(number+1<this.currentSlideIndex) {
          this.currentSlideIndex-=1;
        }
        this.slidesContainer.removeChild(this.slides[number]);
        this.slides.splice(number, 1);
        this.openSlideByIndex(this.currentSlideIndex);
      }
      else {
        alert("valid error");
      }
    }
  }
  
  const sliderEl = document.getElementsByClassName('slider')[0];
  const slider = new Slider(sliderEl);




const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
const firstButton = document.getElementById('firstBtn');
const lastButton = document.getElementById('lastBtn');
const addButton = document.getElementById('addBtn');
const insertButton = document.getElementById('insertBtn');
const removeIndexButton = document.getElementById('removeIndexBtn');
const removeButton = document.getElementById('removeBtn');


nextButton.addEventListener('click', () => slider.nextSlide());
prevButton.addEventListener('click', () => slider.prevSlide());
firstButton.addEventListener('click', () => slider.firstSlide());
lastButton.addEventListener('click', () => slider.lastSlide());

addButton.addEventListener('click', () => {
  let title = document.getElementById('titleInput').value;
  let description = document.getElementById('descriptionInput').value;
  slider.addSlide(title, description);
  document.getElementById('titleInput').value = '';
  document.getElementById('descriptionInput').value = '';
});


insertButton.addEventListener('click', () => {
  let number = document.getElementById('insertIndexInput').value;
  let title = document.getElementById('insertTitleInput').value;
  let description = document.getElementById('insertDescriptionInput').value;
  slider.insertSlide(number, title, description);
  document.getElementById('insertTitleInput').value = '';
  document.getElementById('insertDescriptionInput').value = '';
  document.getElementById('insertIndexInput').value = '';
});

removeIndexButton.addEventListener('click', () => {
  let number = document.getElementById('removeIndexInput').value;
  slider.removeSlide(number);
  document.getElementById('removeIndexInput').value = '';
});

removeButton.addEventListener('click', () => slider.removeLastSlide());







