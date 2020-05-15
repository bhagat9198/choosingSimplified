exports.getHome = (req, res, next) => {
  res.render('index');
}

exports.get404 = (req, res, next) => {
  res.render()
}