package BuissnesManager.BuissnesManager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString
@Table(name = "App_User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id ;

    private String email;
    private String phone;

    @Column(unique = true, nullable = false)
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id" , unique = true)
    )
    @JsonIgnore
    private List<Role> roles;

    @Column(nullable = false)
    private boolean enabled = true;

    @ManyToOne()
    @JsonIgnore
    private Entreprise entreprise ;

    @ManyToOne()
    @JsonIgnore
    private Equipe equipe ;

}
