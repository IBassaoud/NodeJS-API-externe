//########## GENENRAL ##########
//########## MODULE 1 ##########
let linkContainer = document.getElementById('link_container');
let submitBTN = document.getElementById('submit_active');
let submitQTY = document.getElementById('input_quantity_images');

let BTN_toggle_1 = document.getElementById('btn_toggle_1');
let module1 = document.getElementById('module_1');
let BTN_toggle_2 = document.getElementById('btn_toggle_2');
let module2 = document.getElementById('module_2');
let module2CardsWind = document.getElementById('card_user_infos');
let BTN_toggle_3 = document.getElementById('btn_toggle_3');
let module3 = document.getElementById('module_3');

BTN_toggle_1.addEventListener('click', function() {
    let module1_visibility = module1.style.visibility;
    if (module1_visibility === 'hidden') {
        module1.setAttribute('style', 'visibility:visible')
    }
    else {module1.setAttribute('style', 'visibility:hidden')}
});

BTN_toggle_2.addEventListener('click', function() {
    let module2_visibility = module2.style.visibility;
    if (module2_visibility === 'hidden') {
        module2.setAttribute('style', 'visibility:visible')
    }
    else
        module2.setAttribute('style', 'visibility:hidden')
        module2CardsWind.setAttribute('style', 'visibility:hidden')
});

BTN_toggle_3.addEventListener('click', function() {
    let module3_visibility = module3.style.visibility;
    if (module3_visibility === 'hidden') {
        module3.setAttribute('style', 'visibility:visible')
    }
    else
        module3.setAttribute('style', 'visibility:hidden')
});


submitQTY.addEventListener("change", function(e){
    let input = e.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
});

submitQTY.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById('submit_active').click();
    }
});

submitBTN.addEventListener('click', function(e){
    e.preventDefault();
    if (submitQTY.value > 0){
        let queryQuantity = "?quantity=" + submitQTY.value 
        // console.log(queryQuantity);
        fetch('/images'+queryQuantity)
        .then(
            response => response.json()
        )
        .then(
            response2 => display_links(response2) 
        )
        .catch(
            function(err){
            console.log(err.message)
        });               
    }
});

function display_links(myLinksAPI) {
    linkContainer.innerHTML = ""
    let pas = 1
    for (let el of myLinksAPI){
        linkContainer.innerHTML += `<div class="module_1_body_item">${pas}. <a class="module_1_body_item link_item" href="${el.download_url}" author="${el.author}">Photo</a> by ${el.author}</div>`;
        pas += 1
    }

    onHoverLinks()
}

function onHoverLinks() {
    let mydiv = document.getElementsByClassName('div_myImage')[0]
    mydiv.innerHTML = ''
    let hoverLinks = document.getElementsByClassName('link_item')
    let image = document.createElement('img')
    let spanBtnExit = document.createElement('span')
    let btnExit = document.createElement('button')
    btnExit.innerHTML = 'X'
    spanBtnExit.setAttribute('id', 'span_remove_element')
    btnExit.setAttribute('id', 'btn_remove_element')
    for (let i = 0; i < hoverLinks.length; i++) {
        let number = i+1
        hoverLinks[i].addEventListener('mouseover', () => {
            image.setAttribute('class', 'module_1_img_item')
            image.src = hoverLinks[i].href
            mydiv.appendChild(image);
            spanBtnExit.appendChild(btnExit)
            mydiv.appendChild(spanBtnExit);
            btnExit.addEventListener("click", () => {
            spanBtnExit.remove()
            image.remove();
            })
            // let imageToDisplay = document.getElementsByClassName('module_1_img_item')[0]
            // imageToDisplay.src = hoverLinks[i].href
            console.log('Image number : '+ number + ' - Type : ' + hoverLinks[i].innerHTML + " Author : " + hoverLinks[i].getAttribute("author"))
        });   

    }
    
    // for (let el of hoverLinks){
    //     el.addEventListener("mouseleave", () => {
    //         let imageToDisplay = document.getElementsByClassName('module_1_img_item')[0]
    //         imageToDisplay.src = '/img/Your_Face_Goes_Here.png'
    //         })
    // }
    // Alternative syntax
    //for (let el of hoverLinks) {
    //     el.addEventListener('mouseenter', () => {
    //         console.log(hoverLinks);
    //         let imageToDisplay = document.getElementsByClassName('module_1_img_item')[0]
    //         imageToDisplay.src = el.href
    //         console.log(imageToDisplay)
    //         console.log('Image number : '+ + ' - Title : ' + el.innerHTML)
    //     });
    // }
}
onHoverLinks();

//########## MODULE 2 ##########
function getUsers(){
    fetch('/users')
    .then(
        reponse => reponse.json()
    )
    .then(
        reponse2 => displayUsers(reponse2)
    )
    .catch(
        function(err){
        console.log(err.message)
    });    
}
getUsers()

function displayUsers(myUsers){
    let myUsersData = myUsers.results
    let userCardContainer = document.getElementsByClassName('users_card')
    for (let i = 0; i < myUsersData.length; i++) {
        let numID = i+1
        userCardContainer[i].innerHTML = `<legend class="legend_cards">${myUsersData[i].name.title} ${myUsersData[i].name.first} ${myUsersData[i].name.last}</legend> 
        <div class="card_list_item_1">Age: <strong>${myUsersData[i].dob.age}</strong></div>
        <div class="card_list_item_2">Gender: <strong>${myUsersData[i].gender}</strong></div>
        <div class="card_list_item_3">Location: <strong>${myUsersData[i].location.city},<br>${myUsersData[i].location.country}</strong></div>
        <div class="card_list_item_4">Email: <strong>${myUsersData[i].email}</strong></div>
        <div class="card_list_item_5">Registered: <strong>${myUsersData[i].registered.age} years</strong></div>
        <div class="card_photo_item"><img id='card_image'src="${myUsersData[i].picture.large}"></div>
        <div class="card_link_item"><a class="click_infos" id="card_infos_${numID}" href="#" onclick="return false;">More infos</a></div>`
    }
document.getelement
    // let moreInfosBTN = document.getElementsByClassName('card_link_item')
    fetch('/creditCards')
    .then(
        reponseCreditCards => reponseCreditCards.json()
    )
    .then(
        reponseCreditCards2 => transferData(reponseCreditCards2)
    )
    .catch(
        function(err){
        console.log(err.message)
    });
    
    function transferData(credCards){
        displayCreditCards(myUsersData, credCards.data)
    }
}

function displayCreditCards(myUsers, credCards){
    let infosCards = document.getElementById('card_user_infos')
    let module2body = document.getElementById('module_2_body')
    let clickMoreInfos = document.getElementsByClassName('click_infos')
    let spanBtnExit = document.createElement('span')
    let btnExit = document.createElement('button')
    btnExit.innerHTML = 'X'
    spanBtnExit.setAttribute('id', 'span_remove_credit')
    btnExit.setAttribute('id', 'btn_remove_credit')
    for (let i = 0; i < clickMoreInfos.length; i++) {
        clickMoreInfos[i].addEventListener('click', function() {
            module2CardsWind.setAttribute('style', 'visibility:visible');
            spanBtnExit.setAttribute('style', 'visibility:visible')
            infosCards.innerHTML = `<legend class="legend_cards">Cards Informations</legend>
            <div id="card_type">Type : <strong>${credCards[i].type}</strong></div>
            <div id="card_number">Number : <strong>${credCards[i].number}</strong></div>
            <div id="card_expiration">Expiration date : <strong>${credCards[i].expiration}</strong></div>
            <div id="card_owner">Owner : <strong>${myUsers[i].name.title} ${myUsers[i].name.first} ${myUsers[i].name.last}</strong></div>`
            spanBtnExit.appendChild(btnExit)
            module2body.appendChild(spanBtnExit)
        })
        
    }
    btnExit.addEventListener("click", function(){
        module2CardsWind.setAttribute('style', 'visibility:hidden')
        spanBtnExit.setAttribute('style', 'visibility:hidden')
    })
}



//########## MODULE 3 ##########
function getCompaniesData(){
    fetch('/companies')
    .then(
        reponseCompanies => reponseCompanies.json()
    )
    .then(
        reponseCompanies2 => displayCompanies(reponseCompanies2.data)
    )
    .catch(
        function(err){
        console.log(err.message)
    });    
}
getCompaniesData()

function displayCompanies(companiesData){
    let fieldMod3 = document.getElementById('field_companies')
    let prevClick = document.getElementById('prev')
    let nextClick = document.getElementById('next')
    
    function generateComp() {
    let randNum = Math.floor(Math.random() * 101)
    console.log(companiesData[randNum])
    fieldMod3.innerHTML = `<legend id="company_name">${companiesData[randNum].name}</legend>
                    <div id="company_legend">
                    <div class="company_legend_item">${companiesData[randNum].website}</div>
                    <div class="company_legend_item">${companiesData[randNum].phone}</div>
                    <div class="company_legend_item">${companiesData[randNum].email}</div>
                    <div class="company_legend_item">${companiesData[randNum].country}</div>
                    </div>
                    <div class="company_infos">
                        <div class="card_company_item_1" style="color:red;font-weight:bold;">CONTACT</div>
                        <div class="card_company_item_2">${companiesData[randNum].contact.firstname} ${companiesData[randNum].contact.lastname}</div>
                        <div class="card_company_item_3">${companiesData[randNum].contact.address.streetName}</div>
                        <div class="card_company_item_4"><a href="mailto:${companiesData[randNum].contact.email}">Email</a></div>
                        <div class="card_company_item_5">${companiesData[randNum].contact.address.zipcode}</div>
                        <div class="card_company_item_photo"><img id="company_image" src="${companiesData[randNum].contact.image}"></div>
                    </div>
                    <div class="company_details_1">
                        <div class="company_details_item_1" style="color:red; font-weight:bold;">ADDRESS 1</div>
                        <div class="company_details_item_2">${companiesData[randNum].addresses[0].street}</div>
                        <div class="company_details_item_3">${companiesData[randNum].addresses[0].city}</div>
                        <div class="company_details_item_4">${companiesData[randNum].addresses[0].zipcode}</div>
                    </div>`
                    if (companiesData[randNum].addresses.length > 1) {
                        fieldMod3.innerHTML += `<div class="company_details_2">
                        <div class="company_details_item_1" style="color:red;font-weight:bold;">ADDRESS 2</div>
                        <div class="company_details_item_2">${companiesData[randNum].addresses[1].street}</div>
                        <div class="company_details_item_3">${companiesData[randNum].addresses[1].city}</div>
                        <div class="company_details_item_4">${companiesData[randNum].addresses[1].zipcode}</div>
                    </div>` 
                    } else { 
                        // document.getElementById('company_legend').setAttribute('style', 'width:30%;')
                        document.getElementsByClassName('company_infos')[0].setAttribute('style', 'width:40%;')

                    }
                       
    }
    generateComp()
    prevClick.addEventListener('click', generateComp);
    nextClick.addEventListener('click', generateComp);
}



