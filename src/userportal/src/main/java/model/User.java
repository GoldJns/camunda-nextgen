package model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "appuser")
@Data
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "email", length = 50, nullable = false)
    private String email;
    private String password;
    private String role;// patient or Doctor
    private String firstname;
    private String lastname;
    private int age;

    public User() {

    }
    
    public User(String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(String email, String password, String role, String firstname, String lastname, int age) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
    }

    public String getUsername() {
        return firstname + " " + lastname;
    }

}
