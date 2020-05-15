exports.getHome = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Home|Choosing Simplifid'
  });
}

exports.get404 = (req, res, next) => {
  res.render('404', {
    pageTitle: '404|Choosing Simplifid'
  });
}