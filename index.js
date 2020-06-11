import "@webcomponents/webcomponentsjs/webcomponents-bundle.js";
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js";
import "./style.css";

const GREETINGS = {
  en: 'Hello',
  ru: 'Здорова,',
  de: 'Hallo',
  cn: '替罪羊'
};

let myGreeterTpl = document.getElementById('my-greeter-template');

class MyGreeter extends HTMLElement {

  static get observedAttributes() {
    return ['lang'];
  }

  get lang() {
    return this.getAttribute('lang') || 'en'; 
  }

  set lang(value = 'en') {
    if (value) {
      this.setAttribute('lang', value);
    } else {
      this.removeAttribute('lang'); 
    }
  }

  sr = null;

  constructor() {
    super();
    this.sr = this.attachShadow({mode: 'open'});
    this.sr.appendChild(myGreeterTpl.content.cloneNode(true));
  }

  connectedCallback() {
    this.renderGreeting();
  }

  disconnectedCallback() {
    console.log('Destroyed');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'lang' && oldVal != newVal) {
      this.renderGreeting();
    }
  }

  renderGreeting() {
    let greeting = GREETINGS[this.lang];
    this.sr.querySelector('.greeting').innerHTML = greeting;
  }
}

customElements.define('my-greeter', MyGreeter);
setTimeout(()=> document.querySelector('my-greeter').lang = 'ru', 1500);
setTimeout(()=> document.querySelectorAll('my-greeter')[2].remove(), 2000);