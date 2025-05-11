package web.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

import web.model.City;
import web.selection.Center;

@Repository
public interface CitiesRepository extends CrudRepository<City, Integer> {

    @Query("SELECT new web.selection.Center(cityId, center) FROM web.model.City WHERE city = :id")
    Center findCenterByCity(@Param("id") String city);

    List<City> findAll();
}