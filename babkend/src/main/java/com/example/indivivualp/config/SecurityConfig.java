package com.example.indivivualp.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity

public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserDetailsService  userDetailsService;


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors()
                .and()
                .csrf()
                .disable().authorizeRequests()
                .antMatchers("/signup/**")
                .permitAll()
                .antMatchers("/translator/**")
                .permitAll()
                .antMatchers("/aboutUs/**")
                .permitAll()
                .antMatchers("/service/**")
                .permitAll()
                .antMatchers("/chat/")
                .permitAll()
                .antMatchers("/service/**")
                .permitAll()
                .antMatchers("/chatMessages/**")
                .permitAll()
                .antMatchers(HttpMethod.POST,"/home/save/")
                .permitAll()
                .antMatchers("/home/news/")
                .permitAll()
                .antMatchers("/reds/chatMessages/**")
                .permitAll()
                .antMatchers("/home/**")
                .permitAll()
                .antMatchers("/home/achievement/")
                .permitAll()
                .antMatchers("/home/user/")
                .permitAll()
                .antMatchers("/home/images/")
                .permitAll()
                .antMatchers("/home/login/")
                .hasAnyAuthority("USER","ADMIN")
                .antMatchers("/websocket/**")
                .permitAll() // Allow unauthenticated access to WebSocket endpoint
                .and()
                .authorizeRequests()
                .anyRequest()
                .authenticated().and().httpBasic();


    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(new BCryptPasswordEncoder());
        return provider;

    }

}
