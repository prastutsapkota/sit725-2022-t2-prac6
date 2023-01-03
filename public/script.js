const clickMe = () => {
    let cities, optext;
    cities = ["Adelaide", "Brisbane", "Canberra", "Darwin", "Hobart",
            "Melbourne", "Perth", "Sydney"];
    optext = "<ul>";
    for (let i = 0; i < cities.length; i++)
    {
        optext += "<li>" + cities[i] + "</li>";
    }
    optext += "</ul>";
    return document.getElementById("capital_cities").innerHTML = optext;
}

const getProjects = () => {
    $.get('/api/projects',(response) => {
        if(response.statusCode == 200){
            addCards(response.data);
        }
    })
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
        '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
        '</div><div class="card-content">'+'<span class="card-title activator grey-text text-darken-4">'+item.title+
        '<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+
        '</a></p></div>'+'<div class="card-reveal">'+'<span class="card-title grey-text text-darken-4">'+item.title+
        '<i class="material-icons right">close</i></span>'+'<p class="card-text">'+item.desciption+'</p>'+'</div></div></div>';
        $("#card-section").append(itemToAppend);
        console.log(itemToAppend);
    });
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.link = $('#link').val();
    formData.desciption = $('#desciption').val();
    addProjectToApp(formData);
    console.log("Form Data Submitted", formData);
}

const addProjectToApp = (project) => {
    $.ajax(
        {
            url: '/api/projects',
            data: project,
            type: 'POST',
            success: (result) => {
                alert(result.message);
                location.reload();
            }
        }
    )
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#clickMeButton').click(()=>{
        clickMe();
    })
    // addCards(cardList);
    $('#formSubmit').click(()=>{
        submitForm();
    })
    getProjects();

});


