package team.goodmorning.aipedia.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.goodmorning.aipedia.dto.request.ContentsRequest;
import team.goodmorning.aipedia.service.AipediaService;

@RestController
@RequiredArgsConstructor
public class AipediaController {
    private final AipediaService aipediaService;

    @GetMapping("/contents")
    public String getContents(@RequestBody ContentsRequest contentsRequest) {
        return aipediaService.getContents(contentsRequest.getPrompt());
    }
}
