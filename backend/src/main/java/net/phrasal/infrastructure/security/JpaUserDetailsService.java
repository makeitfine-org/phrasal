package net.phrasal.infrastructure.security;

import lombok.RequiredArgsConstructor;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) {
        User user = userRepository.findByEmail(EmailNormalizer.normalize(email))
                .filter(found -> found.getPasswordHash() != null)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new AppUserDetails(user);
    }
}
