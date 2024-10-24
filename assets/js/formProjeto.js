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
    const apiProjUrl = "http://localhost:3000/submitProjeto";


    formProjeto = document.getElementById("form_projeto");
    inputfoto = document.getElementById("filefoto");
    
    if (formProjeto){
        formProjeto.addEventListener("submit", (e) =>{
            e.preventDefault();
            formData = new FormData(formProjeto);
            
            for (var [key, value] of formData.entries()) { 
                console.log(key, value);
            }

            const chips = document.getElementsByClassName('chip');
            
            var result = Object.keys(chips).map((key) => [chips[key]]);

            
            result.forEach(elem => {
                text = elem[0]['innerText'];
                //Regex para lidar com a quebra de linha das tags
                text = text.split(/[\r\n]/g)[0];
                //data.chip.push(text);
                formData.append("chip", text);
            })

            const requestOptions = {
                method: 'POST',
                body: formData,
            };

            fetch(apiProjUrl, requestOptions)
            .then(response => {
                if (!response.ok){
                    throw new Error('Erro ao chamar API');
                }
                return response.json();
            })
        })
    }