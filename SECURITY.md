# 🛡️ Security Policy

## 📌 Supported Versions

We aim to keep `Nutrivigil` up to date and secure. Please see below for the versions we currently support with security updates.

| Version | Supported          |
|---------|--------------------|
| Latest  | ✅ Yes              |
| Older   | ❌ No               |

---

## 📬 Reporting a Vulnerability

If you discover a security vulnerability, **please do not open an issue** on GitHub.

Instead, follow these steps:

1. **Email the maintainer directly**
2. Include the following details:
   - Description of the vulnerability
   - Steps to reproduce (if possible)
   - Potential impact
   - Any mitigation or workaround suggestions

⌛ We aim to respond to security reports **within 72 hours**.

---

## 🚫 Responsible Disclosure Guidelines

We ask that you:
- Do not publicly disclose the issue until it has been resolved.
- Avoid testing vulnerabilities in a way that could disrupt services.
- Act in good faith and with respect for user data and privacy.

---

## 📃 Disclosure Policy

- We follow a **coordinated disclosure** approach.
- We appreciate responsible reporting and will publicly disclose the issue only **after a fix has been released**.

--- 

## ✅ Security Best Practices

### API Key Management

**CRITICAL**: Never commit API keys to version control. NutriVigil uses environment variables for secure credential management.

**Why This Matters:**
- ⚠️ Exposed API keys can lead to unauthorized access, quota exhaustion, and unexpected billing
- ⚠️ Attackers can misuse your credentials to make API calls on your behalf
- ✅ Using environment variables follows industry best practices and regulatory compliance

**Implementation:**
1. Copy `.env.example` to `.env` in the backend directory
2. Add your actual API keys to `.env` (never commit this file)
3. The `.gitignore` file already prevents accidental commits

**Required Environment Variables:**
```env
GEMINI_API_KEY=your_gemini_api_key_here
NINJA_API_KEY=your_api_ninjas_key_here
PORT=3000
NODE_ENV=development
```

**For Each Environment:**
- **Local Development**: Use `.env` file (ignored by git)
- **Production**: Set variables in your hosting platform (Render, Vercel, Docker, etc.)

### General Recommendations

- Always run software in a secure and isolated environment.
- Keep your dependencies up to date using `npm audit` and `npm update`.
- Avoid sharing sensitive API keys or credentials in `.env` or other public files.
- Rotate API keys regularly (recommended: every 90 days).
- Restrict API key permissions in provider dashboards to only required scopes.
- Use git-secrets or similar pre-commit hooks to prevent accidental key commits.

### Monitoring & Incident Response

1. **Regular Audits**: Review API provider dashboards for unusual activity
2. **Key Rotation**: Implement a schedule to refresh API keys
3. **Incident Response**: If a key is exposed:
   - Immediately revoke it in the provider dashboard
   - Update `.env` and production environment variables
   - Monitor API logs for unauthorized access
   - Document the incident for review

### Deployment Security

**For Render.com:**
- Set environment variables in Service Dashboard → Environment
- Never hardcode keys in code or config files

**For Docker Deployments:**
- Use Docker secrets or environment variables
- Never include `.env` in Docker image
- Use `.dockerignore` to exclude sensitive files

**For Production:**
- Enable HTTPS/TLS for all API communications
- Use API rate limiting to prevent abuse
- Monitor API usage and set up alerts for anomalies

---

## 🙏 Acknowledgments

We value the contributions from the community and encourage responsible disclosure to help keep `Nutrivigil` safe and secure for all users.

---

## 🔒 Resources

- [GitHub Security Advisories](https://docs.github.com/en/code-security/security-advisories)

