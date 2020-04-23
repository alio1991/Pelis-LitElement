import { html, css, LitElement } from 'lit-element';

export class MovieCard extends LitElement {
  
  static get styles() {
    return css`
    :host {
        height: fit-content;
    }

    .card{
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 5px;
        border: 1px solid black;
    }

    .standard{
        width: 250px;
        height: 400px;
        background-color: #add8e6;
    }
    .standard img{
        width: 200px;
        height: 300px;
    }

    .favorite{
        width: 100px;
        height: 190px;
        background-color: #f08080;
        
    }
    .favorite img{
        width: 90px;
        height: 110px;
    }
    `;
  }
  
  static get properties() {
    return {
      movie: { 
        type: Object
      },
      class: { 
        type: String
      }
    };
  }

  constructor(){
    super();
  }

  cardSelected(ev){      
      
    document.dispatchEvent( new CustomEvent('cardSelected', {
      detail: {
        id: this.movie.imdbID,
        type: this.class
      }
    }));
  }

  getSrc() {
    return this.movie.Poster === 'N/A' ? '../src/no-image.png' : this.movie.Poster;
  }

  render() {
    return html`
        <div class=${'card '+this.class} @click=${this.cardSelected}
            <p>${this.movie.Title}</p>
            <img src=${this.getSrc()} @error=${this.src='../src/no-image.png'}/>
        </div>
    `;
  }
}

customElements.define('movie-card', MovieCard);
