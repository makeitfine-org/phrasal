package net.phrasal.presentation.security;

import net.phrasal.config.TwoFactorProperties;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("PendingTwoFactorLogin")
class PendingTwoFactorLoginTest {

    private static final Instant START = Instant.parse("2026-01-10T12:00:00Z");
    private static final long USER_ID = 11L;

    private final MovableClock clock = new MovableClock(START);
    private final PendingTwoFactorLogin pending = new PendingTwoFactorLogin(clock,
            new TwoFactorProperties("key", "Phrasal", Duration.ofMinutes(5)));

    @Test
    @DisplayName("start stores the user and ends the previous session")
    void startInvalidatesOldSession() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpSession old = (MockHttpSession) request.getSession();

        pending.start(request, USER_ID);

        assertThat(old.isInvalid()).isTrue();
        assertThat(pending.userId(request)).contains(USER_ID);
    }

    @Test
    @DisplayName("the login is valid just before the timeout and gone, with its attributes, just after")
    void expires() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        pending.start(request, USER_ID);

        clock.set(START.plusSeconds(4 * 60 + 59));
        assertThat(pending.userId(request)).contains(USER_ID);

        clock.set(START.plusSeconds(5 * 60 + 1));
        assertThat(pending.userId(request)).isEmpty();
        assertThat(request.getSession().getAttribute(PendingTwoFactorLogin.USER_ID_ATTRIBUTE)).isNull();
        assertThat(request.getSession().getAttribute(PendingTwoFactorLogin.SINCE_ATTRIBUTE)).isNull();
    }

    @Test
    @DisplayName("no session means no pending login")
    void noSession() {
        assertThat(pending.userId(new MockHttpServletRequest())).isEmpty();
    }

    @Test
    @DisplayName("an attribute of the wrong type means no pending login")
    void wrongType() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.getSession().setAttribute(PendingTwoFactorLogin.USER_ID_ATTRIBUTE, "11");
        request.getSession().setAttribute(PendingTwoFactorLogin.SINCE_ATTRIBUTE, START);

        assertThat(pending.userId(request)).isEmpty();
    }

    @Test
    @DisplayName("a missing timestamp means no pending login")
    void missingSince() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.getSession().setAttribute(PendingTwoFactorLogin.USER_ID_ATTRIBUTE, USER_ID);

        assertThat(pending.userId(request)).isEmpty();
    }

    @Test
    @DisplayName("clear removes both attributes")
    void clearRemovesAttributes() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        pending.start(request, USER_ID);

        pending.clear(request);

        assertThat(request.getSession().getAttribute(PendingTwoFactorLogin.USER_ID_ATTRIBUTE)).isNull();
        assertThat(request.getSession().getAttribute(PendingTwoFactorLogin.SINCE_ATTRIBUTE)).isNull();
    }

    @Test
    @DisplayName("clear without a session does nothing")
    void clearWithoutSession() {
        MockHttpServletRequest request = new MockHttpServletRequest();

        pending.clear(request);

        assertThat(request.getSession(false)).isNull();
    }

    private static final class MovableClock extends Clock {

        private Instant now;

        MovableClock(Instant now) {
            this.now = now;
        }

        void set(Instant instant) {
            this.now = instant;
        }

        @Override
        public ZoneId getZone() {
            return ZoneId.of("UTC");
        }

        @Override
        public Clock withZone(ZoneId zone) {
            return this;
        }

        @Override
        public Instant instant() {
            return now;
        }
    }
}
