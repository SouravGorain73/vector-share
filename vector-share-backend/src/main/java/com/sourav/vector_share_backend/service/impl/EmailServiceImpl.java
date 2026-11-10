
package com.sourav.vector_share_backend.service.impl;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.sourav.vector_share_backend.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private final RestClient restClient;
    private final String sender;
    private final String senderName;

    public EmailServiceImpl(
            @Value("${brevo.api-key}") String apiKey,
            @Value("${brevo.sender-email}") String sender,
            @Value("${brevo.sender-name}") String senderName) {

        this.sender = sender;
        this.senderName = senderName;

        this.restClient = RestClient.builder()
                .baseUrl("https://api.brevo.com/v3")
                .defaultHeader("api-key", apiKey)
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Accept", "application/json")
                .build();
    }

    @Override
    public void sendOtpEmail(String to, String otp) {

        try {
            String html = loadTemplate("otp-email.html");
            html = html.replace("{{OTP}}", otp);

            Map<String, Object> request = Map.of(
                    "sender", Map.of(
                            "name", senderName,
                            "email", sender
                    ),
                    "to", List.of(
                            Map.of("email", to)
                    ),
                    "subject", "Verify your email address • Vector Share",
                    "htmlContent", html
            );

            restClient.post()
                    .uri("/smtp/email")
                    .body(request)
                    .retrieve()
                    .toBodilessEntity();

        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP email", e);
        }
    }

    private String loadTemplate(String filename) {

        try {
            ClassPathResource resource =
                    new ClassPathResource("templates/" + filename);

            return new String(
                    resource.getInputStream().readAllBytes(),
                    StandardCharsets.UTF_8
            );

        } catch (IOException e) {
            throw new RuntimeException("Unable to load email template", e);
        }
    }
}
