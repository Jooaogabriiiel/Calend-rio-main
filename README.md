# Calendário Web Funcional com Gerenciamento de Eventos

Este é um projeto de calendário web desenvolvido em HTML, CSS e JavaScript, com funcionalidades de gerenciamento de eventos, navegação entre meses e personalização visual. O projeto foi desenvolvido como um exercício prático para aprimorar minhas habilidades em desenvolvimento web e manipulação de eventos com JavaScript.

## Funcionalidades

*   **Visualização do Calendário:**
    *   Exibe o mês e ano atual.
    *   Navegação para meses anteriores e seguintes.
    *   Destaque visual para o dia atual.
    *   Destaque visual para finais de semana.
*   **Gerenciamento de Eventos:**
    *   Criação de novos eventos com título, data, horário e descrição.
    *   Edição de eventos existentes.
    *   Deleção de eventos.
    *   Visualização dos eventos de um dia específico ao clicar no dia.
    *   Sinalização nos dias que possuem evento.
*   **Persistência de Dados:**
    *   Os eventos são salvos no `localStorage` do navegador para que não sejam perdidos ao recarregar a página.
*   **Interface Visual:**
    *   Design responsivo e adaptável para diferentes telas.
    *   Personalização de cores e tipografia.
*   **Música de Fundo:**
    *   Reprodução automática de música de fundo (opcional).
*   **Listagem de Eventos:**
     *   Listagem dos próximos eventos em tabela abaixo do calendário.
      *    Separação dos eventos passados em seção abaixo da tabela dos eventos futuros.
     *    Permite editar os eventos através da tabela.

## Tecnologias Utilizadas

*   **HTML:** Estrutura da página e elementos do calendário e modal.
*   **CSS:** Estilização da interface e criação do visual do calendário e modal.
*   **JavaScript:** Lógica de manipulação do calendário, gerenciamento de eventos, persistência de dados e interatividade do modal.
*   **LocalStorage:** Persistência dos dados dos eventos no navegador.

## Como Executar o Projeto

1.  **Clonar o Repositório:** Se você tiver acesso ao repositório deste projeto, clone-o para o seu computador. Caso contrário, baixe o projeto ou os arquivos.
2.  **Abrir no Navegador:**
    *   Abra o arquivo `index.html` diretamente em um navegador web (como Chrome, Firefox, Edge ou Safari).
3.  **Adicionar Eventos:**
    *   Clique nos dias do calendário para adicionar, editar ou visualizar eventos.
4.  **Música de Fundo:**
    *   A música de fundo começa a tocar automaticamente (mas pode ser pausada clicando no botão "Marcar Evento").

## Processo de Desenvolvimento

1.  **Estrutura Inicial:**
    *   Criação da estrutura básica do calendário em HTML.
    *   Estilização inicial do calendário com CSS.
    *   Implementação da lógica para navegação entre meses com JavaScript.
2.  **Gerenciamento de Eventos:**
    *   Criação de um modal para adicionar, editar e visualizar eventos.
    *   Implementação da lógica de criação, edição e deleção de eventos usando JavaScript.
    *   Persistência dos dados dos eventos com `localStorage`.
3.  **Visualização e Sinalização:**
    *   Implementação de sinalização nos dias com eventos.
    *   Melhorias visuais e estilização do modal.
4.  **Música de Fundo:**
    *   Adição da tag `audio` para tocar música de fundo (opcional).
5.  **Listagem de Eventos:**
    *   Implementação de uma tabela para listar os eventos futuros.
     * Implementação de uma sessão para listar os eventos passados.
    *  Implementação de funcionalidade de edição de eventos através da tabela.
6.  **Correção de Bugs:**
    *   Foram realizadas diversas correções para garantir o funcionamento correto do calendário, principalmente no gerenciamento do estado do modal durante a edição e deleção de eventos.

## Próximos Passos

*   **Adicionar Recorrência:** Implementar a criação de eventos recorrentes (diários, semanais, mensais).
*   **Categorização de Eventos:** Permitir que os usuários categorizem os eventos com etiquetas ou tags.
*   **Lembretes e Notificações:** Adicionar lembretes e notificações para os eventos.
*   **Integração com Outros Calendários:** Implementar a importação e exportação de eventos em formato iCalendar (.ics).
*   **Implementação do Service Worker:** Adicionar um Service Worker para permitir que o site funcione offline.
*  **Melhorias na usabilidade:** Permitir o drag and drop dos eventos, e adicionar uma visão semanal ou mensal.

## Créditos

*   Este projeto foi desenvolvido por João Souza.
*   O código foi escrito com base nas minhas experiências e pesquisas sobre desenvolvimento web.

## Observações Finais

Este projeto foi criado com o objetivo de aprender e praticar desenvolvimento web. Se você tiver sugestões, feedback ou quiser contribuir com melhorias, sinta-se à vontade para me contatar ou enviar um pull request.
