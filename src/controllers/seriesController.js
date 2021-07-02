const {request, response} = require ("express");
const series = require("../models/series.json"); //importando o arquivo json *mudar de movies para serie

const home = (request, response) =>{
    response.status(200).send(
        {
            "message": "Olá, seja bem vinde ao {reprograma}flix versão séries <3"
        }
    )
}

const getAll= (request, response) =>{
    response.status(200).send(series);
}

const getById = (request, response) =>{
    const requestedById = request.params.id 

    const filterId = series.find(serie => serie.id == requestedById)

    if(filterId == "," || filterId == undefined){
        response.status(404).send ({
            "message": "Por favor, insira um ID válido!"
        })
    }else{
        response.status(200).send(filterId);
    }
}

const getByTitle = (request, response) => {
    const requestedTitle = request.query.title.toLowerCase();

    const filteredTitle = series.find(serie => serie.title.toLowerCase().includes(requestedTitle));

    if (requestedTitle == "" || filteredTitle == undefined){
        response.status(404).send({
            "message": "Por favor, insira um título válido"
        })
    }else{
        response.status(200).send(filteredTitle);
    }
}

const getByGenre = (request, response) =>{
    const requestedGenre = request.query.genre;
    let serieList = [];

    series.forEach(serie => {
        let filterGenre = serie.genre

        for (genre of filterGenre){
            if(genre.includes(requestedGenre)){
                console.log(serie)
                serieList.push(serie)
            }
        }
    })
     response.status(200).send(serieList);
}

module.exports = {
     home, 
     getAll,
     getById,
     getByTitle,
     getByGenre
}
