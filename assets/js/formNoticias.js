const chipContainer = document.querySelector(".chip-container");
    
function createChip(name){
    const chip = document.createElement("div");
    //chip element
    chip.classList.add("chip")
    //chip avatar element
    const chipName = document.createElement("div"); 
    chipName.classList.add("chipText");
    chipName.textContent = name; 
    const closeIcon = document.createElement("div"); 
    closeIcon.classList.add("close-icon"); 
    closeIcon.textContent = "x"; 
    closeIcon.addEventListener( 
        "click", 
        function () { 
            chip.remove(); 
        }); 
    chip.appendChild(chipName); 
    chip.appendChild(closeIcon); 
    chipContainer.appendChild(chip);
}

const addChipInput = document.getElementById("addChip")

addChipInput.addEventListener('keydown', function(e){
    if(e.key == 'Enter'){
        event.preventDefault();
        const name = addChipInput.value.trim();
        if (name !== ""){
            createChip(name);
            addChipInput.value = "";
        }
    }
})

    //TODO: Isso não pode ficar assim
    const apiNotUrl = "http://localhost:3000/submitNoticias";


    formNoticias = document.getElementById("form_noticia");
    inputfoto = document.getElementById("ImagemPost");
    
    if (formNoticias){
        formNoticias.addEventListener("submit", (e) =>{
            e.preventDefault();
            formData = new FormData(formNoticias);
            console.log(formData);

            const chipsTags = document.getElementsByClassName('chip');
            
            var result = Object.keys(chipsTags).map((key) => [chipsTags[key]]);
            
            //TODO: REFATORAR CÓDIGO

            result.forEach(elem => {
                text = elem[0]['innerText'];
                //Regex para lidar com a quebra de linha das tags
                text = text.split(/[\r\n]/g)[0];
                //data.chip.push(text);
                formData.append("tags", text);
            })

            console.log(formData);

            const requestOptions = {
                method: 'POST',
                body: formData,
            };

            fetch(apiNotUrl, requestOptions)
            .then(response => {
                if (!response.ok){
                    throw new Error('Erro ao chamar API');
                }
                return response.json();
            })
        })
    }
