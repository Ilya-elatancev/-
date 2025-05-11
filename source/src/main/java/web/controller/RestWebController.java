package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.lang.Thread;

import web.model.City;
import web.repository.CitiesRepository;
import web.model.Flat;
import web.repository.FlatsRepository;
import web.selection.Marker;
import web.selection.Center;
import web.selection.Recomendation;

@RestController
@RequestMapping("/api")
public class RestWebController {

   @Autowired
   CitiesRepository cities;

   @Autowired
   FlatsRepository flats;

   @RequestMapping("/cities")
   public List<City> getCities() {
      return cities.findAll();
   }

   @RequestMapping("/city")
   public Center getCenter(@RequestParam(name="id") String city) {
      return cities.findCenterByCity(city);
   }

   @RequestMapping("/city/*")
   public void errorCity() {
      throw new RuntimeException("Request is incorrect");
   }

   @RequestMapping("/flats")
   public List<Marker> getFlats(@RequestParam(name="city_id") Integer cityId) {
      return flats.findFlatsByCityId(cityId);
   }

   @RequestMapping("/flat")
   public String getInfoByFlatId(@RequestParam(name="id") Long flatId) {
      try {
         if (flatId == 5) {
            Thread.sleep(2 * 1000);
         }
      }
      catch (InterruptedException exc) {
      }
      
      return flats.findInfoByFlatId(flatId);
   }

   @RequestMapping("/recomendations")
   public List<Recomendation> getRecomendationsByCityId(@RequestParam(name="city_id") Integer cityId) {
      return flats.getRecomendationsByCityId(cityId);
   }

   @RequestMapping({"", "*"})
   public void errorRequest() {
      throw new RuntimeException("Request is incorrect");
   }
}