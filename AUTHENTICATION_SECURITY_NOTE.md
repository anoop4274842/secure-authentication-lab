# Authentication Security Note

## Security Controls

1. Passwords are hashed using bcryptjs.
2. Email addresses are validated.
3. Minimum password length is 8 characters.
4. Login attempts are rate-limited.
5. Sessions use HTTP-only cookies.
6. Helmet provides HTTP security headers.
7. Profile access requires authentication.
8. Logout destroys the session.

## Security Limitations

- User accounts are stored in memory.
- Default session storage is not suitable for production.
- HTTPS and secure cookies are required for deployment.
- A strong session secret must be configured.
- CSRF protection is not implemented.

## Conclusion

This project demonstrates basic authentication security
controls for learning purposes. Further improvements are
required before production deployment.