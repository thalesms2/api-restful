const { v4: uuidv4 } = require('uuid')

module.exports = app => {
    const animeDB = app.data.animes
    const controller = {}

    const  {
        animes: animesMock,
    } = animeDB
    
    controller.listAnimes = (req, res) => res.status(200).json(animeDB)

    controller.saveAnimes = (req, res) => {
        animesMock.data.push({
            id: uuidv4(),
            name: req.body.name,
            rank: req.body.rank,
            season: req.body.season,
            movies: req.body.movies,
        })

        res.status(201).json(animesMock)
    }

    controller.removeAnime = (req, res) => {
        const {
            animeId
        } = req.params

        const foundAnimeIndex = animesMock.data.findIndex(anime => anime.id === animeId)
        
        if (foundAnimeIndex === -1) {
            res.status(404).json({
                message: 'Anime não encontrado na base.',
                sucess: false,
                animes: animesMock,
            })
        } else {
            animesMock.data.splice(foundAnimeIndex, 1)
            res.status(200).json({
                message: 'Anime encontrado e deletado com sucesso!',
                sucess: true,
                animes: animesMock,
            })
        }
    }
    
    controller.updateAnime = (req, res) => {
        const {
            animeId,
        } = req.params
        
        const foundAnimeIndex = animesMock.data.findIndex(anime => anime.id === animeId)

        if (foundAnimeIndex === -1) {
            res.status(404).json({
                message: 'Anime não encontrado na base.',
                sucess: false,
                animes: animesMock,
            })
        } else {
            const newAnime = {
                id: animeId,
                name: req.body.name,
                rank: req.body.rank,
                season: req.body.season,
                movies: req.body.movies,
                createdAt: new Date()
            }

            animesMock.data.splice(foundAnimeIndex, 1, newAnime)

            res.status(200).json({
                message: "Anime encontrado e atualizado com sucesso!",
                sucess: true,
                animes: animesMock,
            })
        }
    }

    return controller
}