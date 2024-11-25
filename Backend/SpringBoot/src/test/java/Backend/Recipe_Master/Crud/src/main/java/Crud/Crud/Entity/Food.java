package Crud.Crud.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity

public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private Integer price;
    private String time;

    @Lob
    @Column(name="image",columnDefinition = "LONGBLOB")
    private byte[] image;
}
