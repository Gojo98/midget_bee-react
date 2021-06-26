//Formulario.js
//este ficheiro irá conter o código para representar o formulário no ecrã
//********************************* */

import React from 'react'

/**
 * mostrar os dados dos cães
 * e escolher um deles 
 */
const EscolheAnime=(props)=>{
    //itera todos os cães, da lista de cães, e produz as 'options' necessárias à <select></select>
    const opcoes = props.listaAnimes.map((opcao) => {
        return (
            <option key={opcao.idAnime} 
                    value={opcao.idAnime}>{opcao.idAnime}</option>
        )
    })
    // valor devolvido pela função 'CorpoTabela'
    return (<select>{opcoes}</select>)
}

/**
 * Formulário para adicionar (fazer upload) de uma Fotografia
 */
class Formulario extends React.Component{

    constructor(props){
        super(props);

        //variáveis para guardar os dados introduzidos pelo utilizador, no formulário
        this.state = {
            nomeDoAnime:"",
            FotodoAnime:"",
            idDoAnime:"",
        } 
    }

    render(){

        // estamos a ler os dados que são recebidos pelo componente
        // <=> this.props.dadosAlunos
        const { dadosanimes } = this.props;

        return(
            //o 'return' só consegue devolver um objeto
            <form>
                Anime: <input type="text" 
                                   value={this.state.nomeDaFoto} 
                                   onChange={this.handlerFotoChange}/> <br />
                Foto do Anime: <input type="file" 
                                     value={this.state.imagemFoto} 
                                     onChange={this.handlerDataChange}/> <br />
                Id do Anime: <EscolheAnime listaAnimes={dadosanimes} /><br />
                            <input type="submit" value="Adicionar Anime"/>
            </form>
        )
    }
}
export default Formulario;