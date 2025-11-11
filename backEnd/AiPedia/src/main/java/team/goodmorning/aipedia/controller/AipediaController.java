package team.goodmorning.aipedia.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import team.goodmorning.aipedia.dto.response.Contentsresponse;
import team.goodmorning.aipedia.service.AipediaService;

@RestController
@RequiredArgsConstructor
public class AipediaController {
    private final AipediaService aipediaService;

    @GetMapping("/")
    public String index() {
        return "index";
    }
    @GetMapping(value = "/contents", produces = org.springframework.http.MediaType.APPLICATION_JSON_VALUE)
    public Contentsresponse getContents(@RequestParam String keyword) {
        return aipediaService.getContents(keyword);
    }
}
