package team.goodmorning.aipedia.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public class ContentsRequest {
    private final String prompt;

    @JsonCreator
    public ContentsRequest(@JsonProperty("prompt") String prompt) {
        this.prompt = prompt;
    }
}
