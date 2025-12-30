package team.goodmorning.aipedia.service;

import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Contentsresponse getContents(String keyword) {

        Optional<Contents> byKeyword = aiPediaRepository.findByKeyword(keyword);

        if (byKeyword.isPresent()) {
            return Contentsresponse.builder()
                .keyword(byKeyword.get().getKeyword())
                .contents(byKeyword.get().getContents())
                .build();
        }
        else {
            System.out.println("===== CONTENTS CREATE =====");

            Mono<String> stringMono = webClient.post()
                .uri("/generate")
                .bodyValue(new GenerateRequest(keyword))
                .retrieve()
                .bodyToMono(String.class);

            String data = stringMono.block();

            String extractedContent;
            try {
                JsonNode rootNode = objectMapper.readTree(data);
                extractedContent = rootNode.path("answer").asText();
            } catch (JsonProcessingException e) {
                extractedContent = data;
            }

            Contents contents = Contents.builder()
                .keyword(keyword)
                .contents(extractedContent)
                .build();

            aiPediaRepository.save(contents);

            return Contentsresponse.builder()
                .keyword(contents.getKeyword())
                .contents(contents.getContents())
                .build();
        }
    }
}
