import { html, css, LitElement } from 'lit-element';

export class InputSearcch extends LitElement {
  
  static get styles() {
    return css`
    :host {
      width: 100%;
      height: 100%;
    }
    `;
  }
  
  static get properties() {
    return {
			inputChanges:{
				type: String
			},
			title:{
				type: String
			}
    };
  }

  constructor(){
    super();
  }



  render() {
    return html`
			<h1>${this.title}</h1>
			<input type="text" @keyup=${this.inputChanges}></input>
    `;
  }


}

customElements.define('input-search', InputSearcch);
