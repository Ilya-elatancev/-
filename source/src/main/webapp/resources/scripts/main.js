function main() {
    const Zoom = 11;

    var map;
    var cityObj;
    var cityId;
    var markersObj;
    var markers;
    var featureMap;
    var recomendations;

    var currentFeature = null;
    var state = "undefined";

    const max_length = 32;

    var defaultStyle = [
        new ol.style.Style({
            image: new ol.style.Icon({
                src: "/resources/images/flat.png",
                width: "16",
                hight: "24"
                
            })
        })
    ];
    
    var selectStyle = [
        new ol.style.Style({
            image: new ol.style.Icon({
            anchor: [0.5, 0.7],
            src: '/resources/images/select-flat.png',
            width: "24",
            hight: "36"
            }),
            zIndex: 2
        })

    ];

    function viewMap(center) {
        map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            target: 'map',
            view: new ol.View({
                center: ol.proj.fromLonLat(center),
                zoom: Zoom
            })
        });
    }

    function viewMarkers(markers) {
        var layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: markers
            })
        });

        map.addLayer(layer);
    }

    function processFeature(feature) {
        if (feature == currentFeature) {
            return;
        }

        ReactDOM.render(<div/>, document.getElementById("main"));

        setLoading();

        disposeFeature();
        setFeature(feature);

        (function(previosFeature) {
            fetch("/api/flat?id=" + currentFeature.get("flatId"))
            .then(response => response.text())
            .then(function(data) {
                if (previosFeature != currentFeature) {
                    return;
                }

                setInfo(data);
            })
            .catch(err => console.error(err));
        })(currentFeature);
    }

    function configureMap() {
        fetch("/api/city?id=" + city)
        .then(response => response.json())
        .then(function(data) {
            cityObj = data;
            cityId = cityObj["cityId"];
            viewMap(cityObj["center"]);

            return fetch("/api/flats?city_id=" + cityId)
        })
        .then(response => response.json())
        .then(function(data) {
            markersObj = data;
            markers = [];
            featureMap = new Map();

            for (var i = 0, ii = markersObj.length; i < ii; i++) {
                let feature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat(markersObj[i]["position"])),
                    flatId: markersObj[i]["flatId"]
                });

                feature.setStyle(defaultStyle);
                markers.push(feature);

                featureMap.set(markersObj[i]["flatId"], feature);
            }

            viewMarkers(markers);

            map.on("pointermove", function(evt) {
                const hit = map.hasFeatureAtPixel(evt.pixel);
                map.getTargetElement().style.cursor = hit ? "pointer" : "";
            });

            map.on("click", function(evt) {
                const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
                    return feature;
                });

                if (!feature) {
                    return;
                }

                processFeature(feature);
            });

            return fetch("/api/recomendations?city_id=" + cityId);
        })
        .then(response => response.json())
        .then(function(data) {
            recomendations = data;
            setSlider();
        })
        .catch(err => console.error(err));
    }
    
    function sliderFeature(feature) {
        map.getView().setCenter(feature.getGeometry().getCoordinates());
        processFeature(feature);
    }

    class Slider extends React.Component {
        render() {
            var sections = [];

            for (var i = 0, ii = recomendations.length; i < ii; i++) {
                let flatId = recomendations[i]["flatId"];
                let feature = featureMap.get(flatId);
                let head = parser(recomendations[i]["head"]);

                sections.push(
                    <section onClick={sliderFeature.bind(null, feature)}>
                        <img src={"/resources/flats/flat-" + flatId + ".png"}/>
                        <p id="price">
                            {head["price"].length <= max_length ? head["price"] :
                                head["price"].substring(0, max_length - 3) + "..."}
                        </p>
                        <p id="info">
                            {head["info"].length <= max_length ? head["info"] :
                                head["info"].substring(0, max_length - 3) + "..."}
                        </p>
                        <p id="address">
                            {head["address"].length <= max_length ? head["address"] :
                                head["address"].substring(0, max_length - 3) + "..."}
                        </p>
                    </section>
                );
                
            }
            
            return (
                <div id="slider">
                    <div id="rec"><p>Рекомендации</p></div>
                    <div id="sliderList">{sections}</div>
                    <div id="slider-bottom"/>
                </div>
            );
        }
    }

    function setSlider() {
        state = "slider";
        ReactDOM.render(<Slider/>, document.getElementById("main"));
    }

    function disposeFeature() {
        if (currentFeature != null) {
            currentFeature.setStyle(defaultStyle);
            currentFeature = null;
        }
    }

    function setFeature(feature) {
        currentFeature = feature;
        currentFeature.setStyle(selectStyle);
    }

    function close() {
        disposeFeature();
        setSlider();
    }

    class Loading extends React.Component {
        render() {
            return (
                <div id="loading-application">
                    <div id="close" onClick={close}/>
                    <div id="loading">
                        <div id="display"/>
                        <p>Загрузка...</p>
                    </div>
                </div>
            );
        }
    }

    function setLoading() {
        var clean = false;

        if (state == "loading") {
            clean = true;
        }

        state = "loading";

        setTimeout(function() {
            if (state != "loading") {
                return;
            }

            if (clean) {
                ReactDOM.render(<div/>, document.getElementById("main"));
            }
            
            ReactDOM.render(<Loading/>, document.getElementById("main"));
        }, 100);
    }

    function Phone(props) {
        const [phone] = React.useState(props ? props.number : undefined);
        const [[click, loading], setInfo] = React.useState([false, false]);

        function viewLoading() {
            setTimeout(function() {
                setInfo([true, true]);
            }, 500);

            setInfo([true, false]);
        }

        if (!click) {
            return (
                <div id="phone-hidden" onClick={viewLoading}>
                    <p>Показать телефон</p>
                    <p id="phone-number">{phone.split(" ")[0] + " XXX XXX-XX-XX"}</p>
                </div>
            );
        }
        else if (!loading) {
            return (
                <div id="phone-loading">
                    <div id="phone-display"/>
                </div>
            );
        }
        else {
            return (
                <div id="phone-show">
                    <p>Телефон</p>
                    <p id="phone-number">{phone}</p>
                </div>
            );
        }
    }

    class Info extends React.Component {
        render() {
            var infoObj = parser(this.props.info);
            var head = parser(infoObj["head"], '//');
            var about = parser(infoObj["about"], '//');
            
            var info = [];

            for (let paragraph of infoObj["description"].split("\n")) {
                if (paragraph == "") {
                    continue;
                }

                info.push(
                    <p>
                        {paragraph}
                    </p>
                );
            }

            return (
                <div id="info-application">
                    <div id="close" onClick={close}/>
                    <div id="main-app">
                        <div id="info-head">
                            <div id="head-title">
                                <p>{head["head-title"]}</p>
                            </div>
                            <img src={"/resources/flats/flat-"
                                      + currentFeature.get("flatId") + ".png"}/>
                            <div id="info-price">
                                <p>{head["price"]}</p>
                            </div>
                            <Phone number={head["phone"]}/>                        
                        </div>
                        <div id="about">
                            <div id="about-title">
                                <p>О квартире</p>
                            </div>
                            <div id="about-info">
                                <div id="first">
                                    <p><span>Количество комнат: </span>{about["rooms"]}</p>
                                    <p><span>Общая площадь: </span>{about["total-area"]}</p>
                                    <p><span>Площадь кухни: </span>{about["kitchen-area"]}</p>
                                    <p><span>Жилая площадь: </span>{about["living-area"]}</p>
                                    <p><span>Этаж: </span>{about["floor"]}</p>
                                    <p><span>Балкон или лоджия: </span>{about["loggia"]}</p>
                                    <p><span>Дополнительно: </span>{about["additionally"]}</p>
                                </div>
                                <div id="second">
                                    <p><span>Тип комнат: </span>{about["room-type"]}</p>
                                    <p><span>Санузел: </span>{about["bathroom"]}</p>
                                    <p><span>Ремонт: </span>{about["repair"]}</p>
                                    <p><span>Мебель: </span>{about["furniture"]}</p>
                                    <p><span>Техника: </span>{about["technic"]}</p>
                                </div>
                            </div>
                        </div>
                        <div id="address-app">
                            <p id="address-title">Расположение</p>
                            <p id="address-info">{infoObj["address"]}</p>
                        </div>

                        <div id="info">
                            <p id="info-title">Описание</p>
                            <div id="info-p">{info}</div>
                        </div>
                    </div>
                </div>
                    
            );
        }
    }

    function setInfo(data) {
        state = "info";

        ReactDOM.render(<Info info={data}/>, document.getElementById("main"));
    }

    configureMap();
}

window.addEventListener('load', main);