package team.goodmorning.aipedia.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import team.goodmorning.aipedia.domain.Contents;

@Repository
public interface AiPediaRepository extends JpaRepository<Contents, Long> {

}
