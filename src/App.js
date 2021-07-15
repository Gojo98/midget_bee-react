// *****************************************
// App.js
// *****************************************

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// importar componentes
import Tabela from './Tabela';
import Formulario from './Formulario';


/**
 * Função que irá ler os dados (animes) da API
 */
async function getAnimes() {

  // ler os dados da API
  // https://create-react-app.dev/docs/proxying-api-requests-in-development/
  let resposta = await fetch("api/API");

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
   throw new Error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  return await resposta.json();
}

/**
 * invoca a API e envia os dados do novo Anime
 * @param {} dadosNovoAnime 
 */
 async function adicionaAnime(dadosNovoAnime){
  let formData = new FormData();
  formData.append("Nome", dadosNovoAnime.Nome);
  formData.append("UpFotografia", dadosNovoAnime.UpFotografia);
  formData.append("Rating", dadosNovoAnime.Rating);
  formData.append("Sinopse", dadosNovoAnime.Sinopse);
  formData.append("QuantEpisodios", dadosNovoAnime.QuantEpisodios);
  formData.append("Autor", dadosNovoAnime.Autor);
  formData.append("Estudio", dadosNovoAnime.Estudio);
  formData.append("Data", dadosNovoAnime.Data);
  formData.append("Links", dadosNovoAnime.Links);

  let resposta = await fetch("api/API/", {
    method: "POST",
    body: formData
  });

  //verifica se os dados não foram enviados para a API mostra a mensagem de erro juntamente com o estado da resposta
  if(!resposta.ok){
    console.error(resposta);
    throw new Error('Não foi possível enviar os dados do novo Anime. Código= ' + resposta.status);
  }

  //Devolver os dados a seres usados na componente
  return await resposta.json();
}


async function removeAnime(dadoAnimeRemover){
  let formData = new FormData();
  formData.append("idAnime", dadoAnimeRemover.idAnime);

  let resposta = await fetch("api/API/" + dadoAnimeRemover.idAnime , {
    method: "DELETE",
    body: formData
  });
  //verifica se os dados não foram enviados para a API mostra a mensagem de erro juntamente com o estado da resposta
  if(!resposta.ok){
    console.error(resposta);
    throw new Error('Não foi possível enviar os dados do novo Anime. Código= ' + resposta.status);
  }
  //Devolver os dados a seres usados na componente
  return await resposta.json();
}



/**
 * Componente principal do meu projeto
 */
class App extends React.Component {
  /**
   * Construtor da classe -> tem sempre este nome
   */
  constructor(props) {
    super(props); // <--- esta É SEMPRE a primeira instrução

    this.state = {
      /**
       * array que irá conter os dados dos animes, vindas da API
       */
      animes: [],
      /**
       * variável para conter o 'estado' da app, 
       * no carregamento dos dados das Fotografias, da API
       * @type{"carregando dados" | "sucesso" | "erro"}
       */
      loadState: "",
      /**
       * guarda a mensagem de erro, se algo correr mal
       */
      errorMessage: null
    }
}

/**
 * Quando o objeto é criado, executa o código aqui escrito
 * Vamos usá-lo para carregar os dados da API
 */
componentDidMount() {
  this.Loadanimes();
}

/**
 * Carrega os dados dos animes da API e adiciona-os ao array 'animes'
 */
async Loadanimes() {
  /* Tarefas:
   *   1. Ler os dados da API (fetch)
       2. atualizar os dados na var. state
   */
  try {
    // 1.
    this.setState({ 
      loadState: "carregando dados" 
    });
    let animesVindosDaAPI = await getAnimes();

    // 2.
    // esta não é a forma correta: this.state.animes = animesVindosDaAPI;
    this.setState({
      animes: animesVindosDaAPI,
      loadState: "sucesso"
    });
  } catch (erro) {
    this.setState({
      loadState: "erro",
      errorMessage: erro.toString()
    });
    console.error("Erro na leitura dos animes da API", erro);
  }
}

/**
 * método que sabe identificar o 'anime' que deverá ser retirado da tabela
 * @param {*} idAnime - dados do anime a remover
 */
  handlerRemoveForm = async (idAnime)=>{
  /**
   * Tarefas:
   * 1 - preparar os dados para serem enviados para a API
   * 2 - enviar os dados para a API
   * 3 - efetuar o reload da tabela 
   */
    /**
   * 1 - já se encontra feito através do parâmetro de entrada -dadosdoFormulario- que já contém os daods formatados
   */
    try{
      //Ponto 2
      await removeAnime(idAnime);

      //Ponto 3
      await this.LoadAnime();
    } catch(erro){
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo Anime; ", erro)
    }
    window.location.reload();
  }

  /**
   * processar os dados recolhidos pelo Formulário
   * @param {*} dadosDoFormulario 
   */

  handlerDadosForm = async (dadosdoFormulario) => {
    /**
     * Tarefas:
     * 1 - preparar os dados para serem enviados para a API
     * 2 - enviar os dados para a API
     * 3 - efetuar o reload da tabela 
     */
    
    /**
     * 1 - já se encontra feito através do parâmetro de entrada -dadosdoFormulario- que já contém os daods formatados
     */
    try{
      //Ponto 2
      await adicionaAnime(dadosdoFormulario);

      //Ponto 3
      await this.LoadAnimes();
    } catch(erro){
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo Anime; ", erro)
    }
    window.location.reload();
  }


render() {
  //recuperar os dados do 'state' para usar dentro deste método
  const { animes } = this.state;

  //determinar o comportamento do 'componente', 
  //em função do seu estado
  switch (this.state.loadState) {
    case "carregando dados":
      return <p>A carregar os dados. Aguarde, por favor.</p>
    case "erro":
      return <p>Ocorreu um erro: {this.state.errorMessage}</p>
    case "sucesso":
      return (
        <div className="container">
          {/* adição do Formulário que há-de recolher os dados da nova fotografia */}
          <Formulario inDadosAnimes={animes} 
            outDadosAnimes={this.handlerDadosForm}/>

          {/* este componente - Tabela - irá apresentar os dados das 'fotos' no ecrã
                as 'fotos' devem ser lidas na API */}
          <Tabela inDadosAnimes={animes} 
            anime={this.handlerRemoveForm}/>
        </div>
      )
    default: 
      return null;
  }
}
}
export default App;