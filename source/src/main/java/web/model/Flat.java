package web.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
@Table(name="flats")
public class Flat {
    @Id
    @GeneratedValue
    @Column(name="flat_id")
    private Long flatId;

    @Column(name="city_id")
    private Integer cityId;

    @Column(name="position")
    private String position;

    @Column(name="price")
    private Long price;

    @Column(name="head")
    private String head;

    @Column(name="info")
    private String info;

    public Long getFlatId() { 
        return flatId; 
    }

    public void setFlatId(Long flatId) { 
        this.flatId = flatId; 
    }

    public Integer getCityId() { 
        return cityId; 
    }

    public void setCityId(Integer cityId) { 
        this.cityId = cityId; 
    }

    public String getPosition() { 
        return position; 
    }

    public void setPosition(String position) { 
        this.position = position; 
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getHead() { 
        return head; 
    }

    public void setHead(String head) { 
        this.head = head; 
    }

    public String getInfo() { 
        return info; 
    }

    public void setInfo(String info) { 
        this.info = info; 
    }
}