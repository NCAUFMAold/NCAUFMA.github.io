async function getProjetos(){
    const response = await fetch("http://localhost:3000/getProjects");
    try {
        if (!response.ok){
            throw new Error('Erro ao obter projetos' + response.status);
        }
            const json = await response.json().then(result => {
            let tableBody = document.getElementById("tableBody");
    
            let contador = 1;
            //console.log(data['message']);
            let objData = result['message'];
            var tableRows = document.getElementById("sortableTable").rows.length;
            console.log(tableRows);
            if (tableRows === 1){
                for (const [key, value] of Object.entries(objData)) {
                    createNewTDProject(contador , value.titulo, value.subtitulo, value.tags, tableBody);
                    contador++;  
                }
            }
        }).catch(console.error);
       // console.log(json);
    } catch (error) {
        console.log(error);
    }

}


getProjetos();


function createNewTDProject(contador ,tituloProj, subTituloProj, tagsProj, tableBody){
    let tr = document.createElement('tr');
    let tdInt = document.createElement('td');
    tdInt.innerText = contador
    let tdTitulo = document.createElement('td');
    tdTitulo.textContent = tituloProj;
    let tdSubTitulo = document.createElement('td');
    tdSubTitulo.textContent = subTituloProj;

    let tdTag = document.createElement('td')
    tagsProj.forEach(element => {
        tdTag.innerText += element + " | ";    
    });
    

    let tdIcon = document.createElement('td');
    let buttonView = document.createElement('button')

    buttonView.className='action-button view';
    buttonView.innerText = '🔗';

    let buttonEdit = document.createElement('button')
    buttonEdit.className='action-button edit';
    buttonEdit.innerText = '✏️';

    let buttonDelete = document.createElement('button')
    buttonDelete.className='action-button delete';
    buttonDelete.innerText = '🗑️';

    tdIcon.appendChild(buttonView);
    tdIcon.appendChild(buttonEdit);
    tdIcon.appendChild(buttonDelete);


    tr.appendChild(tdInt);
    tr.appendChild(tdTitulo);
    tr.appendChild(tdSubTitulo);
    tr.appendChild(tdTag);
    tr.appendChild(tdIcon);

    tableBody.appendChild(tr);

}