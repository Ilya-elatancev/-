package web.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
@Table(name="cities")
public class City {
    @Id
    @GeneratedValue
    @Column(name="city_id")
    private Integer cityId;

    @Column(name="city")
    private String city;

    @Column(name="center")
    private String center;

    public Integer getCityId() { 
        return cityId; 
    }

    public void setCityId(Integer cityId) { 
        this.cityId = cityId; 
    }

    public String getCity() { 
        return city; 
    }

    public void setCity(String city) { 
        this.city = city; 
    }

    public String getCenter() { 
        return center; 
    }

    public void setCenter(String center) { 
        this.center = center; 
    }
}