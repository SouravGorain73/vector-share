package com.sourav.vector_share_backend.controller;

import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Properties;

@RestController
public class MailTestController {

    @GetMapping("/test-mail")
    public String testMail() {
        try {
            JavaMailSenderImpl sender = new JavaMailSenderImpl();
            sender.setHost("smtp.gmail.com");
            sender.setPort(587);
            sender.setUsername(System.getenv("MAIL_USERNAME"));
            sender.setPassword(System.getenv("MAIL_PASSWORD"));

            Properties props = sender.getJavaMailProperties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.connectiontimeout", "10000");
            props.put("mail.smtp.timeout", "10000");
            props.put("mail.smtp.writetimeout", "10000");

            sender.testConnection();
            return "SMTP connected successfully";
        } catch (Exception e) {
            return e.getClass().getName() + ": " + e.getMessage();
        }
    }
}