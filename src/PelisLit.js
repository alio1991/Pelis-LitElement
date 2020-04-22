import { html, css, LitElement } from 'lit-element';
import './movie-list.js';
import './input-search.js';

export class PelisLit extends LitElement {

  static get styles() {
    return css`
      :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      body{
        margin: 0;
        padding: 0;
      }

      input-search{
        height: 110px;
        width: 100%;
        background-color: yellow;

      }

      .standard{
        width: 70%;
      }

      .favorites{
        width: 30%;
      }

      .content{
        display: flex;
      }
    `;
  }

  static get properties() {
    return {
			movies:{
        type: Array
      },
      favorites:{
        type: Array
      }
		}
  }

  constructor(){
    super();
    document.addEventListener("inputChanges", ev => { this.getMovies(ev.detail.value) });
    document.addEventListener("cardSelected", ev => { this.cardSelected(ev.detail) });
    this.movies = [];
    this.favorites = this.loadFromLocalStorage('favorites') || [];
  }


  cardSelected({id, type}){
    if(type === 'standard'){ //Seleccionada carta resultados
      const movie = this.getMovieById(id, this.movies);
      if(this.favorites.includes(movie)){ //La pelicula ya está en favoritos
        return; //No hacemos nada
      }else{//La pelicula no está en favoritos
        this.favorites = [...this.favorites,movie]
        this.saveToLocalStorage('favorites', this.favorites)
      }
    }else{ //Seleccionada carta de favoritos
      this.favorites = this.favorites.filter(elem => elem.imdbID !==id);
      this.saveToLocalStorage('favorites', this.favorites)
    }
  }
  
  getMovieById(id, list){
    return list.find(elem => elem.imdbID === id)
  }

  saveToLocalStorage(name, item){ 
    localStorage.setItem(name,  JSON.stringify(item));
  }

  loadFromLocalStorage(name){ 
    return JSON.parse(localStorage.getItem(name));
  }

  getMovies(value){
    if(value.length >3){
      const page = 1;
      const type = 'movie';
      fetch(`https://www.omdbapi.com/?s=${value}&plot=full&apikey=e477ed6a&page=${page}&type=${type}`)
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.Search && result.Search.length > 0){
          this.movies = Object.assign([], result.Search);
        }else{
          this.movies = Object.assign([], []);       
        }
      });
    }
  }

  render() {
    return html`
      <input-search .eventName=${'inputChanges'} .title=${'Buscador de Películas'} ></input-search>
      <div class="content">
        <movie-list class="favorites" .class=${"favorite"} .list=${this.favorites}></movie-list>
        <movie-list class="standard" .class=${"standard"} .list=${this.movies}></movie-list>
      </div>
    `;
  }

}
