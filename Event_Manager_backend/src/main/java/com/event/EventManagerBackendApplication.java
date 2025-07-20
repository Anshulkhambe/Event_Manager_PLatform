    package com.event;

    import com.event.bean.Role;
    import com.event.repository.RoleRepository;
    import org.springframework.boot.CommandLineRunner;
    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    import org.springframework.context.annotation.Bean;

    @SpringBootApplication
    public class EventManagerBackendApplication {

        public static void main(String[] args) {
            SpringApplication.run(EventManagerBackendApplication.class, args);
        }

        // CommandLineRunner to ensure roles exist on startup
        @Bean
        public CommandLineRunner demo(RoleRepository roleRepository) {
            return (args) -> {
                if (roleRepository.findByName("ROLE_USER").isEmpty()) {
                    roleRepository.save(new Role("ROLE_USER"));
                }
                if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
                    roleRepository.save(new Role("ROLE_ADMIN"));
                }
            };
        }}