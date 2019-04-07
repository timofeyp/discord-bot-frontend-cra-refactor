window.addEventListener('fetch', (event) => {
  if (event.request.url.match('^.*(\/api\/).*$')) {
    return false
  }
})
