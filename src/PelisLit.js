import { html, css, LitElement } from 'lit-element';
import './movie-list.js';
import './input-search.js';

export class PelisLit extends LitElement {

  static get styles() {
    return css`
      :host {
        height: 100%;
        width: 100%;
      }

      input-search{
        height: 300px;
        width: 100%;
        background-color: red;
      }
    `;
  }

  static get properties() {
    return {
			movies:{
        type: Array,
        observer: '_temp2Changed'
      }
		}
  }

  constructor(){
    super();
    this.movies = [{Title:'EXAMPLE'}];
  }

  _temp2Changed(a){
    console.log('CAMBIADO');
  }

  getMovies({target}){
    this.movies = [{Title:'1'},{Title:'2'}];
    const {value} = target;
    if(value.length >3){
      const page = 1;
      const type = 'movie';
      fetch(`https://www.omdbapi.com/?s=${value}&plot=full&apikey=e477ed6a&page=${page}&type=${type}`)
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.Search && result.Search.length > 0){
          // this.set('movies',result.Search);
          this.movies = Object.assign([], result.Search);
          // this.movies = [...result.Search]; 
          console.log(this.movies);
        }else{
          this.movies = [];        
        }
      });
    }
   
  }

  render() {
    return html`
      <input-search .inputChanges=${this.getMovies} .title=${'Buscador de Películas'} ></input-search>
      <movie-list .list=${this.movies}></movie-list>
    `;
  }

}
