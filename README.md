# node-9gag

*A simple API for accessing 9gag*

## Installation

npm install node-9gag

##Usage

```js
var gag = require('node-9gag')
```

- Find a post on 9gag

```js
gag.find('<query string>', function (err, res) {})

res = [
  {
    query: ,
    sectionHeader: ,
    result: {
      title: ,
      id: ,
      url: ,
      author: ,
      image:
    }
  }
]
```

- Get details of a post from its id

```js
gag.getItem('< id >', function (err, res) {})

res = {
  title: ,
  points: ,
  commentCount: ,
  image:
}
```
