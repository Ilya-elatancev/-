package web.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

import web.model.Flat;
import web.selection.Marker;
import web.selection.Recomendation;

@Repository
public interface FlatsRepository extends CrudRepository<Flat, Long> {

    @Query("SELECT new web.selection.Marker(flatId, position) FROM web.model.Flat WHERE cityId = :id")
    List<Marker> findFlatsByCityId(@Param("id") Integer cityId);

    @Query("SELECT new web.selection.Recomendation(flatId, head) FROM web.model.Flat WHERE cityId = :id ORDER BY price DESC LIMIT 20")
    List<Recomendation> getRecomendationsByCityId(@Param("id") Integer cityId);

    @Query("SELECT info FROM web.model.Flat WHERE flatId = :id")
    String findInfoByFlatId(@Param("id") Long flatId);
}