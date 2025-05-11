package web.selection;

import java.util.Arrays;

public class Marker {
    private Long flatId;
    private double[] position;

    public Marker(Long flatId, String position) {
        this.flatId = flatId;
        this.position = Arrays.stream(position.split(" ")).mapToDouble(Double::parseDouble).toArray();
    }

    public Long getFlatId() {
        return flatId;
    }

    public void setFlatId(Long flatId) {
        this.flatId = flatId;
    }

    public double[] getPosition() {
        return position;
    }

    public void setPosition(double[] position) {
        this.position = position;
    }
}
