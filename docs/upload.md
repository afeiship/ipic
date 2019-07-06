# upload 
- https://github.com/electron/electron/issues/9684
- https://github.com/form-data/form-data/issues/378
- https://www.fsainz.com/2015/06/08/files-on-electron/



## basic fetch code
```js
fetch('https://stackoverflow.com/upload/image?method=json&https=true', {
  method: 'POST',
  body: formData,
  headers: formData.getHeaders()
})
  .then((res) => res.json())
  .then((res) => {
    console.log('res->', res);
  });
```
