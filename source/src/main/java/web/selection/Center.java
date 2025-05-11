package web.selection;

import java.util.Arrays;

public class Center {
    private Integer cityId;
    private double[] center;

    public Center(Integer cityId, String center) {
        this.cityId = cityId;
        this.center = Arrays.stream(center.split(" ")).mapToDouble(Double::parseDouble).toArray();
    }

    public Integer getCityId() {
        return cityId;
    }

    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }

    public double[] getCenter() {
        return center;
    }

    public void setCenter(double[] center) {
        this.center = center;
    }
}