## Notes Application

**Section one:**

Contents:

Reference material: Node.js Web Development - Fifth Edition David Herron    
Section on implementing Bootstrap (233).

<br></br>

**Implementing mobile system capabilities using Bootstrap.**   

Installed the following modules:

Bootstrap 4.5.x   
JQuery 3.5.x   
Popper.js 1.16.0   

Configuring Bootstrap/JQuery/Popper.js :

Update <b>views/layout.hbs</b> to be consistent with the bootstrap model.  

```hbs
    ...
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel='stylesheet' href='/assets/vendor/bootstrap/css/bootstrap.min.css'>
    <link rel='stylesheet' href='/assets/stylesheets/style.css' />
  </head>
  <body>
    {{> header }}
    {{{body}}}
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->    
    <script src="/assets/vender/jquery/jquery.min.js"></script>
    <script src="/assets/vender/popper.js/popper.min.js"></script>
    <script src="/assets/vender/bootstrap/bootstrap.min.js"></script>

```

Update <b>app.mjs</b>

```js
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->    
    <script src="/assets/vender/jquery/jquery.min.js"></script>
    <script src="/assets/vender/popper.js/popper.min.js"></script>
    <script src="/assets/vender/bootstrap/bootstrap.min.js"></script>   

```

<hr>

**Use Icon libraries**  

<p>npm install feather-icons@4.25.x --save</p>

<br></br>

## Section two

Implementing data resources - Storage and retrieval.

Reference material: Node.js Web Development - page 266.
