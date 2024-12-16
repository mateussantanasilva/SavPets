function limpa_formulario_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById("rua").value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById("rua").value=(conteudo.logradouro);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulario_cep();
        showPageStatusModal("error", "CEP não encontrado.", "O CEP inserido não foi encontrado na base de dados.")
    }
}
        
function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    const cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep !== "") {

        //Expressão regular para validar o CEP.
        let validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById("rua").value="...";

            //Cria um elemento javascript.
            const script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulario_cep();
            showPageStatusModal("error", "Formato de CEP inválido.", "O formato do CEP inserido não é válido.")
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulario_cep();
    }
}