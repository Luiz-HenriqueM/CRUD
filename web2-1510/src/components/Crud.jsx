import { useState } from "react";

function Crud() {
    const [trabalho, setTrabalho] = useState([]);
    const [texto, setTexto] = useState("");
    const [idEmEdicao, setIdEmEdicao] = useState(null);

    const adicionarNaTela = () => {
        if (texto.trim() === "") return;

        if (idEmEdicao === null) {
            const novoTrabalho = {
                id: crypto.randomUUID(),
                texto: texto,
                feita: false
            };

            setTrabalho((prev) => [...prev, novoTrabalho]);
        } else {
            setTrabalho((prev) =>
                prev.map((tarefa) =>
                    tarefa.id === idEmEdicao
                        ? { ...tarefa, texto: texto }
                        : tarefa
                )
            );
        }

        setTexto("");
        setIdEmEdicao(null);
    };

    const editar = (id) => {
        const tarefaEncontrada = trabalho.find(
            (tarefa) => tarefa.id === id
        );

        setIdEmEdicao(id);
        setTexto(tarefaEncontrada.texto);
    };

    const remover = (id) => {
        if (!confirm("Apagar este trabalho?")) return;

        setTrabalho((prev) =>
            prev.filter((trabalho) => trabalho.id !== id)
        );
    };

    const alternar = (id) => {
        setTrabalho((prev) =>
            prev.map((trabalho) =>
                trabalho.id === id
                    ? { ...trabalho, feita: !trabalho.feita }
                    : trabalho
            )
        );
    };

    return (
        <div>
            <h1>Lista de tarefas</h1>

            <input
                type="text"
                placeholder="Digite uma tarefa..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />

            <button onClick={adicionarNaTela}>
                {idEmEdicao === null
                    ? "Adicionar tarefa"
                    : "Salvar alterações"}
            </button>

            {idEmEdicao !== null && (
                <button
                    onClick={() => {
                        setTexto("");
                        setIdEmEdicao(null);
                    }}
                >
                    Cancelar
                </button>
            )}

            {trabalho.length === 0 && (
                <p>Nenhuma tarefa ainda.</p>
            )}

            {trabalho.map((tarefa) => (
                <div
                    key={tarefa.id}
                    className={
                        tarefa.id === idEmEdicao
                            ? "editando"
                            : ""
                    }
                >
                    <span
                        style={{
                            textDecoration: tarefa.feita
                                ? "line-through"
                                : "none",
                        }}
                    >
                        {tarefa.texto}
                    </span>

                    <div className="botoes">
                        <button onClick={() => alternar(tarefa.id)}>
                            {tarefa.feita ? "Desfazer" : "Concluir"}
                        </button>

                        <button
                            onClick={() => remover(tarefa.id)}
                            disabled={tarefa.id === idEmEdicao}
                        >
                            Remover
                        </button>

                        <button onClick={() => editar(tarefa.id)}>
                            Editar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Crud;