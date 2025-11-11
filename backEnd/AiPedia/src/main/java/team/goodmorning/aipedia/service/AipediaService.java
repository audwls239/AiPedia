package team.goodmorning.aipedia.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import team.goodmorning.aipedia.dao.AiPediaRepository;
import team.goodmorning.aipedia.domain.Contents;
import team.goodmorning.aipedia.dto.request.GenerateRequest;
import team.goodmorning.aipedia.dto.response.Contentsresponse;

@Service
@RequiredArgsConstructor
public class AipediaService {

    private final WebClient webClient;
    private final AiPediaRepository aiPediaRepository;

    public Contentsresponse getContents(String keyword) {

        Mono<String> stringMono = webClient.post()
            .uri("/generate")
            .bodyValue(new GenerateRequest(keyword))
            .retrieve()
            .bodyToMono(String.class);

        String data = stringMono.block();

        System.out.println(data);

        Contents contents = Contents.builder()
            .keyword(keyword)
            .contents(data)
            .build();

        aiPediaRepository.save(contents);

        return Contentsresponse.builder()
            .keyword(contents.getKeyword())
            .contents(contents.getContents())
            .build();
    }
}
