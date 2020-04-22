import { html, css, LitElement } from 'lit-element';

export class InputSearcch extends LitElement {
  
  static get styles() {
    return css`
    :host {
      padding: 10px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }

    input{
      border-radius: 15px;
    }
    `;
  }
  
  static get properties() {
    return {
			eventName:{
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

  inputChanges(ev){
    document.dispatchEvent( new CustomEvent(this.eventName, {
      detail: {
        value: ev.target.value
      }
    }));
  }

  render() {
    return html`
			<h1>${this.title}</h1>
			<input type="text" @keyup=${this.inputChanges}></input>
    `;
  }


}

customElements.define('input-search', InputSearcch);
