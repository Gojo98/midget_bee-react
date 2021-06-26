// Tabela.js
// ****************************************************** 

import React from 'react'

// função que devolve o Cabeçalho da tabela
function CabecalhoTabela() {
    return (
        <thead>
            <tr>
                <th>Nome do Animes</th>
                <th>Imagem do Animes</th>
                <th>Id do Animes</th>
                <th>Details/Delete</th>
            </tr>
        </thead>
    )
}

// definição da função que devolve o Corpo da tabela
// faz exatamente o mesmo da linha 7
const CorpoTabela = (props) => {
    // esta função 'interna' irá ler e processar todos
    // os objetos definidos dentro do array 'dadosDosAnimes'
    const rows = props.dadosDosAnimes.map((row, idAnime) => {
        return (
            <tr key={idAnime}>
                <td>{row.nome}</td>
                <td><img src={'fotos/' + row.fotografia}
                    alt={'foto do ' + row.nome}
                    height="100" />
                </td>
                <td>{row.idAnime}</td>
                <td>
                    <button type="button"  class="btn btn-outline-info btn-rounded">Details</button><br></br><br></br>
                    <button type="button"  class="btn btn-outline-danger btn-rounded" onClick={()=>props.animeAremover(idAnime)}>Delete</button>
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
        // <=> this.props.dadosAlunos
        const { dadosanimes, anime } = this.props

        return (
            <table className="table table-striped">
                <CabecalhoTabela />
                {/* o parâmetro 'dadosAnimes' irá receber
                    os dados que vêm da componente 'mãe' */}
                <CorpoTabela dadosDosAnimes={dadosanimes} animeAremover={anime}/>
            </table>
        )
    }
}


export default Tabela