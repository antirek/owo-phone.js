module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/v2/dist/'
      : '/'
}