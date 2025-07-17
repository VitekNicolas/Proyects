package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.ResultAnalysis;

@Repository
public interface IResultAnalysisRepository extends JpaRepository<ResultAnalysis, Integer>{
}