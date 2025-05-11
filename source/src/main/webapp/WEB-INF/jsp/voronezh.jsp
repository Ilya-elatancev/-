<%@ page contentType="text/html; charset=UTF-8" %>

<html>
  <head>
    <title>Квартиры в Воронеже</title>
    <link rel="icon" href="/resources/images/house.png" type="image/png">
    <link href="https://fonts.googleapis.com/css?family=Stint+Ultra+Expanded" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/resources/css/voronezh.css">
    <link href="https://api.slpy.com/lib/ol/latest/ol.css" rel="stylesheet">

    <script type="application/javascript" src="https://unpkg.com/react@18.0.0/umd/react.production.min.js" async></script>
    <script type="application/javascript" src="https://unpkg.com/react-dom@18.0.0/umd/react-dom.production.min.js" async></script>
    <script type="application/javascript" src="https://unpkg.com/babel-standalone@6.26.0/babel.js" async></script>

    <script src="https://api.slpy.com/lib/ol/latest/ol.js" async></script>
    <script>
      const city = "voronezh";
    </script>
    <script type="text/babel" src="/resources/scripts/main.js" async></script>
    <script type="application/javascript" src="/resources/scripts/parser.js" async></script>
  </head>
  <body>
    
    <div id="layout">
      <nav>
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/design">Новости</a></li>
          <li><a href="/design">Сервисы</a></li>
          <li><a href="/design">Вход</a></li>
        </ul>
      </nav>


      <div id="ads">
        <div>
          <div id="title">
            <p>Объявления на карте</p>
          </div>
          <div id="map"></div>
        </div>
      </div>

      <div id="main"></div>

      <footer>
        <p>Квартиры в России &copy; Все права защищены.</p>
      </footer>
    </div>
  </body>
</html>


