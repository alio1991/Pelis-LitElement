import { html, css, LitElement } from 'lit-element';
import './movie-card.js';


export class MovieList extends LitElement {
  
  static get styles() {
    return css`
    :host {
      display: flex;
      flex-wrap: wrap;
      height: fit-content;
    }
    
    `;
  }
  
  static get properties() {
    return {
      list: { 
        type: Array
      },
      class: {
        type: String
      }
    };
  }

  constructor(){
    super();
  }

  render() {
    return html`
    ${this.list.length ? this.list.map(movie=> 
      html`<movie-card .class=${this.class} .movie=${movie}></movie-card>`) : 
      this.class==='favorite' ? 'No hay favoritos' : 'No se encontraron resultados.'}
    `;
  }
}

customElements.define('movie-list', MovieList);
