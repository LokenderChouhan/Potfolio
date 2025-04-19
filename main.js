
const navToggle = document.querySelector('.mobile-nav-toggle');
const closeMenuButton = document.querySelector('.closeMenuButton');
const carouselCardsContainer = document.querySelector('.carouselCardsContainer');
const carouselNavContainer = document.querySelector('.carouselNavContainer');

const oneMenuToggle = () => {
  const primaryNav = document.querySelector('.primary-navigation');
  const iconL = document.querySelector('.icon-l');

  primaryNav.hasAttribute('data-visible')
    ? navToggle.setAttribute('aria-expanded', false)
    : navToggle.setAttribute('aria-expanded', true);

  iconL.toggleAttribute('data-visible');
  primaryNav.toggleAttribute('data-visible');
}

function onCorouselNavClick(e) {
  const el = e.target;

  if (el.hasAttribute('active')) {
    return;
  }

  const move = el.dataset.move;
  carouselCardsContainer.dataset.move = move;
  const allNav = [...el.parentElement.children];
  allNav.forEach((navButton) => {
    if (el !== navButton) navButton.removeAttribute('active');
    else navButton.toggleAttribute('active');
  });
}

function onBlogCardClick(e) {
  const card = e.target;
  window.location.href = card.dataset.page;
}

if(carouselNavContainer){
  [...carouselNavContainer.children].forEach((carouselNav) => {
    carouselNav.addEventListener('click', onCorouselNavClick)
  })
}

if(carouselCardsContainer){
  [...carouselCardsContainer.children].forEach((blogCard) => {
    blogCard.addEventListener('click', onBlogCardClick)
  })
}

navToggle.addEventListener('click', oneMenuToggle);
closeMenuButton.addEventListener('click', oneMenuToggle);

const toggleSendButton = (type = 'send') => {
  const sendButton = document.getElementById("sendButton");
  const sendTextDiv = document.getElementById("sendButton").children[0];
  const rightArrowIcons = document.querySelectorAll(".sendRightArrow");
  const sentTickIcon = document.querySelector(".sentTick");
  const loaderIcon = document.querySelector('.loader');
  switch (type) {
    case 'sending':
      sendTextDiv.innerHTML = 'Sending';
      sendButton.disabled = true;
      rightArrowIcons.forEach(el => el.setAttribute('hidden', true));
      sentTickIcon.setAttribute("hidden", true);
      loaderIcon.removeAttribute('hidden');
      break;
    case 'sent':
      sendTextDiv.innerHTML = 'Sent';
      sendButton.disabled = true;
      rightArrowIcons.forEach(el => el.setAttribute('hidden', true));
      sentTickIcon.removeAttribute("hidden");
      loaderIcon.setAttribute('hidden', true);
      break;
    default: // send
      sendTextDiv.innerHTML = 'Send';
      sendButton.disabled = false;
      rightArrowIcons[0].removeAttribute('hidden'); // Black right arrow
      rightArrowIcons[1].setAttribute('hidden', true); // Blue right arrow
      sentTickIcon.setAttribute("hidden", true);
      loaderIcon.setAttribute('hidden', true);
      break;
  }
}

document.getElementById('contact_form').addEventListener('submit', function (event) {
  event.preventDefault();
  toggleSendButton('sending'); // show loader
  emailjs.sendForm('service_om2goh9', 'template_c5l487i', this)
    .then(() => {
      toggleSendButton('sent'); // show sent
      setTimeout(() => {
        toggleSendButton('send'); // reset
      }, 2000);
    }, (error) => {
      console.log('FAILED to send msg : ', error);
      toggleSendButton('send');  // reset
      alert("Something went wrong !");
    });
});