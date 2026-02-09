package com.deepanshi.jobApp.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // ✅ BASE64 SAFE SECRET KEY
    private final Key SECRET_KEY =
            Keys.hmacShaKeyFor(
                    "deepanshiSecretKeyDeepanshiSecretKey12345"
                            .getBytes()
            );

    // =============================
    // GENERATE TOKEN
    // =============================
    public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60)
                )
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    // =============================
    // EXTRACT USERNAME
    // =============================
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // =============================
    // VALIDATE TOKEN
    // =============================
    public boolean validateToken(String token, UserDetails userDetails) {
        return extractUsername(token)
                .equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    // =============================
    // HELPERS
    // =============================
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}



