package web.selection;

public class Recomendation {
    private Long flatId;
    private String head;

    public Recomendation(Long flatId, String head) {
        this.flatId = flatId;
        this.head = head;
    }

    public Long getFlatId() {
        return flatId;
    }

    public void setFlatId(Long flatId) {
        this.flatId = flatId;
    }

    public String getHead() {
        return head;
    }

    public void setHead(String head) {
        this.head = head;
    }
}