<template>
  <div class="hello">
    <h1>This is HelloWorld</h1>
    
    <div class="dot"></div>
    
    <h1>This is HelloWorld END</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>


<style scoped>

.dot {
    background-color: #ededed;
    border: 2px solid #f51818;
    box-shadow: 2px 7px 0px #5b5b5bb5;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}

.dab {
    font-size: 8ex;
}

.mini {
    font-family: "Lilita One", sans-serif;
    font-size: 3vh;
}

body h1, 
body h2,
body h5 {
    font-family: "Agbalumo";
    color: #d8d8d8;
}

.logo {
    font-family: "Agbalumo";
    font-size: 2.5ex;
}

#playbtn {
    display: inline-block;
    position: relative;
    padding: 14px 40px;
    margin-top: 20px;
    color: #4a3e6dbc;
    background-color: #0CFFE1;
    box-shadow: 10px 10px 6px #4a3e6db6;
    border-radius: 10px;
    font-size: 30px;
    font-weight: 500px;
    letter-spacing: 3px;
    text-transform: capitalize;
    text-decoration: none;
    overflow: hidden;
    z-index: 1;
}

#playbtn span {
    display: block;
    width: 0px;
    height: 0px;
    background-color: #FF217C;
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease 0s, height 0.6s ease 0s;
    z-index: -1;
}

#playbtn:hover span {
    width: 562px;
    height: 562px;
}

.navbar-nav {
    font-family: "Lilita One", sans-serif;
}

@media (max-width: 991px) {
    body .sidebar {
        background-color: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
    }
}

.navbar {
    font-family: "Arial";
    background-color: rgba(37, 37, 37, 0.545);
}

.operation {
    color: #d8d8d8;
    background: none;
    border: none;
    width: 50px;
    height: 50px;
    padding: 10px;
}

</style>
