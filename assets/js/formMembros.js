const apiMembroUrl = "http://localhost:3000/submitMembro";

formMembro = document.getElementById("form_membro");

if (formMembro){
    formMembro.addEventListener("submit", (e) =>{
    e.preventDefault();
    formData = new FormData(formMembro);
    formData.append("nome_membro", document.getElementById("nomeMembro").value);
    console.log(formData);

    const requestOptions = {
        method: 'POST',
        body: formData,
    };


    fetch(apiMembroUrl, requestOptions)
    .then(response => {
            if (!response.ok){
                throw new Error('Erro ao chamar API');
            }
            return response.json();
        })
    })
}