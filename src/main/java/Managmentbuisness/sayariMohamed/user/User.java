package Managmentbuisness.sayariMohamed.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "app_user")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    @Enumerated(EnumType.STRING)
    private RoleUser roleUser;


}
