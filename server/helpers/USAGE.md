# Atelier API Request useage

## Atelier Products API

### List Products

```
  // without parameters
    axios
      .get('/products', { params: { type: '', product_id: '', params: {} }})
      .then((data) => {
        console.log(data.data);
        console.log("GET Products Successful);
      })
      .catch(err => console.log(err));

  // with parameters
    axios.
      get('/products', { params: { type: '', product_id: '', params: {page: 1, count: 5} }})
      .then((data) => {
        console.log(data.data);
        console.log("GET Products Successful);
      })
      .catch(err => console.log(err));
```
> Parameters: <br>
> params:<br>
>     page: Selects the page of results to return. Default 1.<br>
>     count: Specifies how many results per page to return. Default 5.

### Product Information

```
  axios
    .get('/products', { params: { type: '', product_id: '/71697', params: {} }})
      .then((data) => {
        console.log(data.data);
        console.log("GET Products Successful);
      })
      .catch(err => console.log(err));
```
> Don't use params for get specified product.

### Product Styles
```
  axios
      .get('/products', { params: { type: '/styles', product_id: '/71697', params: {} }})
      .then((data) => {
        console.log(data.data);
        console.log("GET Products Successful);
      })
      .catch(err => console.log(err));
```
> product_id is required<br>
> Don't use params

### Related Products
```
  axios
      .get('/products', { params: { type: '/related', product_id: '/71697', params: {} }})
      .then((data) => {
        console.log(data.data);
        console.log("GET Products Successful);
      })
      .catch(err => console.log(err));
```
> product_id is required<br>
> Don't use params

## Atelier Reviews API

### List Reviews

