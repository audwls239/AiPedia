package team.goodmorning.aipedia.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Builder
@Getter
public class Contentsresponse {
    private final String keyword;
    private final String contents;
}
