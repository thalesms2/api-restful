module.exports = app => {
    const controller = app.controllers.animes

    app.route('/api/v1/animes')
        .get(controller.listAnimes)
        .post(controller.saveAnimes)

    app.route('/api/v1/animes/:animeId')
        .delete(controller.removeAnime)
        .put(controller.updateAnime)
}