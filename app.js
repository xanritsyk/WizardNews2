const express = require("express");
const app = express();
const postBank= require("./postBank");
const morgan = require ("morgan");
const path = require('path')
postBank.find()

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  const singleHTML = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      <p>
      ${post.title}
      <small>(by ${post.name})</small>
    </p>
    <p>${post.content}</p>
</div>
</body>
</html>`
 
  res.send(singleHTML);
})

app.get("/", (req, res) =>{
const posts=postBank.list();

  const html= `<DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
    </body>
  </html>`; 
res.send(html);
});
const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
