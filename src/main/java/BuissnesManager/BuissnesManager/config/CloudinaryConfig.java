package BuissnesManager.BuissnesManager.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dpvqw1nd4",
                "api_key", "195847711759379",
                "api_secret", "mk5KdgS810IWAjen5TCvtwm6r40",
                "secure", true
        ));
    }
}
