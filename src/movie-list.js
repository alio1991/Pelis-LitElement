import { html, css, LitElement } from 'lit-element';

export class MovieList extends LitElement {
  
  static get styles() {
    return css`
    :host {

    }
    `;
  }
  
  static get properties() {
    return {
      list: { 
        type: Array
      }
    };
  }

  constructor(){
    super();
  }

  render() {
    return html`
    ${console.log('-------------------')
    }
    <h1>List of movies</h1>
    ${this.list.map(elem=> html`<h2>${elem.Title}</h2>`)}
    `;
  }
}

customElements.define('movie-list', MovieList);
