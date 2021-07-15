// Tabela.js
// ****************************************************** 

import React from 'react'

// função que devolve o Cabeçalho da tabela
function CabecalhoTabela() {
    return (
        <thead>
            <tr>
                <th>Nome do Animes</th>
                <th>Quantidade de Episódios</th>
                <th>Autor</th>
                <th>Estudio</th>
                <th>Data</th>
                <th>Links</th>
                <th>Rating</th>
                <th>Imagem do Animes</th>
                <th>Delete</th>
            </tr>
        </thead>
    )
}

// definição da função que devolve o Corpo da tabela
// faz exatamente o mesmo da linha 7
const CorpoTabela = (props) => {
    // esta função 'interna' irá ler e processar todos
    // os objetos definidos dentro do array 'dadosDosAnimes'
    const rows = props.dadosDosAnimes.map((row) => {
        return (
            <tr key={row.idAnime}>
                <td>{row.nome}</td>
                <td>{row.quantEpisodios}</td>
                <td>{row.autor}</td>
                <td>{row.estudio}</td>
                <td>{row.data}</td>
                <td>{row.links}</td>
                <td>{row.rating}</td>
                <td><img src={'fotos/' + row.fotografia}
                    alt={'foto do ' + row.nome}
                    height="140"
                    width="100" />
                </td>
                <td>
                    <br></br>
                    <button type="button"  className="btn btn-outline-danger btn-rounded" onClick={()=>props.animeAremover(row)}>Delete</button>
                </td>
            </tr>
        )
    })

    // valor devolvido pela função 'CorpoTabela'
    return (<tbody>{rows}</tbody>)
}

// componente que junta os dois sub-componentes, 
// formando um novo 'componente'
class Tabela extends React.Component {
    render() {

        // estamos a ler os dados que são recebidos pelo componente
        // <=> this.props.dadosanimes
        const { inDadosAnimes, anime } = this.props

        return (
            <table className="table table-striped">
                <CabecalhoTabela />
                {/* o parâmetro 'dadosAnimes' irá receber
                    os dados que vêm da componente 'mãe' */}
                <CorpoTabela dadosDosAnimes={inDadosAnimes} 
                    animeAremover={anime}/>
            </table>
        )
    }
}


export default Tabela