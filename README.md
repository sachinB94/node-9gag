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
gag.find('query', function (err, res) {
  // res = [
  //   {
  //     query: ,
  //     sectionHeader: ,
  //     result: {
  //       title: ,
  //       id: ,
  //       url: ,
  //       author: ,
  //       image:
  //     }
  //   }
  // ]
});
```

- Get details of a post from its id

```js
gag.getItem('id', function (err, res) {
  // res = {
  //   title: ,
  //   points: ,
  //   commentCount: ,
  //   image:
  // }
});
```

- Access a section on 9gag

```js
gag.section('section'[, hot/fresh], function (err, res) {
  // res = [
  //   {
  //     title: null,
  //     id: null,
  //     url: null,
  //     image: null,
  //     points: null,
  //     commentCount: null
  //   }
  // ]
});
```
