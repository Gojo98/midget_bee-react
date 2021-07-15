//Formulario.js
//este ficheiro irá conter o código para representar o formulário no ecrã
//********************************* */

import React from 'react'

/**
 * Formulário para adicionar (fazer upload) de uma Fotografia
 */
class Formulario extends React.Component{

    constructor(props){
        super(props);

        //variáveis para guardar os dados introduzidos pelo utilizador, no formulário
        this.state = {
            nome : "",
            fotografia: null,
            rating: "",
            sinopse: "",
            quantEpisodios: "",
            autor: "",
            estudio: "",
            data: "",
            links: ""
        } 
    }

    handlerAnimeChange = (evento) =>{
        //guardar os dados recolhidos
        this.setState({
            nome: evento.target.value
        });
    }

    handlerRatingChange = (evento) =>{
        //guardar os dados recolhidos
        this.setState({
            rating: evento.target.value
        });
    }


    handlerQuantEpisodiosChange = (evento) =>{
        //guardar os dados recolhidos
        this.setState({
            quantEpisodios: evento.target.value
        });
    }

    
    handlerAutorChange = (evento) =>{
        //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        if(/\d/.test(evento.target.value)){
            evento.target.setCustomValidity("Autor Inválido");
            return;
        }else {
            evento.target.setCustomValidity("");
        }

        //guardar os dados recolhidos
        this.setState({
            autor: evento.target.value
        });
    }


    handlerEstudioChange = (evento) =>{
        //guardar os dados recolhidos
        this.setState({
            estudio: evento.target.value
        });
    }


    handlerDataChange = (evento) =>{
        //guardar os dados recolhidos
        this.setState({
            data: evento.target.value
        });
    }


    handlerLinksChange = (evento) =>{
        //guardar os dados recolhidos
        this.setState({
            links: evento.target.value
        });
    }


    handlerSinopseChange = (evento) =>{
        //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        if(/\d/.test(evento.target.value)){
            evento.target.setCustomValidity("Descrição do Anime Inválido");
            return;
        }else {
            evento.target.setCustomValidity("");
        }

        //guardar os dados recolhidos
        this.setState({
            sinopse: evento.target.value
        });
    }


     /**
     * processar os dados fornecidos pelo utilizador no upload da foto do anime
     * @param {*} evento - dados adicionados pelo utilizador
     */
      handlerFotoChange = (evento) => {
        //neste sítio poderia ser efetuado algum tipo de validação da foto escolhida...

        // guardar os dados recolhidos pelo <select></select>
        this.setState({
            fotografia: evento.target.files[0]
        });
    }

    /**
     * handler para processar os dados fornecidos pelo Formulário
     * @param {*} evento - dados recolhido pelo <form></form>
     */
    handlerSubmitForm = (evento) => {
        // impedir o formulário de autoenviar os dados para o servidor
        // essa tarefa cabe, neste projeto, ao componente <App/>
        evento.preventDefault();

        // preparar os dados para serem enviados para a <App/>
        // posso já enviar os dados prontos para serem adicionados à API
        let dadosForm = {
            UpFotografia: this.state.fotografia,
            Nome: this.state.nome,
            Sinopse: this.state.sinopse,
            QuantEpisodios: this.state.quantEpisodios,
            Autor: this.state.Autor,
            Estudio: this.state.estudio,
            Data: this.state.data,
            Links: this.state.links,
            Rating: this.state.rating
        };

        // concretizar a exportação de dados para a <App/>
        this.props.outDadosAnimes(dadosForm);
    }

    render(){
        return(
            //o 'return' só consegue devolver um objeto
            <form onSubmit={this.handlerSubmitForm} encType="multipart/form-data">
                <div className="row">
                    <div className="col-md-4">
                        Anime:          <input type="text"
                                        required
                                        value={this.state.nome}
                                        onChange={this.handlerAnimeChange}
                                        className="form-control btn btn-outline-info" /><br/>

                        Sinopse:        <input type="text"
                                        required
                                        value={this.state.sinopse}
                                        onChange={this.handlerSinopseChange}
                                        className="form-control btn btn-outline-info" /><br/>

                        QuantEpisodios: <input type="number"
                                        min="1"
                                        required
                                        value={this.state.quantEpisodios}
                                        onChange={this.handlerQuantEpisodiosChange}
                                        className="form-control btn btn-outline-info" /><br/>

                        Autor:        <input type="text"
                                        required
                                        value={this.state.autor}
                                        onChange={this.handlerAutorChange}
                                        className="form-control btn btn-outline-info" /><br/>

                        Estudio:        <input type="text"
                                        required
                                        value={this.state.estudio}
                                        onChange={this.handlerEstudioChange}
                                        className="form-control btn btn-outline-info" /><br/>

                        Data:        <input type="date"
                                        required
                                        value={this.state.data}
                                        onChange={this.handlerDataChange}
                                        className="form-control btn btn-outline-info" /><br/>

                        Links:        <input type="link"
                                        required
                                        value={this.state.links}
                                        onChange={this.handlerLinksChange}
                                        className="form-control btn btn-outline-info" /><br/>


                        Rating:        <input type="number"
                                        max="10"
                                        min="0"
                                        required
                                        value={this.state.rating}
                                        onChange={this.handlerRatingChange}
                                        className="form-control btn btn-outline-info" /><br/>

                                        
                        Foto do Anime:  <input type="file"
                                        required
                                        accept=".jpg,.png,.JNG,.PNG"
                                        onChange={this.handlerFotoChange}
                                        className="form-control btn btn-outline-info" />
                    </div>
                </div>
                <br/>
                <input type="submit" value="Adicionar Anime" className="btn btn-outline-info"/>
            </form>
        )
    }
}
export default Formulario;