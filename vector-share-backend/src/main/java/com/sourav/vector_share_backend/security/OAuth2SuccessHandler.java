package com.sourav.vector_share_backend.security;

import java.io.IOException;
import java.time.Duration;

import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.sourav.vector_share_backend.enums.AuthProvider;
import com.sourav.vector_share_backend.model.RefreshToken;
import com.sourav.vector_share_backend.model.User;
import com.sourav.vector_share_backend.repository.UserRepository;
import com.sourav.vector_share_backend.service.RefreshTokenService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{

	private final UserRepository userRepository;
	private final JwtService jwtService;
	private final RefreshTokenService refreshTokenService;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
		OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
		
		String email = oAuth2User.getAttribute("email");
		String name = oAuth2User.getAttribute("name");
		
		User user = userRepository.findByEmail(email)
				.orElseGet(() -> {
					User newUser = User.builder()
							.email(email)
							.name(name)
							.provider(AuthProvider.GOOGLE)
							.build();
					return userRepository.save(newUser);
				});
		
		String accessToken = jwtService.generateToken(new CustomUserDetails(user));
		
		RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
		
		//Storing refreshToken in a HTTPOnly cookie
		ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken.getRefreshToken())
				.httpOnly(true)
				.secure(false)
				.sameSite("Lax")
				.path("/")
				.maxAge(Duration.ofDays(7))
				.build();
		
		response.addHeader("Set-Cookie", cookie.toString());
		
		getRedirectStrategy().sendRedirect(request, response, "http://localhost:5173/oauth-success?token=" + accessToken);
	}

	
}
