package team.goodmorning.aipedia.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class GenerateRequest {
    private final String keyword;
}
